import React, { ComponentProps, useId, useState } from 'react';
import Button from './Button';
import { tm } from '@/utils/ts-merge';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation } from 'swiper/modules';
import { Paperclip, Trash } from '@mynaui/icons-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type AttachFileProps = ComponentProps<'input'> & {
  label: string;
  children?: React.ReactNode | undefined;
  attachImage?: (file: FileList) => void;
};

function AttachFile({ label, children, className, attachImage }: AttachFileProps) {
  const [imageSrc, setImageSrc] = useState<string[] | null>(null);
  const id = useId();

  const handleAttachFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;

    if (file) {
      attachImage?.(file);

      setImageSrc((item) =>
        item
          ? [...item, ...[...file].map((img) => URL.createObjectURL(img))]
          : [...file].map((img) => URL.createObjectURL(img))
      );
    }
  };

  const handleDelete = (key: string) => {
    setImageSrc(imageSrc?.filter((img) => img !== key) ?? null);
  };

  return (
    <>
      <Swiper
        hidden={!imageSrc}
        modules={[Navigation, A11y]}
        navigation={(imageSrc && imageSrc.length > 1) || undefined}
        slidesPerView={1}
        className={tm(
          'attach-image max-w-kong border-primary max-h-72 rounded-[10px]',
          imageSrc && imageSrc?.length ? 'mb-3 border' : null
        )}>
        {imageSrc &&
          imageSrc.map((src) => {
            return (
              <SwiperSlide key={src} className="relative">
                <img src={src} alt="첨부 이미지" />
                <Button
                  intent="outline"
                  inlineSize="fit"
                  size="small"
                  onClick={() => {
                    handleDelete(src);
                  }}
                  className="bg-blueberry-200 absolute top-1 right-1 cursor-pointer px-1">
                  <Trash width={22} height={22} />
                </Button>
              </SwiperSlide>
            );
          })}
      </Swiper>

      {children}

      <label className={tm('relative inline-block', className)}>
        <Button inlineSize="fit" intent="outline" className="mt-3 inline-flex items-center">
          {label}
          <Paperclip width={18} aria-hidden />
        </Button>
        <input
          type="file"
          id={id}
          accept="image/*"
          onChange={handleAttachFile}
          className="absolute inset-0 z-10 cursor-pointer text-[0px]"
          multiple
        />
      </label>
    </>
  );
}

export default AttachFile;
