import Footer from './Footer';
import Header from './Header';

interface CommonLayoutProps {
  children: React.ReactNode;
  headerProps?: {
    title: string;
    isLeftIcon?: boolean;
    isRightIcon?: boolean;
  };
  showFooter?: boolean;
}

function CommonLayout({ children, headerProps, showFooter = true }: CommonLayoutProps) {
  return (
    <div className="mx-auto w-full max-w-[440px] min-w-[320px]">
      <div className={`flex min-h-screen flex-col ${showFooter ? 'pb-16' : ''}`}>
        {headerProps && <Header {...headerProps} />}
        <main className="flex-grow p-4">{children}</main>
        {showFooter && <Footer />}
      </div>
    </div>
  );
}

export default CommonLayout;
