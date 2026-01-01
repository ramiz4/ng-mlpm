import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef } from '@angular/core';
import { IconComponent } from './icon.component';
import { MenuColorTheme } from './menu-color-theme.interface';
import { MenuItem } from './menu-item.interface';

@Component({
  selector: 'ng-mlpm',
  standalone: true,
  templateUrl: './mlpm.component.html',
  styleUrls: ['./mlpm.component.scss'],
  imports: [NgClass, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MlpmComponent {
  @Input() title = '';
  @Input() titleIcon = '';
  @Input() menuItems: MenuItem[] = [];

  // Add output event emitter for link clicks
  @Output() linkClick = new EventEmitter<MenuItem>();

  // Color theme configuration with defaults
  @Input() set colorTheme(theme: Partial<MenuColorTheme>) {
    this.applyColorTheme(theme);
  }

  menuStack: MenuItem[][] = [];
  titleStack: string[] = []; // Array to store the titles of clicked menu items
  iconStack: string[] = []; // Array to store the icons of clicked menu items
  activeIndex = 0;
  collapsed = false; // New state to track if menu is collapsed

  constructor(private elementRef: ElementRef, private cdr: ChangeDetectorRef) { }

  // Apply CSS custom properties to the component host for theming
  private applyColorTheme(theme: Partial<MenuColorTheme>): void {
    const style = this.elementRef.nativeElement.style;
    if (theme.primaryBackground) {
      style.setProperty('--mlpm-primary-background', theme.primaryBackground);
    }
    if (theme.secondaryBackground) {
      style.setProperty('--mlpm-secondary-background', theme.secondaryBackground);
    }
    if (theme.tertiaryBackground) {
      style.setProperty('--mlpm-tertiary-background', theme.tertiaryBackground);
    }
    if (theme.primaryText) {
      style.setProperty('--mlpm-primary-text', theme.primaryText);
    }
    if (theme.secondaryText) {
      style.setProperty('--mlpm-secondary-text', theme.secondaryText);
    }
    if (theme.tertiaryText) {
      style.setProperty('--mlpm-tertiary-text', theme.tertiaryText);
    }
    if (theme.primaryAccent) {
      style.setProperty('--mlpm-primary-accent', theme.primaryAccent);
    }
    if (theme.secondaryAccent) {
      style.setProperty('--mlpm-secondary-accent', theme.secondaryAccent);
    }
    if (theme.tertiaryAccent) {
      style.setProperty('--mlpm-tertiary-accent', theme.tertiaryAccent);
    }
    if (theme.primaryHover) {
      style.setProperty('--mlpm-primary-hover', theme.primaryHover);
    }
    if (theme.secondaryHover) {
      style.setProperty('--mlpm-secondary-hover', theme.secondaryHover);
    }
    if (theme.tertiaryHover) {
      style.setProperty('--mlpm-tertiary-hover', theme.tertiaryHover);
    }
  }

  // This method simply returns the icon class as-is
  getIconName(iconClass?: string): string {
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
        this.cdr.markForCheck();
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
        this.cdr.markForCheck();
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
