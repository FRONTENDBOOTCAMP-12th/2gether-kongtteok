import { useDarkmodeStore } from '@/stores/darkmode';
import Switch from './Switch';

function ThemeSetters() {
  const darkmode = useDarkmodeStore((s) => s.darkmode);
  const toggleDarkmode = useDarkmodeStore((s) => s.actions.toggle);

  return <Switch label="다크모드" checked={darkmode} onChangeValue={toggleDarkmode} />;
}

export default ThemeSetters;
