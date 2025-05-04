import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconComponent } from './icon.component';
import { MenuColorTheme } from './menu-color-theme.interface';
import { MenuItem } from './menu-item.interface';

@Component({
  selector: 'ng-mlpm',
  standalone: true,
  templateUrl: './mlpm.component.html',
  styleUrls: ['./mlpm.component.scss'],
  imports: [NgIf, NgFor, NgClass, IconComponent],
})
export class MlpmComponent {
  @Input() title = '';
  @Input() titleIcon = '';
  @Input() menuItems: MenuItem[] = [];

  // Add output event emitter for link clicks
  @Output() linkClick = new EventEmitter<MenuItem>();

  // Color theme configuration with defaults
  @Input() set colorTheme(theme: Partial<MenuColorTheme>) {
    this._colorTheme = { ...this.defaultColorTheme, ...theme };
    this.applyColorTheme();
  }

  get colorTheme(): MenuColorTheme {
    return this._colorTheme;
  }

  private _colorTheme: MenuColorTheme;

  // Default color theme (elegant gray gradient scheme)
  private defaultColorTheme: MenuColorTheme = {
    primary: '#2c3e50', // Deep slate gray
    secondary: '#34495e', // Medium slate gray
    text: '#ecf0f1', // Light silver text
    accent: '#3498db', // Sky blue accent
    hover: '#4a5c6b', // Light slate gray hover
  };

  menuStack: MenuItem[][] = [];
  titleStack: string[] = []; // Array to store the titles of clicked menu items
  iconStack: string[] = []; // Array to store the icons of clicked menu items
  activeIndex = 0;
  collapsed = false; // New state to track if menu is collapsed

  constructor() {
    this._colorTheme = { ...this.defaultColorTheme };
    this.applyColorTheme();
  }

  // Apply CSS custom properties to the document root for theming
  private applyColorTheme(): void {
    document.documentElement.style.setProperty(
      '--mlpm-primary-color',
      this.colorTheme.primary
    );
    document.documentElement.style.setProperty(
      '--mlpm-secondary-color',
      this.colorTheme.secondary
    );
    document.documentElement.style.setProperty(
      '--mlpm-text-color',
      this.colorTheme.text
    );
    document.documentElement.style.setProperty(
      '--mlpm-accent-color',
      this.colorTheme.accent
    );
    document.documentElement.style.setProperty(
      '--mlpm-hover-color',
      this.colorTheme.hover
    );
  }

  // This method simply returns the icon class as-is
  getIconName(iconClass: string): string {
    return iconClass || '';
  }

  get allLevels(): MenuItem[][] {
    return [this.menuItems, ...this.menuStack];
  }

  // Get the title for a specific level
  getLevelTitle(index: number): string {
    if (index === 0) {
      return this.title;
    } else {
      return this.titleStack[index - 1] || '';
    }
  }

  // Get the icon for a specific level
  getLevelIcon(index: number): string {
    if (index === 0) {
      return this.titleIcon;
    } else {
      return this.iconStack[index - 1] || '';
    }
  }

  openSubmenu(item: MenuItem): void {
    if (item.children) {
      this.menuStack.push(item.children);
      this.titleStack.push(item.label); // Store the label of the clicked item
      this.iconStack.push(item.icon || ''); // Store the icon of the clicked item
      // Delay to ensure DOM has rendered the new level before triggering animation
      setTimeout(() => {
        this.activeIndex = this.menuStack.length;
      }, 0);
    } else if (item.link) {
      // Emit the link click event instead of just logging
      this.linkClick.emit(item);
    }
  }

  goBack(): void {
    if (this.menuStack.length > 0) {
      this.activeIndex = this.menuStack.length - 1;
      setTimeout(() => {
        this.menuStack.pop();
        this.titleStack.pop(); // Remove the corresponding title when going back
        this.iconStack.pop(); // Remove the corresponding icon when going back
      }, 400); // Match your CSS transition duration
    }
  }

  // New method to handle title icon click
  onTitleIconClick(): void {
    // Only collapse when at root level (activeIndex is 0)
    if (this.activeIndex === 0) {
      this.collapsed = !this.collapsed;
    }
  }
}
