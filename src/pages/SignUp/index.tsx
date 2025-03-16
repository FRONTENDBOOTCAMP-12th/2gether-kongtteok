import Button from '@/components/Button';
import InputButtonSet from '@/components/InputButtonSet';
import InputText from '@/components/InputText';
import CommonLayout from '@/components/layout/CommonLayout';
import ToggleButton from '@/components/ToggleButton';
import validator from '@/lib/validator';
import { useState, useMemo, useCallback, ChangeEvent } from 'react';
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

const INTERESTS = ['취미', '동물', '가정', '푸드', '패션', '직장', '여행', '운동', '학교', '친구', '돈', '사랑'];
const MAX_INTERESTS = 4;
const DUMMY_EMAIL = 'test@test.com';
const DUMMY_NICKNAME = 'test12';

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
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const isEmailValid = useMemo(
    () => formData.email && !errors.emailError && isEmailChecked,
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
    () => formData.nickname && !errors.nicknameError && isNicknameChecked,
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

  const checkEmail = useCallback(() => {
    if (!validator.isEmail(formData.email)) return;

    if (formData.email === DUMMY_EMAIL) {
      setErrors((prev) => ({ ...prev, emailError: '중복된 이메일입니다.' }));
      setIsEmailChecked(false);
    } else {
      setErrors((prev) => ({ ...prev, emailError: '사용 가능한 이메일입니다.' }));
      setIsEmailChecked(true);
    }
  }, [formData.email]);

  const checkNickname = useCallback(() => {
    if (!validator.isNickname(formData.nickname)) return;

    if (formData.nickname === DUMMY_NICKNAME) {
      setErrors((prev) => ({ ...prev, nicknameError: '중복된 닉네임입니다.' }));
      setIsNicknameChecked(false);
    } else {
      setErrors((prev) => ({ ...prev, nicknameError: '사용 가능한 닉네임입니다.' }));
      setIsNicknameChecked(true);
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

  const handleSubmit = useCallback(() => {
    if (isFormValid) {
      navigate('/signin');
    }
  }, [isFormValid, navigate]);

  const renderError = useCallback((error: string, isSuccess = false) => {
    return error ? (
      <p className={`absolute top-full left-0 mt-1.5 text-xs ${isSuccess ? 'text-positive' : 'text-warning'}`}>
        {error}
      </p>
    ) : null;
  }, []);

  const renderInterestsGrid = useCallback(
    (startIdx: number, endIdx: number) => (
      <div className="grid grid-cols-4 gap-2">
        {INTERESTS.slice(startIdx, endIdx).map((interest) => (
          <ToggleButton
            key={interest}
            label={interest}
            isActive={selectedInterests.includes(interest)}
            onClick={() => handleToggle(interest)}
            disabled={selectedInterests.length >= MAX_INTERESTS && !selectedInterests.includes(interest)}
          />
        ))}
      </div>
    ),
    [selectedInterests, handleToggle]
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
          {renderInterestsGrid(0, 4)}
          {renderInterestsGrid(4, 8)}
          {renderInterestsGrid(8, 12)}
        </div>
      </form>

      <div className="fixed right-0 bottom-4 left-0 mx-auto max-w-[440px] px-4">
        <Button onClick={handleSubmit} ariaDisabled={!isFormValid}>
          말랑이 만나러 가기
        </Button>
      </div>
    </CommonLayout>
  );
};

export default SignUp;
