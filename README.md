# 🚀 NgMlpm - Angular Multilevel Progressive Menu

<div align="center">
  <img src="https://img.shields.io/badge/Angular-19.2-dd0031.svg" alt="Angular Version">
  <img src="https://img.shields.io/badge/TypeScript-5.7-007acc.svg" alt="TypeScript Version">
  <a href="https://ramiz4.github.io/ng-mlpm/home" target="_blank">
    <img src="https://img.shields.io/badge/Demo-Live-brightgreen.svg" alt="Live Demo">
  </a>
</div>

## ✨ Overview

**NgMlpm** is an elegant, highly customizable multilevel progressive menu component library for Angular applications. It provides a smooth user experience for navigating complex menu hierarchies with animated transitions and a responsive design.

## 🔥 Live Demo

Experience the component in action: [Live Demo](https://ramiz4.github.io/ng-mlpm)

## 🎨 Features

- **Hierarchical Navigation** - Seamlessly navigate through nested menu structures
- **Smooth Animations** - Enjoy fluid transitions between menu levels
- **Customizable Themes** - Easily adapt the menu to match your application's design system
- **Icon Support** - Integrate icons for enhanced visual navigation
- **Responsive Design** - Works beautifully across all device sizes
- **Standalone Components** - Built with Angular's latest standalone component architecture
- **Lightweight** - Minimal footprint for optimal performance

## 🚀 Getting Started

### Installation

```bash
npm install ng-mlpm
# or
pnpm add ng-mlpm
# or
yarn add ng-mlpm
```

### Basic Usage

```typescript
// Import the component in your standalone component or NgModule
import { MlpmComponent } from 'ng-mlpm';

@Component({
  // ...
  imports: [MlpmComponent],
  // ...
})
export class YourComponent {
  menuItems = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      link: '/dashboard'
    },
    {
      label: 'Settings',
      icon: 'settings',
      children: [
        { label: 'Profile', icon: 'person', link: '/settings/profile' },
        { label: 'Preferences', icon: 'tune', link: '/settings/preferences' }
      ]
    }
  ];
  
  onMenuItemClick(item) {
    console.log('Menu item clicked:', item);
  }
}
```

```html
<ng-mlpm 
  [title]="'My App'" 
  [titleIcon]="'menu'" 
  [menuItems]="menuItems"
  [colorTheme]="customTheme"
  (linkClick)="onMenuItemClick($event)">
</ng-mlpm>
```

## 🛠️ Development

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
