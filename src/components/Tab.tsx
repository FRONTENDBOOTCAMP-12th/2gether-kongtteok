interface TabProps {
  tabs: { title: string; value: string }[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

function Tab({ tabs, activeTab, onTabChange }: TabProps) {
  return (
    <nav className="bg-background relative flex h-[44px] w-full border-b border-gray-300">
      <h1 className="sr-only">탭 메뉴</h1>

      {tabs.map(({ title, value }) => (
        <button
          key={value}
          onClick={() => onTabChange(value)}
          className={`text-primary relative flex h-full w-1/2 items-center justify-center text-sm font-medium ${
            activeTab === value ? 'font-bold' : 'opacity-70'
          } `}
          aria-current={activeTab === value ? 'page' : undefined}>
          {title}
          <div
            className={`absolute bottom-0 left-0 w-full ${
              activeTab === value ? 'bg-primary h-[3px]' : 'bg-primary/30 h-[1px]'
            } `}
          />
        </button>
      ))}
    </nav>
  );
}

export default Tab;
