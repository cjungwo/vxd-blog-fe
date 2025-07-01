import { moonIcon, sunIcon, useThemeStore } from '@/shared';
import clsx from 'clsx';

interface Props {
  className?: string;
}

export const ThemeBtn = (props: Props) => {
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  
  return <div className={clsx(props.className)}>
    <button onClick={toggleDarkMode}>
      {isDarkMode ? sunIcon : moonIcon}
    </button>
  </div>;
};
