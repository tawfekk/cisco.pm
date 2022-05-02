import { NebulaFighterTheme } from './schemes/NebulaFighterTheme';

export function themeCreator(theme) {
  return themeMap[theme];
}

const themeMap = {
  NebulaFighterTheme
};
