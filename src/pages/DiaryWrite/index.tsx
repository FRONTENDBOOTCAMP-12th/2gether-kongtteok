import { useRef, useState } from 'react';
import { tm } from '@/utils/ts-merge';
import { uploadFile } from '@/utils/supabase-api';
import { useLocation, useNavigate } from 'react-router';
import { useAuthStore } from '@/stores/auth';
import { getDate, getDateDot } from '@/utils/get-date';
import { useBottomSheetStore } from '@/stores/bottom-sheet';
import supabase, { DATABASE_NAME, STORAGE_NAME, type DiaryItemInsert } from '@/lib/supabase-client';
import Button from '@/components/Button';
import Switch from '@/components/Switch';
import emotionList from '@/utils/emotion';
import weatherList from '@/utils/weather';
import Textarea from '@/components/Textarea';
import InputText from '@/components/InputText';
import AttachFile from '@/components/AttachFile';
import BottomSheet from '@/components/BottomSheet';
import EmotionButton from '@/components/EmotionButton';
import CommonLayout from '@/components/layout/CommonLayout';
import EmotionImage, { type EmotionType } from '@/components/EmotionImage';
import WeatherImage, { type WeatherType } from '@/components/WeatherImage';
import Modal from '@/components/Modal';

const arrowIcon = (
  <svg width={9} height={6} className="pointer-events" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.30297 0.891784L4.65148 5.10815L1 0.891784" stroke="var(--color-primary)" strokeLinejoin="bevel" />
  </svg>
);

const insertDiary = async (data: DiaryItemInsert) => {
  const { error } = await supabase.from(DATABASE_NAME).insert([data]);

  if (error) {
    console.error(error);
  }
};

