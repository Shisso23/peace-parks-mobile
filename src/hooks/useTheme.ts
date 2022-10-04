import * as DefaultVariables from '../theme/Variables';
import Navigator from '../theme/Navigator';

export const useTheme = () => {
  const themeVariables = DefaultVariables;

  return {
    Navigator: Navigator(themeVariables),
    ...themeVariables,
  };
};
