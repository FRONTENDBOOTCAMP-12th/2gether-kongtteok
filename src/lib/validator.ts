export const isId = (value: string) => {
  const regExp = /^[a-zA-Z0-9]{6,}$/;
  return regExp.test(value);
};

export const isPassword = (value: string, { min = 8, max = 16, isStrong = true } = {}) => {
  let regExp = null;

  if (!isStrong) {
    regExp = new RegExp(`^(?=.*\\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{${min},${max}}$`);
  } else {
    regExp = new RegExp(`^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$\`~!@$!%*#^?&\\(\\)\\-_=+]).{${min},${max}}$`);
  }

  return regExp.test(value);
};

export const isEmail = (value: string) => {
  const regExp = /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return regExp.test(value);
};

const validator = {
  isId,
  isPassword,
  isEmail,
};

export default validator;
