import { createTheme } from '@mui/material';
import { grey, purple } from '@mui/material/colors';

export const APPBAR_HEIGHT = 70;

declare module '@mui/material/styles' {
  interface Palette {
    white: Palette['primary'];
  }

  interface PaletteOptions {
    white?: PaletteOptions['primary'];
  }
}

export const theme = createTheme({
  spacing: 8,
  palette: {
    primary: {
      // main: '#7e57c2',
      main: purple[700],
      light: purple[50],
      dark: '#673ab7',
    },
    secondary: {
      main: grey[400],
      light: grey[100],
      dark: '#14a37f',
    },
  },
});
