import { useState, useCallback, useMemo, ChangeEvent } from 'react';
import validator from '@/lib/validator';
import supabase from '@/lib/supabase-client';

type FormField = 'email' | 'password' | 'confirmPassword' | 'nickname';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
}

interface Errors {
  emailError: string;
  passwordError: string;
  confirmPasswordError: string;
  nicknameError: string;
}

export const useFormValidation = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
  });

  const [errors, setErrors] = useState<Errors>({
    emailError: '',
    passwordError: '',
    confirmPasswordError: '',
    nicknameError: '',
  });

  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  const validateField = useCallback(
    (name: FormField, value: string) => {
      let error = '';

      switch (name) {
        case 'email':
          if (!validator.isEmail(value)) {
            error = '올바른 이메일 형식이 아닙니다.';
          }
          break;
        case 'password':
          if (!validator.isPassword(value)) {
            error = '영어, 숫자, 특수문자 포함 8자리 이상 입력해주세요.';
          }
          if (formData.confirmPassword && value !== formData.confirmPassword) {
            setErrors((prev) => ({ ...prev, confirmPasswordError: '비밀번호가 일치하지 않습니다.' }));
          } else {
            setErrors((prev) => ({ ...prev, confirmPasswordError: '' }));
          }
          break;
        case 'confirmPassword':
          if (value !== formData.password) {
            error = '비밀번호가 일치하지 않습니다.';
          }
          break;
        case 'nickname':
          if (!validator.isNickname(value)) {
            error = '특수문자 제외 2~8자로 입력해주세요.';
          }
          break;
      }

      setErrors((prev) => ({ ...prev, [`${name}Error`]: error }));
    },
    [formData.password, formData.confirmPassword]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      if (name === 'email') {
        setIsEmailChecked(false);
      } else if (name === 'nickname') {
        setIsNicknameChecked(false);
      }

      validateField(name as FormField, value);
    },
    [validateField]
  );

  const checkEmail = useCallback(async () => {
    if (!validator.isEmail(formData.email)) return;

    try {
      const { data, error } = await supabase.from('users').select('email').eq('email', formData.email);

      if (error) throw error;

      if (data && data.length > 0) {
        setErrors((prev) => ({ ...prev, emailError: '중복된 이메일입니다.' }));
        setIsEmailChecked(false);
      } else {
        setErrors((prev) => ({ ...prev, emailError: '사용 가능한 이메일입니다.' }));
        setIsEmailChecked(true);
      }
    } catch (error) {
      console.error('Email check error:', error);
      setErrors((prev) => ({ ...prev, emailError: '이메일 확인 중 오류가 발생했습니다.' }));
      setIsEmailChecked(false);
    }
  }, [formData.email]);

  const checkNickname = useCallback(async () => {
    if (!validator.isNickname(formData.nickname)) return;

    try {
      const { data, error } = await supabase.from('users').select('nickname').eq('nickname', formData.nickname);

      if (error) throw error;

      if (data && data.length > 0) {
        setErrors((prev) => ({ ...prev, nicknameError: '중복된 닉네임입니다.' }));
        setIsNicknameChecked(false);
      } else {
        setErrors((prev) => ({ ...prev, nicknameError: '사용 가능한 닉네임입니다.' }));
        setIsNicknameChecked(true);
      }
    } catch (error) {
      console.error('Nickname check error:', error);
      setErrors((prev) => ({ ...prev, nicknameError: '닉네임 확인 중 오류가 발생했습니다.' }));
      setIsNicknameChecked(false);
    }
  }, [formData.nickname]);

  const isEmailValid = useMemo(
    () => formData.email && (!errors.emailError || errors.emailError === '사용 가능한 이메일입니다.') && isEmailChecked,
    [formData.email, errors.emailError, isEmailChecked]
  );

  const isPasswordValid = useMemo(
    () => formData.password && !errors.passwordError,
    [formData.password, errors.passwordError]
  );

  const isConfirmPasswordValid = useMemo(
    () => formData.confirmPassword && !errors.confirmPasswordError,
    [formData.confirmPassword, errors.confirmPasswordError]
  );

  const isNicknameValid = useMemo(
    () =>
      formData.nickname &&
      (!errors.nicknameError || errors.nicknameError === '사용 가능한 닉네임입니다.') &&
      isNicknameChecked,
    [formData.nickname, errors.nicknameError, isNicknameChecked]
  );

  return {
    formData,
    errors,
    isEmailChecked,
    isNicknameChecked,
    isEmailValid,
    isPasswordValid,
    isConfirmPasswordValid,
    isNicknameValid,
    handleChange,
    checkEmail,
    checkNickname,
  };
};
