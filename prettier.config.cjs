module.exports = {
  arrowParens: 'always', // 화살표 함수 식 매개변수 () 생략 여부 (ex: (a) => a)
  htmlWhitespaceSensitivity: 'css',
  bracketSameLine: false, // 닫는 괄호(>) 위치 설정
  bracketSpacing: true, // 객체 표기 괄호 사이 공백 추가 여부 (ex: { foo: bar })
  printWidth: 200, // 행폭 설정 (줄 길이가 설정 값보다 길어지면 자동 개행)
  proseWrap: 'preserve', // 산문 래핑 설정
  quoteProps: 'as-needed', // 객체 속성 key 값에 인용 부호 사용 여부 (ex: { 'key': 'xkieo-xxxx' })
  semi: true, // 세미콜론(;) 사용 여부
  singleQuote: true, // 싱글 인용 부호(') 사용 여부
  jsxSingleQuote: false,
  tabWidth: 2, // 탭 너비 설정
  trailingComma: 'es5', // 객체 마지막 속성 선언 뒷 부분에 콤마 추가 여부
  useTabs: false, // 탭 사용 여부
  plugins: ['prettier-plugin-tailwindcss'],
};
