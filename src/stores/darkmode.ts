import { create } from 'zustand';

interface DarkmodeState {
  darkmode: boolean;
}

interface DarkmodeActions {
  actions: {
    toggle: () => void;
  };
}

const initialState: DarkmodeState = {
  darkmode: false,
};

export const useDarkmodeStore = create<DarkmodeState & DarkmodeActions>((set) => ({
  ...initialState,
  actions: {
    toggle: () => {
      set(({ darkmode }) => ({ darkmode: !darkmode }));
    },
  },
}));
