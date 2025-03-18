/**
 * YYYY-MM-DD 형식의 현재 날짜 데이터를 얻는 함수
 * @returns YYYY-MM-DD 형식의 현재 날짜 데이터
 */
export function getDate(): string {
  const today = new Date();

  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');

  return year + '-' + month + '-' + day;
}

export function getDateDot(date?: string) {
  return (date ?? getDate()).split('-').join('.');
}

export function getDateKR(dateText?: string) {
  const date = dateText ?? new Date();
  let year;
  let month;
  let day;

  if (!dateText) {
    year = (date as Date).getFullYear();
    month = ((date as Date).getMonth() + 1).toString();
    day = (date as Date).getDate().toString();
  } else {
    [year, month, day] = (date as string).split('-');
  }

  return `${year}년 ${month}월 ${day}일`;
}
