import Calendar from '@/components/Calendar';
import Chart from '@/components/Chart';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

function MainPage() {
  return (
    <section className="bg-background flex min-h-dvh flex-col items-center gap-5">
      <Header title="메인페이지" isLeftIcon={false} isRightIcon={true} />

      <Calendar />

      <Chart />

      <Footer />
    </section>
  );
}

export default MainPage;
