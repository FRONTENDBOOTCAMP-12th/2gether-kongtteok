import { useState, useCallback } from 'react';
import Button from '@/components/Button';
import InputText from '@/components/InputText';
import { Link, useNavigate } from 'react-router';
import supabase from '@/lib/supabase-client';

function SignInPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  }, []);

  const handleSignIn = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!formData.email || !formData.password) {
        setError('아이디와 비밀번호를 모두 입력해주세요.');
        return;
      }

      try {
        setIsLoading(true);
        setError('');

        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (signInError) throw signInError;

        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (userError) throw userError;

        localStorage.setItem('userData', JSON.stringify(userData));

        localStorage.setItem(
          'authData',
          JSON.stringify({
            user: data.user,
            session: data.session,
          })
        );

        navigate('/');
      } catch (error) {
        console.error('로그인 오류:', error);
        setError('아이디 또는 비밀번호가 올바르지 않습니다.');
      } finally {
        setIsLoading(false);
      }
    },
    [formData, navigate]
  );

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <section className="bg-background flex min-h-dvh flex-col items-center justify-center p-4">
      <header className="flex flex-grow items-center justify-center">
        <h1 className="sr-only">말랑콩떡 로그인</h1>
        <img src="/logo.webp" alt="말랑콩떡" width={265} height={240} />
      </header>
      <form className="flex w-full flex-col gap-15" onSubmit={handleSignIn}>
        <div className="flex flex-col gap-3">
          <InputText
            labelText="아이디"
            type="email"
            name="email"
            labelHidden
            placeholder="아이디 입력"
            value={formData.email}
            onChange={handleChange}
          />
          <InputText
            labelText="비밀번호"
            type="password"
            name="password"
            labelHidden
            placeholder="비밀번호 입력"
            value={formData.password}
            onChange={handleChange}
          />
          <div className="flex items-center justify-between">
            <span className="text-warning text-xs">{error}</span>
            <Link
              to={'/signin'}
              className="text-primary flex cursor-pointer justify-end text-xs"
              aria-label="아이디/비밀번호 찾기">
              아이디/비밀번호 찾기
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? '로그인 중...' : '로그인'}
          </Button>
          <Button intent="secondary" type="button" onClick={handleSignUp}>
            회원가입
          </Button>
        </div>
      </form>
    </section>
  );
}

export default SignInPage;
