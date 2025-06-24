import { moonIcon, sunIcon, useTheme } from '@/shared';
import { Theme } from '@/shared/model';
import clsx from 'clsx';

interface Props {
  className?: string;
}

export const ThemeBtn = (props: Props) => {
  const { theme, changeTheme } = useTheme();
  
  return <div className={clsx(props.className)}>
    <button onClick={changeTheme}>
      {theme === Theme.LIGHT ? sunIcon : moonIcon}
    </button>
  </div>;
};
