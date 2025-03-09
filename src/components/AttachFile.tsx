import React, { ComponentProps, useId, useState } from 'react';
import Button from './Button';
import { tm } from '@/utils/ts-merge';
import { Paperclip } from '@mynaui/icons-react';
import { Swiper, SwiperSlide } from 'swiper/react';

type AttachFileProps = ComponentProps<'input'> & {
  label: string;
  children?: React.ReactNode | undefined;
};

function AttachFile({ label, children, className }: AttachFileProps) {
  const [imageSrc, setImageSrc] = useState<string[] | null>(null);
  const id = useId();

  const handleAttachFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files;

    if (file) {
      setImageSrc([...file].map((img) => URL.createObjectURL(img)));
    }
  };

  return (
    <>
      <Swiper hidden={!imageSrc} slidesPerView={1} className="attach-image max-w-kong max-h-72">
        {imageSrc &&
          imageSrc.map((src) => {
            return (
              <SwiperSlide key={src} className="relative">
                <img src={src} alt="첨부 이미지" />
                <Button
                  intent="secondary"
                  inlineSize="fit"
                  size="small"
                  className="absolute top-1 right-1 cursor-pointer">
                  삭제
                </Button>
              </SwiperSlide>
            );
          })}
      </Swiper>
      {children}

      <label className={tm("relative inline-block", className)}>
        <Button inlineSize="fit" intent="outline" className="inline-flex items-center mt-3">
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
