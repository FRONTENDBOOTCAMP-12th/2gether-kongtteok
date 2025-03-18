import { useState, useCallback, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Button from '@/components/Button';
import CommonLayout from '@/components/layout/CommonLayout';
import supabase from '@/lib/supabase-client';
import { useFormValidation } from './useFormValidation';
import FormField from './components/FormField';
import InterestsSection from './components/InterestsSection';

interface Interest {
  id: number;
  name: string;
}

const MAX_INTERESTS = 4;

const SignUp = () => {
  const navigate = useNavigate();

  const {
    formData,
    errors,
    isEmailValid,
    isPasswordValid,
    isConfirmPasswordValid,
    isNicknameValid,
    handleChange,
    checkEmail,
    checkNickname,
  } = useFormValidation();

  const [interests, setInterests] = useState<Interest[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const { data, error } = await supabase.from('interests').select('id, name').order('name');

        if (error) throw error;
        setInterests(data || []);
      } catch (error) {
        console.error('Error fetching interests:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInterests();
  }, []);

  const isInterestsValid = useMemo(
    () => selectedInterests.length >= 1 && selectedInterests.length <= MAX_INTERESTS,
    [selectedInterests]
  );

  const isFormValid = useMemo(
    () => isEmailValid && isPasswordValid && isConfirmPasswordValid && isNicknameValid && isInterestsValid,
    [isEmailValid, isPasswordValid, isConfirmPasswordValid, isNicknameValid, isInterestsValid]
  );

  const handleToggle = useCallback((interest: string) => {
    setSelectedInterests((prev) => {
      if (prev.includes(interest)) {
        return prev.filter((item) => item !== interest);
      }

      if (prev.length >= MAX_INTERESTS) {
        return prev;
      }

      return [...prev, interest];
    });
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!isFormValid || isSubmitting) return;

    try {
      setIsSubmitting(true);

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('사용자 생성 실패');

      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          email: formData.email,
          nickname: formData.nickname,
        })
        .select()
        .single();

      if (userError) throw userError;

      const selectedInterestIds = interests
        .filter((interest) => selectedInterests.includes(interest.name))
        .map((interest) => interest.id);

      const userInterestsData = selectedInterestIds.map((interestId) => ({
        user_id: userData.id,
        interest_id: interestId,
      }));

      const { error: userInterestsError } = await supabase.from('user_interests').insert(userInterestsData);

      if (userInterestsError) throw userInterestsError;

      navigate('/signin');
    } catch (error) {
      console.error('Signup error:', error);
      alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, isFormValid, navigate, selectedInterests, interests, isSubmitting]);

  return (
    <CommonLayout
      headerProps={{
        title: '회원가입',
        isLeftIcon: true,
      }}
      showFooter={false}>
      <div className="flex flex-row justify-between pb-5">
        <p className="text-primary flex items-center text-base">말랑이에게 정보를 알려주세요</p>
        <img src="/images/mallang.webp" alt="말랑이" width={50} height={50} />
      </div>
      <form className="flex flex-col gap-10">
        <FormField
          fieldType="withButton"
          labelText="이메일"
          name="email"
          placeholder="이메일 입력"
          value={formData.email}
          error={errors.emailError}
          isSuccess={errors.emailError === '사용 가능한 이메일입니다.'}
          onChange={handleChange}
          onButtonClick={checkEmail}
          buttonText="중복 확인"
        />

        <FormField
          fieldType="password"
          labelText="비밀번호"
          name="password"
          placeholder="비밀번호 입력"
          value={formData.password}
          error={errors.passwordError}
          onChange={handleChange}
        />

        <FormField
          fieldType="password"
          labelText="비밀번호 확인"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          value={formData.confirmPassword}
          error={errors.confirmPasswordError}
          onChange={handleChange}
        />

        <FormField
          fieldType="withButton"
          labelText="닉네임"
          name="nickname"
          placeholder="닉네임 입력"
          value={formData.nickname}
          error={errors.nicknameError}
          isSuccess={errors.nicknameError === '사용 가능한 닉네임입니다.'}
          onChange={handleChange}
          onButtonClick={checkNickname}
          buttonText="중복 확인"
        />

        <InterestsSection
          interests={interests}
          selectedInterests={selectedInterests}
          maxInterests={MAX_INTERESTS}
          isLoading={isLoading}
          onToggle={handleToggle}
        />
      </form>

      <div className="mt-42">
        <Button onClick={handleSubmit} ariaDisabled={!isFormValid || isSubmitting || isLoading}>
          말랑이 만나러 가기
        </Button>
      </div>
    </CommonLayout>
  );
};

export default SignUp;
