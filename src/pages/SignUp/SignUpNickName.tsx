import Button from '@/components/Button';
import InputButtonSet from '@/components/InputButtonSet';
import Header from '@/components/layout/Header';
import validator from '@/lib/validator';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

const SignUpNickName = () => {
  const navigate = useNavigate();
  const [nickName, setNickName] = useState('');
  const [error, setError] = useState('');
  const [isNickNameChecked, setIsNickNameChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNickName(value);
    setError('');
    setIsNickNameChecked(false);
  };

  const checkNickName = () => {
    if (!validator.isNickName(nickName)) {
      setError('특수문자 제외 2~8자로 입력해주세요.');
      setIsNickNameChecked(false);
      return;
    }

    const dummyNickName = 'test12';
    if (nickName === dummyNickName) {
      setError('중복된 닉네임입니다.');
      setIsNickNameChecked(false);
    } else {
      setError('사용 가능한 닉네임입니다.');
      setIsNickNameChecked(true);
    }
  };

  const handleNext = () => {
    if (isNickNameValid) {
      navigate('/signup_interests');
    }
  };

  const isNickNameValid = useMemo(() => {
    const nickNameFilled = nickName !== '';
    const nickNameCheckPassed = isNickNameChecked && error === '사용 가능한 닉네임입니다.';

    return nickNameFilled && nickNameCheckPassed;
  }, [nickName, error, isNickNameChecked]);

  return (
    <section className="bg-background flex min-h-dvh flex-col gap-5 px-4 pb-4">
      <header className="flex flex-col">
        <Header title="회원가입" isLeftIcon={true} />
        <div className="-mx-4 flex items-center">
          <hr className="border-primary w-3/4 border-2 border-t" />
          <hr className="border-secondary flex-1 border-2 border-t" />
        </div>
        <div className="flex flex-row justify-between pt-4">
          <p className="text-primary text-base">사용할 닉네임을 알려주세요</p>
          <img src="/images/mallang.webp" alt="말랑이" width={50} height={50} />
        </div>
      </header>

      <form className="flex w-full flex-grow flex-col">
        <fieldset className="relative flex flex-col">
          <legend className="sr-only">닉네임 입력</legend>
          <InputButtonSet
            inputType="text"
            labelText="닉네임"
            placeholder="닉네임 입력"
            value={nickName}
            onChange={handleChange}
            onClick={checkNickName}>
            중복 확인
          </InputButtonSet>
          {error && (
            <p
              className={`absolute top-full left-0 mt-1.5 text-xs ${
                error === '사용 가능한 닉네임입니다.' ? 'text-positive' : 'text-warning'
              }`}>
              {error}
            </p>
          )}
        </fieldset>

        <div className="mt-auto">
          <Button disabled={!isNickNameValid} onClick={handleNext}>
            다음
          </Button>
        </div>
      </form>
    </section>
  );
};

export default SignUpNickName;
