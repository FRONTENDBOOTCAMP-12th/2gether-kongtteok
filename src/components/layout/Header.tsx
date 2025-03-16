import { BellSolid, ChevronLeft, CogFourSolid } from '@mynaui/icons-react';
import { useNavigate } from 'react-router';

interface TopHeaderProps {
  title: string;
  isLeftIcon?: boolean;
  isRightIcon?: boolean;
}

function Header({ title, isLeftIcon = false, isRightIcon = false }: TopHeaderProps) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <header className="relative flex h-12.5 w-full items-center justify-between px-4 text-base font-medium">
      <div className="w-16">
        {isLeftIcon && (
          <button
            type="button"
            className="flex size-8 items-center justify-center"
            aria-label="뒤로 가기"
            onClick={handleBackClick}>
            <ChevronLeft className="text-primary size-4" aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <p className="text-primary text-center text-base">{title}</p>
      </div>

      <div className="flex w-16 justify-end">
        {isRightIcon && (
          <>
            <button type="button" className="flex size-8 items-center justify-center" aria-label="알람페이지로 가기">
              <BellSolid className="fill-primary size-4" aria-hidden="true" />
            </button>
            <button type="button" className="flex size-8 items-center justify-center" aria-label="일기 리스트로 가기">
              <CogFourSolid className="fill-primary size-4" aria-hidden="true" />
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
