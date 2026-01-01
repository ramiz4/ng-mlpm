# Storybook Migration Plan

## 🎯 Goal

Replace the custom `mlpm-app` demo application with **Storybook**.

## ❓ Why Storybook?

For a component library like `ng-mlpm`, Storybook offers significant advantages over a custom demo app:

- **Component Isolation**: Develop and test components in isolation without worrying about app context.
- **Better Documentation**: Automatically generates documentation (args table) from component inputs/outputs.
- **Interactive Testing**: "Knobs" (Controls) allow users/developers to change inputs dynamically to see how the component behaves.
- **Visual Regression Testing**: Easier to integrate with tools like Chromatic.
- **Standardization**: It's the industry standard for UI component development.

---

## 🚀 Migration Steps

### 1. Initialize Storybook

Run the following command in the root of your workspace to add Storybook configuration.
Since this is an Angular workspace, it will detect it and configure it for Angular.

```bash
npx storybook@latest init
```

During initialization:

- If asked, choose to add Storybook to the **root** or specifically for the **library** project (`mlpm`) if prompted. Usually, for a wrapper, the root is fine, but ensure it points to `projects/mlpm` sources.
- If it asks for the project type, confirm **Angular**.

### 2. Configure Storybook for the Library

Ensure `.storybook/main.ts` or `projects/mlpm/.storybook/main.ts` (depending on where it was installed) includes the library paths.

You might need to adjust `tsconfig.json` or `stories` paths to point to `projects/mlpm/src/lib/**/*.stories.ts`.

### 3. Create Stories

Delete the example stories created by the init script and create a new story for your main component.

**File:** `projects/mlpm/src/lib/mlpm.stories.ts` (or `.stories.ts`)

```typescript
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
        children: [{ label: 'Profile', icon: 'person', link: '/settings/profile' }],
      },
    ],
  },
};

export default meta;
type Story = StoryObj<MlpmComponent>;

export const Default: Story = {};

export const WithDarkTheme: Story = {
  args: {
    colorTheme: {
      primaryBackground: '#222',
      primaryText: '#fff',
      // ... add other theme props
    },
  },
};
```

### 4. Remove the Old Demo App (`mlpm-app`)

Once Storybook is running and verified:

1.  **Remove the project**:
    ```bash
    rm -rf projects/mlpm-app
    ```
2.  **Update `angular.json`**: Remove the `mlpm-app` configuration block.
3.  **Update `package.json`**:
    - Remove scripts: `build:app`, `test:app`, `deploy:gh-pages`.
    - Add scripts:
      ```json
      "storybook": "storybook dev -p 6006",
      "build-storybook": "storybook build"
      ```

### 5. Update CI/CD

Update your GitHub Actions (e.g., `release.yml` or `ci.yml`) to build Storybook instead of the demo app.

- **Build**: `npm run build-storybook`
- **Deploy**: Deploy the content of `storybook-static` (default output) to GitHub Pages instead of `dist/mlpm-app`.

---

## ✅ Verification

1.  Run `npm run storybook`.
2.  Verify the component renders correctly and controls work.
3.  Check that styles (CSS variables) are applied correctly within the Storybook iframe.
