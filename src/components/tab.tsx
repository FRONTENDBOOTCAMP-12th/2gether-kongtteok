import { Link, useLocation } from 'react-router-dom';

function Tab() {
  const location = useLocation();

  const activeTab = location.pathname === '/empathy' ? '공감' : '쪽지';

  const tabs = [
    { title: '공감', path: '/empathy' },
    { title: '쪽지', path: '/letter' },
  ];

  return (
    <nav className="relative flex h-[44px] w-full border-b border-gray-300 bg-[#FFFBEB]">
      <h1 className="sr-only">탭 메뉴</h1>

      {tabs.map(({ title, path }) => (
        <Link
          key={title}
          to={path}
          className={`relative flex h-full w-1/2 items-center justify-center text-sm font-medium text-[#3E3232] ${activeTab === title ? 'font-bold' : 'opacity-70'} `}
          aria-current={activeTab === title ? 'page' : undefined}>
          {title}

          <div
            className={`absolute bottom-0 left-0 w-full ${activeTab === title ? 'h-[3px] bg-[#3E3232]' : 'h-[1px] bg-[#3E3232]/30'} `}
          />
        </Link>
      ))}
    </nav>
  );
}

export default Tab;
