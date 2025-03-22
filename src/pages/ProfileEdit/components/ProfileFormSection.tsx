import React from 'react';
import InputButtonSet from '@/components/InputButtonSet';
import Textarea from '@/components/Textarea';
import ToggleButton from '@/components/ToggleButton';

interface Interest {
  id: string;
  name: string;
}

interface ProfileFormSectionProps {
  nickname: string;
  bio: string;
  interests: Interest[];
  selectedInterests: string[];
  nicknameError: string;
  nicknameSuccess: string;
  isNicknameChecked: boolean;
  maxInterests: number;
  onNicknameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckNickname: () => void;
  onBioChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onToggleInterest: (interestName: string) => void;
}

const ProfileFormSection = ({
  nickname,
  bio,
  interests,
  selectedInterests,
  nicknameError,
  nicknameSuccess,
  isNicknameChecked,
  maxInterests,
  onNicknameChange,
  onCheckNickname,
  onBioChange,
  onToggleInterest,
}: ProfileFormSectionProps) => {
  return (
    <>
      <div className="w-full">
        <InputButtonSet
          labelText="닉네임"
          name="nickname"
          value={nickname}
          onChange={onNicknameChange}
          intent="secondary"
          inlineSize="fit"
          disabled={isNicknameChecked}
          onClick={onCheckNickname}>
          {isNicknameChecked ? '확인완료' : '확인하기'}
        </InputButtonSet>
        {nicknameError && <p className="text-warning absolute left-0 mt-1.5 pl-4 text-xs">{nicknameError}</p>}
        {nicknameSuccess && <p className="text-positive absolute left-0 mt-1.5 pl-4 text-xs">{nicknameSuccess}</p>}
      </div>
      <div className="w-full">
        <Textarea label="소개글" placeholder="당신은 어떤 사람인가요?" value={bio} onChange={onBioChange} />
      </div>
      <div className="w-full">
        <p className="text-primary mb-1.5 flex items-center gap-1 text-xs font-medium">
          관심사
          <span className="text-secondary text-xs">(최대 {maxInterests}개까지 선택할 수 있어요)</span>
        </p>
        <div className="grid grid-cols-4 gap-1">
          {interests.map((interest) => (
            <ToggleButton
              key={interest.id}
              label={interest.name}
              isActive={selectedInterests.includes(interest.name)}
              onClick={() => onToggleInterest(interest.name)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfileFormSection;
