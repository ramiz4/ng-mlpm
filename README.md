# 🚀 NgMlpm - Angular Multilevel Progressive Menu

<div align="center">
  <img src="https://img.shields.io/badge/Angular-21.0-dd0031.svg" alt="Angular Version">
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

## 📋 Step-by-Step Usage Guide

### 1. Installation

Install the package using your preferred package manager:

```bash
# Using npm
npm install @ramiz4/ng-mlpm

# Using pnpm
pnpm add @ramiz4/ng-mlpm

# Using yarn
yarn add @ramiz4/ng-mlpm
```

### 2. Import the Component

Add the MlpmComponent to your standalone component or NgModule:

```typescript
// In a standalone component
import { Component } from '@angular/core';
import { MlpmComponent } from '@ramiz4/ng-mlpm';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [MlpmComponent],
  // ...
})
export class MyComponent {
  // Component logic
}

// OR in a module
import { NgModule } from '@angular/core';
import { MlpmComponent } from '@ramiz4/ng-mlpm';

@NgModule({
  imports: [
    // ...other imports
    MlpmComponent,
  ],
  // ...
})
export class MyModule {}
```

### 3. Define Menu Items

Create a menu structure in your component:

```typescript
import { Component } from '@angular/core';
import { MlpmComponent } from '@ramiz4/ng-mlpm';
import { MenuItem } from '@ramiz4/ng-mlpm'; // Import the interface

@Component({
  // ...
  imports: [MlpmComponent],
  // ...
})
export class YourComponent {
  // Define your menu structure
  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      link: '/dashboard',
    },
    {
      label: 'Settings',
      icon: 'settings',
      children: [
        { label: 'Profile', icon: 'person', link: '/settings/profile' },
        { label: 'Preferences', icon: 'tune', link: '/settings/preferences' },
      ],
    },
    {
      label: 'Reports',
      icon: 'bar_chart',
      children: [
        { label: 'Annual', icon: 'calendar_today', link: '/reports/annual' },
        { label: 'Monthly', icon: 'date_range', link: '/reports/monthly' },
        {
          label: 'Custom',
          icon: 'tune',
          children: [
            { label: 'By Region', icon: 'public', link: '/reports/custom/region' },
            { label: 'By Department', icon: 'people', link: '/reports/custom/department' },
          ],
        },
      ],
    },
  ];

  // Handle menu item clicks
  onMenuItemClick(item: MenuItem) {
    console.log('Menu item clicked:', item);
    // Add your navigation logic here
  }
}
```

### 4. Add the Component to Your Template

Use the component in your HTML template:

```html
<ng-mlpm [title]="'My Application'" [titleIcon]="'menu'" [menuItems]="menuItems" (linkClick)="onMenuItemClick($event)">
</ng-mlpm>
```

### 5. Customize the Theme (Optional)

You can customize the appearance by providing a color theme:

```typescript
import { Component } from '@angular/core';
import { MlpmComponent, MenuColorTheme } from '@ramiz4/ng-mlpm';

@Component({
  // ...
})
export class YourComponent {
  // ...menu items

  // Define a custom theme
  customTheme: MenuColorTheme = {
    primaryBackground: '#2c3e50',
    secondaryBackground: '#34495e',
    tertiaryBackground: '#2c3e50',
    primaryText: '#ecf0f1',
    secondaryText: '#bdc3c7',
    tertiaryText: '#95a5a6',
    primaryAccent: '#3498db',
    secondaryAccent: '#2980b9',
    tertiaryAccent: '#1abc9c',
    primaryHover: '#3e5871',
    secondaryHover: '#2c3e50',
    tertiaryHover: '#34495e',
  };
}
```

Then apply it to the component:

```html
<ng-mlpm
  [title]="'My Application'"
  [titleIcon]="'menu'"
  [menuItems]="menuItems"
  [colorTheme]="customTheme"
  (linkClick)="onMenuItemClick($event)">
</ng-mlpm>
```

### 6. Using Icons

The component supports a variety of icons. By default, it uses Material Icons:

1. Add Material Icons to your project by including the following in your `index.html`:

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
```

2. Use icon names from the Material Icons library in your menu items:

```typescript
menuItems = [
  {
    label: 'Dashboard',
    icon: 'dashboard', // Material icon name
    link: '/dashboard',
  },
  // ...
];
```

### 7. Handling Navigation

Implement navigation logic in your component:

```typescript
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MlpmComponent, MenuItem } from '@ramiz4/ng-mlpm';

@Component({
  // ...
  imports: [MlpmComponent],
  // ...
})
export class YourComponent {
  // ...menu items

  constructor(private router: Router) {}

  onMenuItemClick(item: MenuItem) {
    if (item.link) {
      this.router.navigate([item.link]);
    }
  }
}
```

### 8. Responsive Behavior

The component is responsive by default. For mobile views, you might want to toggle its visibility:

```typescript
import { Component, ViewChild } from '@angular/core';
import { MlpmComponent } from '@ramiz4/ng-mlpm';

@Component({
  // ...
})
export class YourComponent {
  // ...menu items

  @ViewChild(MlpmComponent) menu!: MlpmComponent;

  toggleMenu() {
    this.menu.toggle();
  }
}
```

In your template:

```html
<button (click)="toggleMenu()">Toggle Menu</button>
<!-- Or access directly via template ref: <button (click)="menu.toggle()">Toggle</button> -->

<ng-mlpm #menu [title]="'My Application'" [menuItems]="menuItems" (linkClick)="onMenuItemClick($event)">
</ng-mlpm>
```

## 📚 API Reference

### Inputs

| Input      | Type           | Description                                | Default           |
| ---------- | -------------- | ------------------------------------------ | ----------------- |
| title      | string         | The title displayed at the top of the menu | 'Menu'            |
| titleIcon  | string         | Icon name for the title                    | 'menu'            |
| menuItems  | MenuItem[]     | Array of menu items to display             | []                |
| colorTheme | MenuColorTheme | Custom color theme for the menu            | defaultColorTheme |

### Outputs

| Output    | Type                   | Description                                     |
| --------- | ---------------------- | ----------------------------------------------- |
| linkClick | EventEmitter<MenuItem> | Emitted when a menu item with a link is clicked |

### Methods
| Method | Description |
| ------ | ----------- |
| toggle() | Toggles the collapsed state of the menu and triggers change detection. |

### Interfaces

```typescript
interface MenuItem {
  label: string;
  icon?: string;
  link?: string;
  children?: MenuItem[];
}

interface MenuColorTheme {
  primaryBackground: string;
  secondaryBackground: string;
  tertiaryBackground: string;

  primaryText: string;
  secondaryText: string;
  tertiaryText: string;

  primaryAccent: string;
  secondaryAccent: string;
  tertiaryAccent: string;

  primaryHover: string;
  secondaryHover: string;
  tertiaryHover: string;
}
```

## 🛠️ Development

To start a local development server, run:

```bash
# Using npm
npm start

# Using pnpm
pnpm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
