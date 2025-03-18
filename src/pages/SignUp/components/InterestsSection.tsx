import React from 'react';
import ToggleButton from '@/components/ToggleButton';

interface Interest {
  id: number;
  name: string;
}

interface InterestsSectionProps {
  interests: Interest[];
  selectedInterests: string[];
  maxInterests: number;
  isLoading: boolean;
  onToggle: (interest: string) => void;
}

const InterestsSection = ({
  interests,
  selectedInterests,
  maxInterests,
  isLoading,
  onToggle,
}: InterestsSectionProps) => {
  const renderInterestsGrid = (startIdx: number, endIdx: number) => {
    const interestsSlice = interests.slice(startIdx, endIdx);

    return (
      <div className="grid grid-cols-4 gap-2">
        {interestsSlice.map((interest) => (
          <ToggleButton
            key={interest.id}
            label={interest.name}
            isActive={selectedInterests.includes(interest.name)}
            onClick={() => onToggle(interest.name)}
            disabled={selectedInterests.length >= maxInterests && !selectedInterests.includes(interest.name)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-primary text-xs">관심사 (최대 {maxInterests}개)</p>
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
  );
};

export default InterestsSection;
