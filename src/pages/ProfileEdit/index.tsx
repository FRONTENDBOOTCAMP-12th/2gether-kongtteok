import { useState, useEffect } from 'react';
import CommonLayout from '@/components/layout/CommonLayout';
import BottomSheet from '@/components/BottomSheet';
import Modal from '@/components/Modal';
import supabase from '@/lib/supabase-client';
import { Pencil } from '@mynaui/icons-react';
import InputButtonSet from '@/components/InputButtonSet';
import Button from '@/components/Button';
import Textarea from '@/components/Textarea';
import ToggleButton from '@/components/ToggleButton';
import validator from '@/lib/validator';

const INTERESTS = ['취미', '가정', '학교', '운동', '동물', '패션', '직장', '친구', '여행', '돈', '음식', '사랑'];

const DEFAULT_PROFILE = '/images/default/profile.webp'; // 기본 이미지 설정

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

function ProfileEdit() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string>(DEFAULT_PROFILE);
  const [nickname, setNickname] = useState<string>('익명');
  const [bio, setBio] = useState<string>('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [nicknameError, setNicknameError] = useState<string>('');
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('users')
        .select(`nickname, profileImage, intro, user_interests (interest_id, interests (name))`)
        .single<UserProfile>();

      if (error) {
        console.error('프로필 데이터를 불러오는 중 오류 발생:', error);
        return;
      }

      if (data) {
        setNickname(data.nickname ?? '익명');
        setProfileImage(data.profileImage ?? DEFAULT_PROFILE);
        setBio(data.intro ?? '');

        const interestsArray: string[] = Array.isArray(data.user_interests)
          ? data.user_interests
              .map((interest) => interest?.interests?.name ?? '')
              .filter((name): name is string => Boolean(name))
          : [];

        setSelectedInterests(interestsArray);
      }
    };

    fetchProfile();
  }, []);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setIsNicknameChecked(false);
    setNicknameError('');
  };

  const checkNickname = () => {
    if (!validator.isNickname(nickname)) {
      setNicknameError('특수문자 제외 2~6자리로 입력해 주세요');
      setIsFormValid(false);
    } else {
      setNicknameError('');
      setIsNicknameChecked(true);
      setIsFormValid(true);
    }
  };

  const handleSaveProfile = async () => {
    if (nicknameError) return;
    const { error } = await supabase.from('users').update({ nickname, profileImage, intro: bio }).eq('id', 'user_id');

    if (!error) {
      setIsModalOpen(true);
    }
  };

  return (
    <CommonLayout headerProps={{ title: '프로필 편집', isLeftIcon: true, isRightIcon: true }} showFooter={false}>
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex items-center justify-center">
          <div className="border-brown-400 relative h-24 w-24 overflow-hidden rounded-full border-2">
            <img
              src={profileImage || '/images/default/profile.webp'}
              alt="프로필 이미지"
              className="h-full w-full object-cover"
            />
          </div>
          <button
            className="bg-brown-400 absolute right-0 -bottom-0 translate-x-0 translate-y-0 transform rounded-full p-1"
            onClick={() => setIsBottomSheetOpen(true)}>
            <Pencil width={16} height={16} className="text-cream-100" />
          </button>
        </div>

        <div className="w-full">
          <InputButtonSet
            labelText="닉네임"
            name="nickname"
            value={nickname}
            onChange={handleNicknameChange}
            intent="secondary"
            size="small"
            inlineSize="fit"
            disabled={isNicknameChecked}
            onClick={checkNickname}>
            {isNicknameChecked ? '확인완료' : '확인하기'}
          </InputButtonSet>
        </div>
        {nicknameError && <p className="mt-1 text-sm text-red-500">{nicknameError}</p>}

        <div className="w-full">
          <Textarea
            label="소개글"
            placeholder="당신은 어떤 사람인가요?"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <div className="w-full">
          <p className="text-primary flex items-center gap-1 text-sm font-medium">
            관심사
            <span className="text-secondary text-xs">(최대 3개까지 선택할 수 있어요)</span>
          </p>
          <div className="grid grid-cols-4 gap-1">
            {INTERESTS.map((interest) => (
              <ToggleButton
                key={interest}
                label={interest}
                isActive={selectedInterests.includes(interest)}
                onClick={() =>
                  setSelectedInterests((prev) =>
                    prev.includes(interest)
                      ? prev.filter((item) => item !== interest)
                      : prev.length < 3
                        ? [...prev, interest]
                        : prev
                  )
                }
              />
            ))}
          </div>
        </div>

        <Button
          intent="primary"
          size="medium"
          ariaDisabled={!isFormValid || !isNicknameChecked}
          onClick={handleSaveProfile}>
          저장하기
        </Button>
      </div>

      {isBottomSheetOpen && (
        <BottomSheet title="프로필 이미지" isOpen={isBottomSheetOpen} handleClose={() => setIsBottomSheetOpen(false)}>
          <label className="block cursor-pointer p-2 text-left">
            이미지 편집
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = () => {
                    setProfileImage(reader.result as string);
                  };
                }
              }}
            />
          </label>
          <button className="p-2 text-left" onClick={() => setProfileImage(DEFAULT_PROFILE)}>
            이미지 삭제
          </button>
        </BottomSheet>
      )}

      {isModalOpen && (
        <Modal
          title="알림"
          description="프로필을 저장했어요"
          primaryBtnText="확인"
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </CommonLayout>
  );
}

export default ProfileEdit;
