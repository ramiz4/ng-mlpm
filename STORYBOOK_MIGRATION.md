# Storybook Migration Plan

## 🎯 Goal

Replace the custom `mlpm-app` demo application with **Storybook 10**.

## ❓ Why Storybook?

For a component library like `ng-mlpm`, Storybook offers significant advantages over a custom demo app:

- **Component Isolation**: Develop and test components in isolation without worrying about app context.
- **Better Documentation**: Automatically generates documentation (args table) from component inputs/outputs.
- **Interactive Testing**: Built-in Controls and Actions allow users/developers to change inputs dynamically.
- **Standardization**: It's the industry standard for UI component development.

---

## 🚀 Migration Steps (Storybook 10)

### 1. Initialize Storybook

Run the following command in the root of your workspace:

```bash
npx storybook@latest init
```

### 2. Configure for Angular Library

In Storybook 10, the **Angular builder** is mandatory. Your `angular.json` should have `storybook` and `build-storybook` targets configured with a `browserTarget` pointing to the library's build.

**Example `angular.json` snippet:**
```json
"storybook": {
  "builder": "@storybook/angular:start-storybook",
  "options": {
    "configDir": "projects/mlpm/.storybook",
    "tsConfig": "projects/mlpm/tsconfig.storybook.json",
    "browserTarget": "mlpm:build",
    "compodoc": true,
    "port": 6006
  }
}
```

### 3. Essential Addons are Built-in

In Storybook 10, many "essential" addons (Controls, Actions, Viewport, Backgrounds, etc.) have been **integrated into the core**.

- **No need to install** `@storybook/addon-essentials`.
- **No need to list** them in `addons` in `main.ts`.
- They work automatically if you define `args` or `argTypes` in your stories.

### 4. Create Stories

**File:** `projects/mlpm/src/lib/mlpm.stories.ts`

```typescript
import type { Meta, StoryObj } from '@storybook/angular';
import { MlpmComponent } from './mlpm.component';

const meta: Meta<MlpmComponent> = {
  title: 'MLPM/Menu',
  component: MlpmComponent,
  tags: ['autodocs'],
  argTypes: {
    linkClick: { action: 'linkClick' }, // Actions are auto-detected
  },
  args: {
    title: 'My Menu',
    // ... other args
  },
};

export default meta;
type Story = StoryObj<MlpmComponent>;
export const Default: Story = {};
```

### 5. Update Scripts

The `package.json` should use `ng run` to start Storybook:

```json
"scripts": {
  "storybook": "ng run mlpm:storybook",
  "build-storybook": "ng run mlpm:build-storybook"
}
```

---

## ✅ Verification

1.  Run `pnpm storybook`.
2.  Verify the component renders in the Canvas.
3.  Check that **Controls**, **Actions**, and **Docs** tabs are visible in the sidebar/panel.
