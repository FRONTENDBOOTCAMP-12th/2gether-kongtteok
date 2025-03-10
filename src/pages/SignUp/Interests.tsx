import Button from '@/components/Button';
import Header from '@/components/layout/Header';
import ToggleButton from '@/components/ToggleButton';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

const SignUpInterests = () => {
  const navigate = useNavigate();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const interests = ['취미', '동물', '가정', '푸드', '패션', '직장', '여행', '운동', '학교', '친구', '돈', '사랑'];

  const handleToggle = (interest: string) => {
    setSelectedInterests((prev) => {
      if (prev.includes(interest)) {
        return prev.filter((item) => item !== interest);
      }

      if (prev.length >= 4) {
        return prev;
      }

      return [...prev, interest];
    });
  };

  const handleNext = () => {
    if (isValid) {
      navigate('/signin');
    }
  };

  const isValid = useMemo(() => {
    return selectedInterests.length >= 1 && selectedInterests.length <= 4;
  }, [selectedInterests]);

  return (
    <section className="bg-background flex min-h-dvh flex-col gap-10 px-4 pb-4">
      <header className="flex flex-col">
        <Header title="회원가입" isLeftIcon={true} />
        <div className="-mx-4 flex items-center">
          <hr className="border-primary w-full border-2 border-t" />
        </div>
        <div className="flex flex-row justify-between pt-4">
          <p className="text-primary text-base">
            최근 관심있는 키워드들을 골라주세요 <br />
            (최대 4개)
          </p>
          <img src="/images/mallang.webp" alt="말랑이" width={50} height={50} />
        </div>
      </header>

      <form className="flex w-full flex-grow flex-col">
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-4 gap-2">
            {interests.slice(0, 4).map((interest) => (
              <ToggleButton
                key={interest}
                label={interest}
                isActive={selectedInterests.includes(interest)}
                onClick={() => handleToggle(interest)}
                disabled={selectedInterests.length >= 4 && !selectedInterests.includes(interest)}
              />
            ))}
          </div>

          <div className="grid grid-cols-4 gap-2">
            {interests.slice(4, 8).map((interest) => (
              <ToggleButton
                key={interest}
                label={interest}
                isActive={selectedInterests.includes(interest)}
                onClick={() => handleToggle(interest)}
                disabled={selectedInterests.length >= 4 && !selectedInterests.includes(interest)}
              />
            ))}
          </div>

          <div className="grid grid-cols-4 gap-2">
            {interests.slice(8, 12).map((interest) => (
              <ToggleButton
                key={interest}
                label={interest}
                isActive={selectedInterests.includes(interest)}
                onClick={() => handleToggle(interest)}
                disabled={selectedInterests.length >= 4 && !selectedInterests.includes(interest)}
              />
            ))}
          </div>
        </div>

        <div className="mt-auto">
          <Button ariaDisabled={!isValid} onClick={handleNext}>
            다음
          </Button>
        </div>
      </form>
    </section>
  );
};

export default SignUpInterests;
