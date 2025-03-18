import Button from '@/components/Button';
import InputButtonSet from '@/components/InputButtonSet';
import InputText from '@/components/InputText';
import CommonLayout from '@/components/layout/CommonLayout';
import ToggleButton from '@/components/ToggleButton';
import supabase from '@/lib/supabase-client';
import validator from '@/lib/validator';
import { useState, useMemo, useCallback, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router';

type FormField = 'email' | 'password' | 'confirmPassword' | 'nickname';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
}

interface Errors {
  emailError: string;
  passwordError: string;
  confirmPasswordError: string;
  nicknameError: string;
}

interface Interest {
  id: number;
  name: string;
}

const MAX_INTERESTS = 4;

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
  });

  const [errors, setErrors] = useState<Errors>({
    emailError: '',
    passwordError: '',
    confirmPasswordError: '',
    nicknameError: '',
  });

  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
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

  const isEmailValid = useMemo(
    () => formData.email && (!errors.emailError || errors.emailError === '사용 가능한 이메일입니다.') && isEmailChecked,
    [formData.email, errors.emailError, isEmailChecked]
  );

  const isPasswordValid = useMemo(
    () => formData.password && !errors.passwordError,
    [formData.password, errors.passwordError]
  );

  const isConfirmPasswordValid = useMemo(
    () => formData.confirmPassword && !errors.confirmPasswordError,
    [formData.confirmPassword, errors.confirmPasswordError]
  );

  const isNicknameValid = useMemo(
    () =>
      formData.nickname &&
      (!errors.nicknameError || errors.nicknameError === '사용 가능한 닉네임입니다.') &&
      isNicknameChecked,
    [formData.nickname, errors.nicknameError, isNicknameChecked]
  );

  const isInterestsValid = useMemo(
    () => selectedInterests.length >= 1 && selectedInterests.length <= MAX_INTERESTS,
    [selectedInterests]
  );

  const isFormValid = useMemo(
    () => isEmailValid && isPasswordValid && isConfirmPasswordValid && isNicknameValid && isInterestsValid,
    [isEmailValid, isPasswordValid, isConfirmPasswordValid, isNicknameValid, isInterestsValid]
  );

  const validateField = useCallback(
    (name: FormField, value: string) => {
      let error = '';

      switch (name) {
        case 'email':
          if (!validator.isEmail(value)) {
            error = '올바른 이메일 형식이 아닙니다.';
          }
          break;
        case 'password':
          if (!validator.isPassword(value)) {
            error = '영어, 숫자, 특수문자 포함 8자리 이상 입력해주세요.';
          }
          if (formData.confirmPassword && value !== formData.confirmPassword) {
            setErrors((prev) => ({ ...prev, confirmPasswordError: '비밀번호가 일치하지 않습니다.' }));
          } else {
            setErrors((prev) => ({ ...prev, confirmPasswordError: '' }));
          }
          break;
        case 'confirmPassword':
          if (value !== formData.password) {
            error = '비밀번호가 일치하지 않습니다.';
          }
          break;
        case 'nickname':
          if (!validator.isNickname(value)) {
            error = '특수문자 제외 2~8자로 입력해주세요.';
          }
          break;
      }

      setErrors((prev) => ({ ...prev, [`${name}Error`]: error }));
    },
    [formData.password, formData.confirmPassword]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      if (name === 'email') {
        setIsEmailChecked(false);
      } else if (name === 'nickname') {
        setIsNicknameChecked(false);
      }

      validateField(name as FormField, value);
    },
    [validateField]
  );

  const checkEmail = useCallback(async () => {
    if (!validator.isEmail(formData.email)) return;

    try {
      const { data, error } = await supabase.from('users').select('email').eq('email', formData.email);

      if (error) throw error;

      if (data && data.length > 0) {
        setErrors((prev) => ({ ...prev, emailError: '중복된 이메일입니다.' }));
        setIsEmailChecked(false);
      } else {
        setErrors((prev) => ({ ...prev, emailError: '사용 가능한 이메일입니다.' }));
        setIsEmailChecked(true);
      }
    } catch (error) {
      console.error('Email check error:', error);
      setErrors((prev) => ({ ...prev, emailError: '이메일 확인 중 오류가 발생했습니다.' }));
      setIsEmailChecked(false);
    }
  }, [formData.email]);

  const checkNickname = useCallback(async () => {
    if (!validator.isNickname(formData.nickname)) return;

    try {
      const { data, error } = await supabase.from('users').select('nickname').eq('nickname', formData.nickname);

      if (error) throw error;

      if (data && data.length > 0) {
        setErrors((prev) => ({ ...prev, nicknameError: '중복된 닉네임입니다.' }));
        setIsNicknameChecked(false);
      } else {
        setErrors((prev) => ({ ...prev, nicknameError: '사용 가능한 닉네임입니다.' }));
        setIsNicknameChecked(true);
      }
    } catch (error) {
      console.error('Nickname check error:', error);
      setErrors((prev) => ({ ...prev, nicknameError: '닉네임 확인 중 오류가 발생했습니다.' }));
      setIsNicknameChecked(false);
    }
  }, [formData.nickname]);

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

  const renderError = useCallback((error: string, isSuccess = false) => {
    return error ? (
      <p className={`absolute top-full left-0 mt-1.5 text-xs ${isSuccess ? 'text-positive' : 'text-warning'}`}>
        {error}
      </p>
    ) : null;
  }, []);

  const renderInterestsGrid = useCallback(
    (startIdx: number, endIdx: number) => {
      const interestsSlice = interests.slice(startIdx, endIdx);

      return (
        <div className="grid grid-cols-4 gap-2">
          {interestsSlice.map((interest) => (
            <ToggleButton
              key={interest.id}
              label={interest.name}
              isActive={selectedInterests.includes(interest.name)}
              onClick={() => handleToggle(interest.name)}
              disabled={selectedInterests.length >= MAX_INTERESTS && !selectedInterests.includes(interest.name)}
            />
          ))}
        </div>
      );
    },
    [interests, selectedInterests, handleToggle]
  );

  return (
    <CommonLayout
      headerProps={{
        title: '회원가입',
        isLeftIcon: true,
      }}
      showFooter={false}>
      <form className="flex flex-col gap-10">
        <fieldset className="relative">
          <legend className="sr-only">이메일 입력</legend>
          <InputButtonSet
            inputType="text"
            labelText="이메일"
            placeholder="이메일 입력"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onClick={checkEmail}>
            중복 확인
          </InputButtonSet>
          {renderError(errors.emailError, errors.emailError === '사용 가능한 이메일입니다.')}
        </fieldset>

        <fieldset className="relative">
          <legend className="sr-only">비밀번호 입력</legend>
          <InputText
            labelText="비밀번호"
            type="password"
            placeholder="비밀번호 입력"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {renderError(errors.passwordError)}
        </fieldset>

        <fieldset className="relative">
          <legend className="sr-only">비밀번호 확인</legend>
          <InputText
            labelText="비밀번호 확인"
            type="password"
            placeholder="비밀번호 확인"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {renderError(errors.confirmPasswordError)}
        </fieldset>

        <fieldset className="relative">
          <legend className="sr-only">닉네임 입력</legend>
          <InputButtonSet
            inputType="text"
            labelText="닉네임"
            placeholder="닉네임 입력"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            onClick={checkNickname}>
            중복 확인
          </InputButtonSet>
          {renderError(errors.nicknameError, errors.nicknameError === '사용 가능한 닉네임입니다.')}
        </fieldset>

        <div className="flex flex-col gap-2">
          <p className="text-primary text-xs">관심사 (최대 {MAX_INTERESTS}개)</p>
          {isLoading ? (
            <p className="text-sm text-gray-500">관심사 목록을 불러오는 중...</p>
          ) : (
            <>
              {interests.length > 0 ? (
                <>
                  {renderInterestsGrid(0, 4)}
                  {interests.length > 4 && renderInterestsGrid(4, 8)}
                  {interests.length > 8 && renderInterestsGrid(8, 12)}
                  {interests.length > 12 && renderInterestsGrid(12, 16)}
                </>
              ) : (
                <p className="text-sm text-gray-500">관심사 목록을 불러올 수 없습니다.</p>
              )}
            </>
          )}
        </div>
      </form>

      <div className="fixed right-0 bottom-4 left-0 mx-auto max-w-[440px] px-4">
        <Button onClick={handleSubmit} ariaDisabled={!isFormValid || isSubmitting || isLoading}>
          말랑이 만나러 가기
        </Button>
      </div>
    </CommonLayout>
  );
};

export default SignUp;
