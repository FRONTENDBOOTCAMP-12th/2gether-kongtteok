import Button from '@/components/Button';
import InputButtonSet from '@/components/InputButtonSet';
import Header from '@/components/layout/Header';
import validator from '@/lib/validator';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

const SignUpEmail = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isEmailChecked, setIsEmailChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
    setError('');
    setIsEmailChecked(false);
  };

  const checkEmail = () => {
    if (!validator.isEmail(email)) {
      setError('올바른 이메일 형식이 아닙니다.');
      setIsEmailChecked(false);
      return;
    }

    const dummyEmail = 'test@test.com';
    if (email === dummyEmail) {
      setError('중복된 이메일입니다.');
      setIsEmailChecked(false);
    } else {
      setError('사용 가능한 이메일입니다.');
      setIsEmailChecked(true);
    }
  };

  const handleNext = () => {
    if (isEmailValid) {
      navigate('/signup/nickname');
    }
  };

  const isEmailValid = useMemo(() => {
    const emailFilled = email !== '';
    const emailCheckPassed = isEmailChecked && error === '사용 가능한 이메일입니다.';

    return emailFilled && emailCheckPassed;
  }, [email, error, isEmailChecked]);

  return (
    <section className="bg-background flex min-h-dvh flex-col gap-5 px-4 pb-4">
      <header className="flex flex-col">
        <Header title="회원가입" isLeftIcon={true} />
        <div className="-mx-4 flex items-center">
          <hr className="border-primary w-1/2 border-2 border-t" />
          <hr className="border-secondary flex-1 border-2 border-t" />
        </div>
        <div className="flex flex-row justify-between pt-4">
          <p className="text-primary text-base">이메일을 알려주세요</p>
          <img src="/images/mallang.webp" alt="말랑이" width={50} height={50} />
        </div>
      </header>

      <form className="flex w-full flex-grow flex-col">
        <fieldset className="relative flex flex-col">
          <legend className="sr-only">이메일 입력</legend>
          <InputButtonSet
            inputType="text"
            labelText="이메일"
            placeholder="이메일 입력"
            name="userEmail"
            value={email}
            onChange={handleChange}
            onClick={checkEmail}>
            중복 확인
          </InputButtonSet>
          {error && (
            <p
              className={`absolute top-full left-0 mt-1.5 text-xs ${
                error === '사용 가능한 이메일입니다.' ? 'text-positive' : 'text-warning'
              }`}>
              {error}
            </p>
          )}
        </fieldset>

        <div className="mt-auto">
          <Button ariaDisabled={!isEmailValid} onClick={handleNext}>
            다음
          </Button>
        </div>
      </form>
    </section>
  );
};

export default SignUpEmail;
