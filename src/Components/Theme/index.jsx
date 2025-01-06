import { useMemo } from 'react';
import PropTypes from 'prop-types';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

import { overrides } from './overrides';
import { palette } from './palette';
import { typography } from './typography';

// ----------------------------------------------------------------------

export default function ThemeProvider({ children }) {

  const memoizedValue = useMemo(
    () => ({
      palette: palette(),

      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 767,
          lg: 1200,
          xl: 1536,
        },
      },

      typography,
    }),
    []
  );

  const theme = createTheme(memoizedValue);

  theme.components = overrides(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};