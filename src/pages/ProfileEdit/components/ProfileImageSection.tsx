import { useState, useCallback } from 'react';
import { Pencil } from '@mynaui/icons-react';
import BottomSheet from '@/components/BottomSheet';
import supabase from '@/lib/supabase-client';

const DEFAULT_PROFILE = '/images/default/profile.webp';

interface ProfileImageSectionProps {
  userId: string;
  profileImage: string;
  onImageChange: (newImage: string) => void;
}

function ProfileImageSection({ userId, profileImage, onImageChange }: ProfileImageSectionProps) {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        onImageChange(reader.result as string);
      };
    },
    [onImageChange]
  );

  const handleDeleteImage = useCallback(async () => {
    if (!userId) return;

    try {
      await supabase.storage.from('images').remove([`profile/${userId}/profile.png`]);
      onImageChange(DEFAULT_PROFILE);

      const { error: updateError } = await supabase
        .from('users')
        .update({ profileImage: DEFAULT_PROFILE })
        .eq('id', userId);

      if (updateError) throw updateError;
    } catch (error) {
      console.error('이미지 삭제 실패:', error);
    }
  }, [userId, onImageChange]);

  return (
    <>
      <div className="relative flex items-center justify-center">
        <div className="border-brown-400 relative h-24 w-24 overflow-hidden rounded-full border-2">
          <img src={profileImage} alt="프로필 이미지" className="h-full w-full object-cover" />
        </div>
        <button
          className="bg-brown-400 absolute right-0 -bottom-0 translate-x-0 translate-y-0 transform rounded-full p-1"
          onClick={() => setIsBottomSheetOpen(true)}>
          <Pencil className="text-cream-100 size-4" />
        </button>
      </div>

      {isBottomSheetOpen && (
        <BottomSheet title="프로필 이미지" isOpen={isBottomSheetOpen} handleClose={() => setIsBottomSheetOpen(false)}>
          <label className="block cursor-pointer p-2 text-left">
            이미지 편집
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>
          <button className="p-2 text-left" onClick={handleDeleteImage}>
            이미지 삭제
          </button>
        </BottomSheet>
      )}
    </>
  );
}

export default ProfileImageSection;
