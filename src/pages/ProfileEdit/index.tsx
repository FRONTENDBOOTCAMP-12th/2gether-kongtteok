import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router';
import CommonLayout from '@/components/layout/CommonLayout';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import supabase from '@/lib/supabase-client';
import validator from '@/lib/validator';
import { useAuthStore } from '@/stores/auth';
import ProfileImageSection from './components/ProfileImageSection';
import ProfileFormSection from './components/ProfileFormSection';

const DEFAULT_PROFILE = '/images/default/profile.webp';
const MAX_INTERESTS = 3;

interface Interest {
  id: string;
  name: string;
}

interface InterestData {
  interest_id: string;
  interests: { name: string };
}

interface UserProfile {
  nickname: string | null;
  profileImage: string | null;
  intro: string | null;
  user_interests: InterestData[] | null;
}

interface ProfileState {
  nickname: string;
  profileImage: string;
  bio: string;
  selectedInterests: string[];
}

interface ValidationState {
  nicknameError: string;
  nicknameSuccess: string;
  isNicknameChecked: boolean;
  isFormValid: boolean;
}

function ProfileEdit() {
  const navigate = useNavigate();
  const userId = useAuthStore((s) => s.user) ?? '';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [interests, setInterests] = useState<Interest[]>([]);

  const [profileState, setProfileState] = useState<ProfileState>({
    nickname: '',
    profileImage: DEFAULT_PROFILE,
    bio: '',
    selectedInterests: [],
  });

  const [validationState, setValidationState] = useState<ValidationState>({
    nicknameError: '',
    nicknameSuccess: '',
    isNicknameChecked: false,
    isFormValid: false,
  });

  const { nickname, profileImage, bio, selectedInterests } = profileState;
  const { nicknameError, nicknameSuccess, isNicknameChecked, isFormValid } = validationState;

  const fetchInterests = useCallback(async () => {
    try {
      const { data, error } = await supabase.from('interests').select('id, name');

      if (error) throw error;

      if (data) {
        const validInterests = data.filter((interest): interest is Interest => interest.name !== null);
        setInterests(validInterests);
      }
    } catch (error) {
      console.error('관심사 불러오기 오류:', error);
    }
  }, []);

  const fetchProfile = useCallback(async () => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('users')
        .select(`nickname, profileImage, intro, user_interests (interest_id, interests (name))`)
        .eq('id', userId)
        .single<UserProfile>();

      if (error) throw error;

      if (data) {
        setProfileState({
          nickname: data.nickname ?? '',
          profileImage: data.profileImage ?? DEFAULT_PROFILE,
          bio: data.intro ?? '',
          selectedInterests: Array.isArray(data.user_interests)
            ? data.user_interests.map((interest) => interest?.interests?.name ?? '').filter(Boolean)
            : [],
        });
      }
    } catch (error) {
      console.error('프로필 불러오기 오류:', error);
    }
  }, [userId]);

  useEffect(() => {
    fetchInterests();
    fetchProfile();
  }, [fetchInterests, fetchProfile]);

  const convertBase64ToFile = useCallback(async (base64: string, filename: string): Promise<File> => {
    const res = await fetch(base64);
    const blob = await res.blob();
    return new File([blob], filename, { type: blob.type });
  }, []);

  const handleNicknameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;

    setProfileState((prev) => ({
      ...prev,
      nickname: newNickname,
    }));

    setValidationState({
      nicknameError: '',
      nicknameSuccess: '',
      isNicknameChecked: false,
      isFormValid: false,
    });
  }, []);

  const checkNickname = useCallback(() => {
    if (!nickname.trim()) {
      setValidationState({
        nicknameError: '필수 입력칸이에요.',
        nicknameSuccess: '',
        isNicknameChecked: false,
        isFormValid: false,
      });
      return;
    }

    const isValid = validator.isNickname(nickname);
    setValidationState({
      nicknameError: isValid ? '' : '특수문자 제외 2~8자리로 입력해 주세요',
      nicknameSuccess: isValid ? '사용 가능한 닉네임이에요.' : '',
      isNicknameChecked: isValid,
      isFormValid: isValid,
    });
  }, [nickname]);

  const handleBioChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProfileState((prev) => ({ ...prev, bio: e.target.value }));
  }, []);

  const uploadProfileImage = useCallback(
    async (imageBase64: string): Promise<string> => {
      if (!userId || !imageBase64.startsWith('data:image')) {
        return imageBase64;
      }

      try {
        const fileName = 'profile.png';
        const file = await convertBase64ToFile(imageBase64, fileName);

        const { error: uploadError } = await supabase.storage
          .from(`images/profile/${userId}`)
          .upload(fileName, file, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage.from('images/profile').getPublicUrl(`${userId}/${fileName}`);

        return `${publicUrlData.publicUrl}?t=${Date.now()}`;
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
        return imageBase64;
      }
    },
    [userId, convertBase64ToFile]
  );

  const handleSaveProfile = useCallback(async () => {
    if (!userId || !isFormValid || !isNicknameChecked) return;

    try {
      const profileImageUrl = await uploadProfileImage(profileImage);

      const { error: updateError } = await supabase
        .from('users')
        .update({
          nickname,
          profileImage: profileImageUrl,
          intro: bio,
        })
        .eq('id', userId);

      if (updateError) throw updateError;

      const { error: deleteError } = await supabase.from('user_interests').delete().eq('user_id', userId);

      if (deleteError) throw deleteError;

      if (selectedInterests.length > 0) {
        const interestIds = interests
          .filter((interest) => selectedInterests.includes(interest.name))
          .map((interest) => ({
            user_id: userId,
            interest_id: interest.id,
          }));

        const { error: insertError } = await supabase.from('user_interests').insert(interestIds);

        if (insertError) throw insertError;
      }

      setIsModalOpen(true);
    } catch (error) {
      console.error('프로필 저장 실패:', error);
    }
  }, [
    userId,
    isFormValid,
    isNicknameChecked,
    profileImage,
    nickname,
    bio,
    selectedInterests,
    interests,
    uploadProfileImage,
  ]);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    navigate('/settings');
  }, [navigate]);

  const handleImageChange = useCallback((newImage: string) => {
    setProfileState((prev) => ({
      ...prev,
      profileImage: newImage,
    }));
  }, []);

  const toggleInterest = useCallback((interestName: string) => {
    setProfileState((prev) => {
      const isSelected = prev.selectedInterests.includes(interestName);

      if (isSelected) {
        return {
          ...prev,
          selectedInterests: prev.selectedInterests.filter((name) => name !== interestName),
        };
      }

      if (prev.selectedInterests.length < MAX_INTERESTS) {
        return {
          ...prev,
          selectedInterests: [...prev.selectedInterests, interestName],
        };
      }

      return prev;
    });
  }, []);

  const isSaveButtonDisabled = useMemo(() => {
    return !isFormValid || !isNicknameChecked;
  }, [isFormValid, isNicknameChecked]);

  return (
    <CommonLayout headerProps={{ title: '프로필 편집', isLeftIcon: true, isRightIcon: true }} showFooter={false}>
      <div className="flex flex-col items-center gap-8">
        <ProfileImageSection userId={userId} profileImage={profileImage} onImageChange={handleImageChange} />

        <ProfileFormSection
          nickname={nickname}
          bio={bio}
          interests={interests}
          selectedInterests={selectedInterests}
          nicknameError={nicknameError}
          nicknameSuccess={nicknameSuccess}
          isNicknameChecked={isNicknameChecked}
          onNicknameChange={handleNicknameChange}
          onCheckNickname={checkNickname}
          onBioChange={handleBioChange}
          onToggleInterest={toggleInterest}
          maxInterests={MAX_INTERESTS}
        />
      </div>

      <Button
        intent="primary"
        size="medium"
        disabled={isSaveButtonDisabled}
        ariaDisabled={isSaveButtonDisabled}
        onClick={handleSaveProfile}
        className="mt-41">
        저장하기
      </Button>

      {isModalOpen && (
        <Modal title="알림" description="프로필을 저장했어요" primaryBtnText="확인" onClose={handleModalClose} />
      )}
    </CommonLayout>
  );
}

export default ProfileEdit;
