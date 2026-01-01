import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-onboarding', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/angular',
    options: {
      projectName: 'mlpm',
    },
  },
};
export default config;
