import { withKnobs } from '@storybook/addon-knobs';
import { MemoryRouter } from 'react-router-dom';
import { muiTheme } from 'storybook-addon-material-ui';

import darkTheme from '../src/app/themes/defaultDarkTheme';
import lightTheme from '../src/app/themes/defaultTheme';

import React from 'react';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'centered',
};

export const decorators = [
  withKnobs,
  muiTheme([darkTheme, lightTheme]),
  (Story) => (
    <MemoryRouter>
      <Story />
    </MemoryRouter>
  ),
];
