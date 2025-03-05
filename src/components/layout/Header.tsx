import { BellSolid, ChevronLeft, CogFourSolid } from '@mynaui/icons-react';

interface TopHeaderProps {
  title: string;
  isLeftIcon?: boolean;
  isRightIcon?: boolean;
}

function Header({ title, isLeftIcon = false, isRightIcon = false }: TopHeaderProps) {
  return (
    <header className="relative flex h-[3.125rem] w-full max-w-[27.5rem] items-center justify-center text-base font-medium">
      {isLeftIcon && (
        <button
          type="button"
          className="absolute -left-2 flex size-8 items-center justify-center"
          aria-label="뒤로 가기">
          <ChevronLeft className="text-primary size-4" aria-hidden="true" />
        </button>
      )}

      <div className="flex flex-col">
        <p className="text-primary text-center text-base">{title}</p>
      </div>

      {isRightIcon && (
        <div className="absolute -right-2 flex space-x-1">
          <button type="button" className="flex size-8 items-center justify-center" aria-label="알람페이지로 가기">
            <BellSolid className="fill-primary size-4" aria-hidden="true" />
          </button>
          <button type="button" className="flex size-8 items-center justify-center" aria-label="일기 리스트로 가기">
            <CogFourSolid className="fill-primary size-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
