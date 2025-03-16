import Calendar from '@/components/Calendar';
import Chart from '@/components/Chart';
import CommonLayout from '@/components/layout/CommonLayout';

function MainPage() {
  return (
    <CommonLayout
      headerProps={{
        title: '메인페이지',
        isRightIcon: true,
        isLeftIcon: true,
      }}
      showFooter={true}>
      <Calendar />
      <Chart />
    </CommonLayout>
  );
}

export default MainPage;
