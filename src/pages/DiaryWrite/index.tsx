import { useRef, useState } from 'react';
import { tm } from '@/utils/ts-merge';
import { getDate } from '@/utils/get-date';
import { uploadFile } from '@/utils/supabase-api';
import supabase, { DATABASE_NAME, STORAGE_NAME, type DiaryItemInsert } from '@/lib/supabase-client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BottomSheet from '@/BottomSheet';
import Button from '@/components/Button';
import Switch from '@/components/Switch';
import Textarea from '@/components/Textarea';
import InputText from '@/components/InputText';
import AttachFile from '@/components/AttachFile';
import EmotionButton from '@/components/EmotionButton';
import emotionList from '@/utils/emotion';
import weatherList from '@/utils/weather';
import EmotionImage, { type EmotionType } from '@/components/EmotionImage';
import WeatherImage, { type WeatherType } from '@/components/WeatherImage';

const arrowIcon = (
  <svg width={9} height={6} viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.30297 0.891784L4.65148 5.10815L1 0.891784" stroke="var(--color-primary)" strokeLinejoin="bevel" />
  </svg>
);

interface DiaryWriteProps {
  date?: string;
}

const insertDiary = async(data: DiaryItemInsert) => {
  const { error } = await supabase.from(DATABASE_NAME).insert([data]);

  if (error) {
    console.error(error);
  }
}

function DiaryWrite({ date }: DiaryWriteProps) {
  const [weather, setWeather] = useState<React.ReactNode | string>('날씨');
  const [emotion, setEmotion] = useState<React.ReactNode | string>('감정');
  const [isBottomSheetShow, setIsBottomSheetShow] = useState<boolean>(false);
  const [bottomSheetTitle, setIsBottomSheetShowTitle] = useState<string>('');
  const [isEmptyWeather, setIsEmptyWeather] = useState<boolean>(false);
  const [isEmptyEmotion, setIsEmptyEmotion] = useState<boolean>(false);
  const imageFileList = useRef<File[]>([]);
  const imageFilesPath = useRef<string[]>([]);
  const weatherValue = useRef('');
  const emotionValue = useRef('');
  const titleValue = useRef<FormDataEntryValue | null | string>('');
  const contentValue = useRef<FormDataEntryValue | null | string>('');

  const selectEmotion = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const selecteEmotion = (e.target as HTMLImageElement).dataset.emotion as EmotionType;

    setEmotion(<EmotionImage emotion={selecteEmotion} className="w-5" />);
    closeBottomSheet();
    setIsEmptyEmotion(false);
    emotionValue.current = selecteEmotion;
  };

  const selectWeather = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const selecteWeather = (e.target as HTMLImageElement).dataset.weather as WeatherType;

    setWeather(<WeatherImage weather={selecteWeather} className="w-5" />);
    setIsEmptyWeather(false);
    closeBottomSheet();
    weatherValue.current = selecteWeather;
  };

  const emotionBtnList = (
    <div className="grid grid-cols-4 justify-items-center gap-y-4 pb-1">
      {emotionList.map((emotion) => (
        <EmotionButton key={emotion} emotion={emotion} className="w-12" onClick={selectEmotion} />
      ))}
    </div>
  );

  const weatherBtnList = (
    <div className="grid grid-cols-5 justify-items-center gap-y-4 pb-1">
      {weatherList.map((weather) => {
        return (
          <button type="button" key={weather} className="cursor-pointer" onClick={selectWeather}>
            <WeatherImage weather={weather} className="w-12" />
          </button>
        );
      })}
    </div>
  );

  const BottomSheetContents = bottomSheetTitle.includes('감정') ? emotionBtnList : weatherBtnList;
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

  const handleSubmit = (formData: FormData) => {
    const diaryData = {
      user_id: 'kong',
      date: formData.get('date'),
      weather: formData.get('weather'),
      emotion: formData.get('emotion'),
      title: formData.get('title'),
      content: formData.get('content'),
      diaryImage: imageFilesPath.current.length ? JSON.stringify(imageFilesPath.current) : null,
      isPrivate: !!formData.get('isPrivate'),
    } as DiaryItemInsert;

    setIsEmptyWeather(!weatherValue.current);
    setIsEmptyEmotion(!emotionValue.current);
    titleValue.current = formData.get('title');
    contentValue.current = formData.get('content');

    try {
      if (imageFileList.current.length) {
        Promise.all(
          imageFileList.current.map(async (file) => await uploadFile({ date: getDate(), user_id: 'kong', file }))
        )
          .then((res) => {
            return res.map(({ data }) => {
              if (data) {
                return supabase.storage.from(STORAGE_NAME).getPublicUrl(data.path);
              }
            });
          })
          .then((dataList)=> {
            imageFilesPath.current = dataList.map(item => item?.data.publicUrl).filter((item): item is string => Boolean(item));
          })
          .then(() => {
            console.log(imageFilesPath.current);
            console.log(diaryData)
            insertDiary(diaryData).then(() => {
              imageFileList.current = [];
              imageFilesPath.current = [];
            });
          });
      } else {
        insertDiary(diaryData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="wrap" className="max-w-kong m-auto pb-15">
      <Header title="일기 쓰기" isLeftIcon isRightIcon />

      <main className="px-4">
        <form action={handleSubmit}>
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
                  onClick={openBottomSheet}
                  className="relative flex min-w-13 flex-row items-center gap-x-1.5 bg-white px-1.5">
                  {weather}
                  {arrowIcon}
                  <span
                    className={tm(
                      'hidden absolute bottom-full left-[50%] mb-1 px-2 py-0.25 -translate-x-[50%]',
                      'bg-warning text-white  whitespace-nowrap rounded-md',
                      {'block': isEmptyWeather}
                    )}>
                    필수입력
                  </span>
                </Button>
                <Button
                  id="emotion"
                  intent="outline"
                  size="small"
                  inlineSize="fit"
                  onClick={openBottomSheet}
                  className="relative flex min-w-13 flex-row items-center gap-x-1.5 bg-white px-1.5">
                  {emotion}
                  {arrowIcon}
                  <span
                    className={tm(
                      'hidden absolute bottom-full left-[50%] mb-1 px-2 py-0.25 -translate-x-[50%]',
                      'bg-warning text-white  whitespace-nowrap rounded-md',
                      {'block': isEmptyEmotion}
                    )}>
                    필수입력
                  </span>
                </Button>
              </div>
              <Switch
                className="min-w-11"
                label="일기 공개 상태"
                stateOnText="혼자보기"
                stateOffText="자랑하기"
                defaultChecked
                name="isPrivate"
              />
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
