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
};

function CommonLayout({ children, headerProps, showFooter = true }: CommonLayoutProps) {
  let paddingClasses = '';

  if (headerProps && showFooter) {
    paddingClasses = 'px-4 pb-20';
  } else if (!showFooter) {
    paddingClasses = 'px-4 pb-4';
  } else {
    paddingClasses = 'p-4';
  }

  return (
    <div className="max-w-kong m-auto">
      {headerProps && <Header {...headerProps} />}
      <main className="p-4">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}

export default CommonLayout;
