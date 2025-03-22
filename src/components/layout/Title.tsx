interface TitleProps {
  children: string;
}

function Title({ children }: TitleProps) {
  return <title>{children}</title>;
}

export default Title;
