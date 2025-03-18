import Calendar from '@/components/Calendar';
import Chart from '@/components/Chart';
import CommonLayout from '@/components/layout/CommonLayout';

function MainPage() {
  return (
    <CommonLayout
      headerProps={{
        title: '메인페이지',
        isRightIcon: true,
      }}
      showFooter={true}>
      <div className="flex flex-col gap-5">
        <Calendar />
        <Chart />
      </div>
    </CommonLayout>
  );
}

export default MainPage;
