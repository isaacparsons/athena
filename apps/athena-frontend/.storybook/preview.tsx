import React from 'react';
// import { Preview } from '@storybook/react';
// import { ThemeProvider } from '@mui/material';
// import { theme } from '../src/theme';

// const preview: Preview = {
//     decorators: [
//         (Story) => {
//             return (
//                 <ThemeProvider theme={theme}>
//                     <Story />
//                 </ThemeProvider>
//             );
//         },
//     ],
// };

// export default preview;

import { ThemeProvider } from '@mui/material/styles';
// import { ThemeProvider as Emotion10ThemeProvider } from 'emotion-theming';
import { theme } from '../src/theme';

const defaultTheme = theme;

const withThemeProvider = (Story, context) => {
    return (
        <ThemeProvider theme={defaultTheme}>
            <Story {...context} />
        </ThemeProvider>
    );
};

export const decorators = [withThemeProvider];

//another storybook exports.
