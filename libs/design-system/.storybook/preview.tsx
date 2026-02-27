import '../src/ds.css';
import { IntlProvider } from 'react-intl';
import { definePreview } from '@storybook/react-vite';
import fr from '../i18n/fr-FR.json';

export default definePreview({
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  decorators: [
    (Story) => {
      return (
        <IntlProvider locale="fr-FR" messages={fr}>
          <Story />
        </IntlProvider>
      );
    },
  ],

  addons: []
});
