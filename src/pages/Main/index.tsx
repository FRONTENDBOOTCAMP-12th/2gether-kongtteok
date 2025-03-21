import Calendar from '@/components/Calendar';
import EmotionChart from '@/components/Chart';
import CommonLayout from '@/components/layout/CommonLayout';

function MainPage() {
  return (
    <CommonLayout
      headerProps={{
        title: '메인페이지',
        isRightIcon: true,
      }}
      showFooter={true}>
      <div className="mt-6 flex flex-col gap-10">
        <Calendar />
        <EmotionChart />
      </div>
    </CommonLayout>
  );
}

export default MainPage;
