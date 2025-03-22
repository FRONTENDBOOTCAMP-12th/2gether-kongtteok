import { tm } from '@/utils/ts-merge';
import { type FallbackProps } from 'react-error-boundary';

function PrintError({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div
      role="alert"
      className={tm(
        'flex flex-col gap-2 rounded-md',
        'bg-black p-5 font-semibold text-red-600',
        'border-4 border-red-600'
      )}>
      <h2 className="text-2xl">오류 발생</h2>
      <p className="mb-2 text-lg text-red-500/90">{(error as Error).message}</p>
      <button
        type="button"
        className={tm('cursor-pointer', 'self-start', 'rounded-sm px-3 py-1.5', 'border-3 border-red-800 text-red-500')}
        onClick={resetErrorBoundary}>
        오류 복구
      </button>
    </div>
  );
}

export default PrintError;
