import type { Meta, StoryObj } from '@storybook/angular';
import { MlpmComponent } from './mlpm.component';

const meta: Meta<MlpmComponent> = {
  title: 'MLPM/Menu',
  component: MlpmComponent,
  tags: ['autodocs'],
  argTypes: {
    linkClick: { action: 'linkClick' },
  },
  args: {
    title: 'My Menu',
    titleIcon: 'menu',
    menuItems: [
      { label: 'Dashboard', icon: 'dashboard', link: '/dashboard' },
      {
        label: 'Settings',
        icon: 'settings',
        children: [
          { label: 'Profile', icon: 'person', link: '/settings/profile' }
        ]
      }
    ],
  }
};

export default meta;
type Story = StoryObj<MlpmComponent>;

export const Default: Story = {};

export const WithDarkTheme: Story = {
  args: {
    colorTheme: {
      primaryBackground: '#222',
      primaryText: '#fff',
    }
  }
};
