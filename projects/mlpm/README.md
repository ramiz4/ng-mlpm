# @ramiz4/ng-mlpm

![Version](https://img.shields.io/badge/version-19.0.0-blue.svg)
![Angular](https://img.shields.io/badge/Angular-19.x-red.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

A modern, lightweight UI component library for Angular applications.

## ✨ Features

- 🚀 Built for Angular 19+
- 🎨 Customizable components
- 📱 Responsive design
- 🔍 Accessibility focused
- 🧩 Modular architecture
- 🖼️ Compatible with any icon library

## 📦 Installation

```bash
npm install @ramiz4/ng-mlpm
```

## 🔧 Usage

### Import the module

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MlpmComponent } from '@ramiz4/ng-mlpm';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MlpmComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Use components in your templates

```html
<!-- Using the main component -->
<ng-mlpm 
  [title]="'Main Menu'" 
  [titleIcon]="'menu'"
  [menuItems]="menuItems"
  (linkClick)="handleLinkClick($event)">
  Content goes here
</ng-mlpm>
```

## 🧩 Available Components

### MLPM Component

The main component that provides menu functionality with various UI features.

```html
<ng-mlpm [menuItems]="customMenuItems" [colorTheme]="customTheme"></ng-mlpm>
```

## 🎨 Customization

You can customize component appearance by:

1. Passing in configuration objects
2. Using CSS variables
3. Extending component styles

Example:

```typescript
// In your component
import { MenuColorTheme, MenuItem } from '@ramiz4/ng-mlpm';

export class AppComponent {
  // Define your menu items
  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      link: '/dashboard'
    },
    {
      label: 'Settings',
      icon: 'settings',
      children: [
        {
          label: 'Profile',
          icon: 'person',
          link: '/settings/profile'
        },
        {
          label: 'Account',
          icon: 'account_circle',
          link: '/settings/account'
        }
      ]
    }
  ];

  // Custom theme
  customTheme: Partial<MenuColorTheme> = {
    primary: '#1e3a8a',
    accent: '#3b82f6'
  };

  // Handle menu item clicks
  handleLinkClick(item: MenuItem): void {
    console.log('Clicked:', item.label, item.link);
    // Add your navigation logic here
  }
}
```

## 🔣 Using Custom Icon Libraries

This library is designed to work with any icon library of your choice. You can use Material Icons, Font Awesome, Bootstrap Icons, or any other icon library by simply including the appropriate CSS classes in your configuration.

### Setup Your Icon Library

First, install and include your preferred icon library in your project. For example, if using Font Awesome:

```bash
npm install @fortawesome/fontawesome-free
```

Then import it in your `styles.scss`:

```scss
@import '@fortawesome/fontawesome-free/css/all.css';
```

### Use Icon Classes in Your Configuration

When configuring the menu items, simply use the CSS classes from your icon library:

```typescript
// Using Font Awesome icons
menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: 'fas fa-tachometer-alt', // Font Awesome class
    link: '/dashboard'
  },
  {
    label: 'Settings',
    icon: 'fas fa-cog', // Font Awesome class
    children: [
      {
        label: 'Profile',
        icon: 'fas fa-user', // Font Awesome class
        link: '/settings/profile'
      }
    ]
  }
];
```

For the title icon, provide the CSS class for your icon:

```html
<ng-mlpm [titleIcon]="'fas fa-bars'"></ng-mlpm>
```

### Examples with Different Icon Libraries

**Material Icons:**
```typescript
// Using Material Icons
menuItems = [
  { label: 'Home', icon: 'material-icons home', link: '/home' },
  { label: 'Settings', icon: 'material-icons settings', children: [...] }
];
```

**Bootstrap Icons:**
```typescript
// Using Bootstrap Icons
menuItems = [
  { label: 'Home', icon: 'bi bi-house', link: '/home' },
  { label: 'Settings', icon: 'bi bi-gear', children: [...] }
];
```

The icons will be automatically applied to the menu items and will reflect the style of your chosen icon library.

## 🚀 Development

### Building the library

```bash
ng build mlpm
```

### Running tests

```bash
ng test mlpm
```

## 📄 License

MIT © [Ramiz Loki](https://github.com/yourusername)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!
