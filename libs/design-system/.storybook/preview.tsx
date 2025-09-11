import '../src/ds.css';
import { IntlProvider } from 'react-intl';
import { Preview } from '@storybook/react-vite';
import fr from '../i18n/fr-FR.json';

const preview: Preview = {
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
};

export default preview;
