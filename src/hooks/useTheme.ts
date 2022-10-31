import * as DefaultVariables from '../theme/variables';
import Navigator from '../theme/navigator';

export const useTheme = () => {
  const themeVariables = DefaultVariables;

  return {
    Navigator: Navigator(themeVariables),
    ...themeVariables,
  };
};