function DiaryWrite() {
  const [weatherValue, setWeatherValue] = useState<WeatherType | ''>('');
  const [emotionValue, setEmotionValue] = useState<EmotionType | ''>('');
  const weather = weatherValue ? <WeatherImage weather={weatherValue} className="w-5" /> : '날씨';
  const emotion = emotionValue ? <EmotionImage emotion={emotionValue} className="w-5" /> : '감정';

  const [isEmptyWeather, setIsEmptyWeather] = useState<boolean | null>(null);
  const [isEmptyEmotion, setIsEmptyEmotion] = useState<boolean | null>(null);

  const imageFileList = useRef<File[]>([]);
  const imageFilesPath = useRef<string[]>([]);

  const [bottomSheetContents, setBottomSheetContents] = useState<React.ReactNode | string>('');
  const [showCompleteWriteModal, setShowCompleteWriteModal] = useState(false);

  const bottomSheetTitle = useBottomSheetStore((s) => s.title);
  const isBottomSheetShow = useBottomSheetStore((s) => s.isShow);
  const bottomSheetShow = useBottomSheetStore((s) => s.showBottomSheet);
  const bottomSheetHide = useBottomSheetStore((s) => s.hideBottomSheet);
  const userId = useAuthStore((s) => s.user);
  // eslint-disable-next-line
  const date = useLocation().search.split('=').at(-1) || getDate();
  const navigate = useNavigate();

  const selectEmotion = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const selecteEmotion = (e.target as HTMLImageElement).dataset.emotion as EmotionType;

    setEmotionValue(selecteEmotion);
    setIsEmptyEmotion(false);
    closeBottomSheet();
  };

  const selectWeather = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const selecteWeather = (e.target as HTMLImageElement).dataset.weather as WeatherType;

    setWeatherValue(selecteWeather);
    setIsEmptyWeather(false);
    closeBottomSheet();
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

  const selectValue = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const selectedText = (e.currentTarget as HTMLButtonElement).innerText;
    const selectedId = (e.target as HTMLImageElement).id;

    switch (selectedId) {
      case 'weather':
        setBottomSheetContents(weatherBtnList);
        break;

      case 'emotion':
        setBottomSheetContents(emotionBtnList);
        break;

      default:
        break;
    }

    bottomSheetShow({ title: `${selectedText} 선택` });
  };

  const closeBottomSheet = () => {
    bottomSheetHide();
  };

  const attachImage = (file: FileList) => {
    imageFileList.current = [...file];
  };

  const handleSubmit = (formData: FormData) => {
    if (!userId) {
      console.error('로그인 정보가 없습니다.');
      return;
    }

    let diaryData = {
      user_id: userId as unknown as string,
      date: formData.get('date'),
      weather: formData.get('weather'),
      emotion: formData.get('emotion'),
      title: formData.get('title'),
      content: formData.get('content'),
      diaryImage: imageFilesPath.current.length ? JSON.stringify(imageFilesPath.current) : null,
      isPrivate: !!formData.get('isPrivate'),
    } as DiaryItemInsert;

    setIsEmptyWeather(!weatherValue);
    setIsEmptyEmotion(!emotionValue);

    if (!weatherValue || !emotionValue || isEmptyWeather || isEmptyEmotion) {
      return;
    }

    try {
      if (imageFileList.current.length) {
        Promise.all(imageFileList.current.map(async (file) => await uploadFile({ date, user_id: userId, file })))
          .then((res) => {
            return res.map(({ data }) => {
              if (data) {
                return supabase.storage.from(STORAGE_NAME).getPublicUrl(data.path);
              }
            });
          })
          .then((dataList) => {
            imageFilesPath.current = dataList
              .map((item) => item?.data.publicUrl)
              .filter((item): item is string => Boolean(item));
          })
          .then(() => {
            diaryData = {
              ...diaryData,
              diaryImage: imageFilesPath.current,
            };
            insertDiary(diaryData).then(() => {
              imageFileList.current = [];
              imageFilesPath.current = [];

              setShowCompleteWriteModal(true);
            });
          });
      } else {
        insertDiary(diaryData).then(() => {
          setShowCompleteWriteModal(true);
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CommonLayout headerProps={{ title: '일기 쓰기', isLeftIcon: true, isRightIcon: true }}>
      <main>
        <form action={handleSubmit}>
          <div className="flex flex-col gap-y-3">
            <div className="mt-2 flex flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-x-2">
                <input type="hidden" name="weather" value={weatherValue} />
                <input type="hidden" name="emotion" value={emotionValue} />
                <span className="text-primary dark:text-background text-[15px] leading-3.5">{getDateDot(date)}</span>
                <input type="hidden" name="date" value={date} />
                <Button
                  id="weather"
                  intent="outline"
                  size="small"
                  inlineSize="fit"
                  onClick={selectValue}
                  className="dark:text-primary relative flex min-w-13 flex-row items-center gap-x-1.5 bg-white px-1.5">
                  {weather}
                  {arrowIcon}
                  <span
                    className={tm(
                      'absolute bottom-full left-[50%] mb-1 hidden -translate-x-[50%] px-2 py-0.25',
                      'bg-warning rounded-md whitespace-nowrap text-white',
                      { block: isEmptyWeather }
                    )}>
                    필수입력
                  </span>
                </Button>
                <Button
                  id="emotion"
                  intent="outline"
                  size="small"
                  inlineSize="fit"
                  onClick={selectValue}
                  className="dark:text-primary relative flex min-w-13 flex-row items-center gap-x-1.5 bg-white px-1.5">
                  {emotion}
                  {arrowIcon}
                  <span
                    className={tm(
                      'absolute bottom-full left-[50%] mb-1 hidden -translate-x-[50%] px-2 py-0.25',
                      'bg-warning rounded-md whitespace-nowrap text-white',
                      { block: isEmptyEmotion }
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

      <BottomSheet isOpen={isBottomSheetShow} title={bottomSheetTitle!} handleClose={closeBottomSheet}>
        {bottomSheetContents}
      </BottomSheet>

      {showCompleteWriteModal && (
        <Modal title="작성 완료" description="일기가 기록 되었어요." onConfirm={() => navigate('/')} />
      )}
    </CommonLayout>
  );
}

export default DiaryWrite;
