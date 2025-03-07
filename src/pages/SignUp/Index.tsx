import Button from '@/components/Button';
import InputButtonSet from '@/components/InputButtonSet';
import InputText from '@/components/InputText';
import Header from '@/components/layout/Header';
import validator from '@/lib/validator';
import { useState, useMemo } from 'react';

interface FormData {
  userId: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  userIdError: string;
  passwordError: string;
  confirmPasswordError: string;
  duplicatedIdError: string;
}

const SignUpPage = () => {
  const [formData, setFormData] = useState<FormData>({
    userId: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Errors>({
    userIdError: '',
    passwordError: '',
    confirmPasswordError: '',
    duplicatedIdError: '',
  });

  const [idChecked, setIdChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'userId') {
      setErrors((prev) => ({ ...prev, duplicatedIdError: '' }));
      setIdChecked(false);
    }

    validateField(name as keyof FormData, value);
  };

  const validateField = (name: keyof FormData, value: string) => {
    let error = '';

    switch (name) {
      case 'userId':
        if (!validator.isId(value)) {
          error = '영어, 숫자 포함 6자리 이상 입력해주세요.';
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
    }

    setErrors((prev) => ({ ...prev, [`${name}Error`]: error }));
  };

  const checkUserId = () => {
    if (!validator.isId(formData.userId)) {
      return;
    }

    const dummyUserId = 'admin123';
    if (formData.userId === dummyUserId) {
      setErrors((prev) => ({ ...prev, duplicatedIdError: '중복된 아이디입니다.' }));
      setIdChecked(false);
    } else {
      setErrors((prev) => ({ ...prev, duplicatedIdError: '사용 가능한 아이디입니다.' }));
      setIdChecked(true);
    }
  };

  const renderError = (error: string, isSuccess: boolean = false) => {
    return (
      error && (
        <p className={`absolute top-full left-0 mt-1.5 text-xs ${isSuccess ? 'text-positive' : 'text-warning'}`}>
          {error}
        </p>
      )
    );
  };

  const isFormValid = useMemo(() => {
    const allFieldsFilled = formData.userId && formData.password && formData.confirmPassword;

    const noValidationErrors = !errors.userIdError && !errors.passwordError && !errors.confirmPasswordError;

    const idCheckPassed = idChecked && errors.duplicatedIdError === '사용 가능한 아이디입니다.';

    return allFieldsFilled && noValidationErrors && idCheckPassed;
  }, [formData, errors, idChecked]);

  return (
    <section className="bg-background flex min-h-dvh flex-col gap-5 px-4 pb-4">
      <header className="flex flex-col">
        <Header title="회원가입" isLeftIcon={true} />
        <div className="-mx-4 flex items-center">
          <hr className="border-primary w-1/4 border-2 border-t" />
          <hr className="border-secondary flex-1 border-2 border-t" />
        </div>
        <div className="flex flex-row justify-between pt-4">
          <p className="text-primary text-base">
            로그인시 사용할 아이디와 <br />
            비밀번호를 알려주세요
          </p>
          <img src="/images/mallang.webp" alt="말랑이" width={50} height={50} />
        </div>
      </header>

      <form className="flex w-full flex-grow flex-col">
        <div className="flex flex-col gap-11">
          <fieldset className="relative">
            <legend className="sr-only">아이디 입력</legend>
            <InputButtonSet
              inputType="text"
              labelText="아이디"
              placeholder="아이디 입력"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              onClick={checkUserId}>
              중복 확인
            </InputButtonSet>
            {renderError(errors.userIdError)}
            {renderError(errors.duplicatedIdError, errors.duplicatedIdError === '사용 가능한 아이디입니다.')}
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
        </div>
        <div className="mt-auto">
          <Button disabled={!isFormValid}>다음</Button>
        </div>
      </form>
    </section>
  );
};

export default SignUpPage;
