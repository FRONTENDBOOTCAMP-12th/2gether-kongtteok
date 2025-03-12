import { HomeSolid, PencilSolid, Search, UserSolid } from '@mynaui/icons-react';

const buttons = [
  { title: 'home', icon: <HomeSolid className="fill-background size-7" />, label: '홈 페이지로 가기' },
  { title: 'search', icon: <Search className="text-background size-7" />, label: '검색 페이지로 가기' },
  { title: 'diary', icon: <PencilSolid className="fill-background size-7" />, label: '일기쓰기 페이지로 가기' },
  { title: 'profile', icon: <UserSolid className="fill-background size-7" />, label: '프로필 페이지로 가기' },
];

function Footer() {
  return (
    <footer className="bg-primary fixed bottom-0 z-50 -mx-4 w-full max-w-[27.5rem] py-2.5">
      <nav className="flex items-center justify-around">
        <h1 className="sr-only">바텀 네비게이션</h1>
        {buttons.map(({ title, icon, label }) => (
          <button
            key={title}
            type="button"
            className="flex size-10 cursor-pointer items-center justify-center"
            title={title}
            aria-label={label}>
            {icon}
          </button>
        ))}
      </nav>
    </footer>
  );
}

export default Footer;
