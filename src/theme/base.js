import { MainTheme } from './schemes/MainTheme';

export function themeCreator(theme) {
  return themeMap[theme];
}

const themeMap = {
  MainTheme
};
