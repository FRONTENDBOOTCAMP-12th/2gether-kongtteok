import { HTMLAttributes } from 'react';

interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
  text?: string;
}

function Loading({ text = '로딩중...', children, className }: LoadingProps) {
  return (
    <div className="absolute-content flex -translate-x-[50%] flex-col items-center justify-center gap-y-1">
      <div className={className}>{children}</div>
      <span className="text-primary">{text}</span>
    </div>
  );
}

export default Loading;
