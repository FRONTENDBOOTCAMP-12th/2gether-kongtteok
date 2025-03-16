import { create } from 'zustand';
import { combine } from 'zustand/middleware';

interface BottomSheetType {
  title: string | null;
  isShow?: boolean;
}

const bottomSheet: BottomSheetType = {
  title: 'null',
  isShow: false,
};

export const useBottomSheetStore = create(
  combine({ ...bottomSheet }, (set) => ({
    showBottomSheet: ({ title }: BottomSheetType) => {
      set({ title, isShow: true });
    },
    hideBottomSheet: () => set(bottomSheet),
  }))
);
