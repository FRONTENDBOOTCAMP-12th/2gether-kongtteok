import Button from '@/components/Button';
import InputText from '@/components/InputText';

function SignInPage() {
  return (
    <section className="bg-background flex min-h-dvh flex-col items-center justify-center p-4">
      <header className="flex flex-grow items-center justify-center">
        <h1 className="sr-only">말랑콩떡 로그인</h1>
        <img src="/logo.webp" alt="말랑콩떡" width={265} height={240} />
      </header>
      <form className="flex w-full flex-col gap-15">
        <div className="flex flex-col gap-3">
          <InputText labelText="아이디" type="text" labelHidden placeholder="아이디 입력" />
          <InputText labelText="비밀번호" type="password" labelHidden placeholder="비밀번호 입력" />
          <a
            href="/signin"
            className="text-primary flex cursor-pointer justify-end text-xs"
            aria-label="아이디/비밀번호 찾기">
            아이디/비밀번호 찾기
          </a>
        </div>

        <div className="flex flex-col gap-3">
          <Button>로그인</Button>
          <Button intent="secondary">회원가입</Button>
        </div>
      </form>
    </section>
  );
}

export default SignInPage;
