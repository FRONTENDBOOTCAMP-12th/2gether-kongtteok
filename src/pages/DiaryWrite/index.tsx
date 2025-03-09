import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/Button';
import Switch from '@/components/Switch';
import InputText from '@/components/InputText';
import AttachFile from '@/components/AttachFile';
import Textarea from '@/components/Textarea';

interface DiaryWriteProps {
  date?: string;
}

const arrowIcon = (
  <svg width={9} height={6} viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.30297 0.891784L4.65148 5.10815L1 0.891784" stroke="#3E3232" strokeLinejoin="bevel" />
  </svg>
)

function DiaryWrite({ date }: DiaryWriteProps) {
  return (
    <div id="wrap" className="max-w-kong m-auto pb-15">
      <Header title="일기 쓰기" isLeftIcon isRightIcon />

      <main>
        <div className="flex flex-col gap-y-3">
          <div className="flex flex-row justify-between items-center mt-2">
            <div className="flex flex-row gap-x-2 items-center">
              <span className="text-[15px] text-primary">{date ?? '2025.03.09'}</span>
              <Button intent="outline" size="small" inlineSize="fit" className="flex flex-row gap-x-1.5 items-center bg-white">
                날씨{arrowIcon}
              </Button>
              <Button intent="outline" size="small" inlineSize="fit" className="flex flex-row gap-x-1.5 items-center bg-white">
                감정{arrowIcon}
              </Button>
            </div>
            <Switch label="혼자보기" />
          </div>
          <InputText labelText="제목" labelHidden />
          <div className="relative">
            <AttachFile label="이미지 첨부" className="mr-auto" >
              <Textarea label="일기 본문" className='h-50' />
            </AttachFile>
            <Button inlineSize='fit' className="absolute right-0 bottom-0">저장하기</Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default DiaryWrite;
