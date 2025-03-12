import { useRef, useState } from 'react';
import supabase, { DATABASE_NAME, type DiaryItemInsert } from '@/lib/supabase-client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BottomSheet from '@/BottomSheet';
import Button from '@/components/Button';
import Switch from '@/components/Switch';
import emotionList from '@/utils/emotion';
import Textarea from '@/components/Textarea';
import InputText from '@/components/InputText';
import AttachFile from '@/components/AttachFile';
import EmotionImage, { EmotionType } from '@/components/EmotionImage';
import EmotionButton from '@/components/EmotionButton';
import { getDate } from '@/utils/get-date';
import { uploadFile } from '@/utils/supabase-api';

const arrowIcon = (
  <svg width={9} height={6} viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.30297 0.891784L4.65148 5.10815L1 0.891784" stroke="#3E3232" strokeLinejoin="bevel" />
  </svg>
);

interface DiaryWriteProps {
  date?: string;
}

function DiaryWrite({ date }: DiaryWriteProps) {
  const [weather, setWeather] = useState<string>('날씨');
  const [emotion, setEmotion] = useState<React.ReactNode | string>('감정');
  const [isBottomSheetShow, setIsBottomSheetShow] = useState<boolean>(false);
  const [bottomSheetTitle, setIsBottomSheetShowTitle] = useState<string>('');
  const imageFileList = useRef<File[]>([]);
  const imageFilesPath = useRef<string | undefined[]>([]);
  const weatherValue = useRef('');
  const emotionValue = useRef('');

  const selectEmotion = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const emotion = (e.target as HTMLImageElement).alt as EmotionType;

    setEmotion(<EmotionImage emotion={emotion} className="w-5" />);
    closeBottomSheet();
    emotionValue.current = emotion;
  };

  const emotionBtnList = (
    <div className="grid grid-cols-4 justify-items-center gap-y-4 pb-1">
      {emotionList.map((emotion) => (
        <EmotionButton
          key={emotion}
          emotion={emotion}
          value={emotion}
          title={emotion}
          className="w-12"
          onClick={selectEmotion}
        />
      ))}
    </div>
  );

  const selectWeather = (
    <div className="grid grid-cols-5 justify-items-center gap-y-4 pb-1">
      <button type="button" className="cursor-pointer">
        맑음
      </button>
      <button type="button" className="cursor-pointer">
        비
      </button>
      <button type="button" className="cursor-pointer">
        눈
      </button>
      <button type="button" className="cursor-pointer">
        바람 많음
      </button>
      <button type="button" className="cursor-pointer">
        흐림
      </button>
    </div>
  );

  const BottomSheetContents = bottomSheetTitle.includes('감정') ? emotionBtnList : selectWeather;
  const today = getDate();

  const openBottomSheet = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const name = (e.currentTarget as HTMLButtonElement).id;
    const bottomSheetTitle = name === 'emotion' ? '감정' : '날씨';

    setIsBottomSheetShow(true);
    setIsBottomSheetShowTitle(`${bottomSheetTitle} 선택`);
  };

  const closeBottomSheet = () => {
    setIsBottomSheetShow(false);
  };

  const attachImage = (file: FileList) => {
    imageFileList.current = [...file];
  };

  const handleWrite = async (formData: FormData) => {
    const diaryData = {
      user_id: 'kong',
      date: formData.get('date'),
      weather: formData.get('weather') || 'sunny',
      emotion: formData.get('emotion'),
      title: formData.get('title'),
      content: formData.get('content'),
      diaryImage: imageFileList.current.length ? JSON.stringify(imageFileList.current) : null,
      isPrivate: !!formData.get('isPrivate'),
    } as DiaryItemInsert;

    try {
      if (imageFileList.current.length) {
        Promise.all(
          imageFileList.current.map(async (file) => await uploadFile({ date: '2025-03-12', user_id: 'kong', file }))
        )
          .then((res) => {
            imageFilesPath.current = res.map(({ data }) => data?.path);
          })
          .then(async () => {
            console.log(diaryData);
            const { error } = await supabase.from(DATABASE_NAME).insert([diaryData]);

            if (error) {
              console.error(error);
            }
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="wrap" className="max-w-kong m-auto pb-15">
      <Header title="일기 쓰기" isLeftIcon isRightIcon />

      <main className="px-4">
        <form action={handleWrite}>
          <div className="flex flex-col gap-y-3">
            <div className="mt-2 flex flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-x-2">
                <input type="hidden" name="weather" value={weatherValue.current} />
                <input type="hidden" name="emotion" value={emotionValue.current} />
                <span className="text-primary text-[15px] leading-3.5">{date ?? today}</span>
                <input type="hidden" name="date" value={date ?? today} />
                <Button
                  id="weather"
                  intent="outline"
                  size="small"
                  inlineSize="fit"
                  value={weather}
                  onClick={openBottomSheet}
                  className="flex flex-row items-center gap-x-1.5 bg-white px-1.5">
                  {weather}
                  {arrowIcon}
                </Button>
                <Button
                  id="emotion"
                  intent="outline"
                  size="small"
                  inlineSize="fit"
                  onClick={openBottomSheet}
                  className="flex flex-row items-center gap-x-1.5 bg-white px-1.5">
                  {emotion}
                  {arrowIcon}
                </Button>
              </div>
              <Switch label="혼자보기" defaultChecked name="isPrivate" />
            </div>

            <InputText labelText="제목" name="title" required labelHidden />

            <div className="relative">
              <AttachFile label="이미지 첨부" attachImage={attachImage}>
                <Textarea label="일기 본문" labelHidden className="h-50" name="content" required />
              </AttachFile>
              <Button buttonType="submit" inlineSize="fit" className="absolute right-0 bottom-0">
                저장하기
              </Button>
            </div>
          </div>
        </form>
      </main>

      <BottomSheet isOpen={isBottomSheetShow} title={bottomSheetTitle} handleClose={closeBottomSheet}>
        {BottomSheetContents}
      </BottomSheet>

      <Footer />
    </div>
  );
}

export default DiaryWrite;
