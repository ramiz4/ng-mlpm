import { NgClass } from '@angular/common';
import { Component, Input, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { SVG_PATHS, ICON_ALIASES } from './icon.constants';

@Component({
  selector: 'ng-mlpm-icon',
  standalone: true,
  imports: [NgClass],
  template: `
    <i
      #iconElement
      [ngClass]="iconClasses"
      [style.fontSize.px]="size"
      [style.color]="color"
    ></i>
    @if (!hasFontIcon) {
      <svg
        [attr.width]="size"
        [attr.height]="size"
        viewBox="0 0 24 24"
        [style.fill]="color"
        >
        <path [attr.d]="getSvgPath()"></path>
      </svg>
    }
    `,
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      i,
      svg {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
    `,
  ],
})
export class IconComponent implements AfterViewInit, OnDestroy {
  @Input() type: 'title' | 'default' = 'default';
  @Input() name = '';
  @Input() size = '16';
  @Input() color = 'currentColor';
  @ViewChild('iconElement') iconElement!: ElementRef;
  
  hasFontIcon = false;
  private destroyed = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    // We need to wait for the next rendering cycle to check for computed styles
    // This is more reliable than using a bare setTimeout
    Promise.resolve().then(() => {
      if (this.destroyed) return;
      
      this.checkForFontIcon();
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy() {
    this.destroyed = true;
  }

  private checkForFontIcon(): void {
    if (!this.iconElement?.nativeElement) return;
    
    const computedStyle = window.getComputedStyle(this.iconElement.nativeElement, '::before');
    const contentValue = computedStyle.getPropertyValue('content');
    
    // If content exists and is not 'none', then a font icon is being displayed
    this.hasFontIcon = Boolean(contentValue && contentValue !== 'none' && contentValue !== '""');
  }

  /**
   * Returns the icon name as an array of classes
   * Supports different formats:
   * - Full class string "fa fa-home" -> ['fa', 'fa-home']
   * - Simple name "home" -> ['fa', 'fa-home'] (adds default prefix)
   */
  get iconClasses(): string[] {
    if (!this.name) {
      return ['question']; // Default icon
    }

    // If the name includes spaces, it's already a full class string
    return this.name.split(' ');
  }

  /**
   * Returns SVG path data for common icons used in the menu
   * These are fallbacks when no icon library is available
   */
  getSvgPath(): string {
    // For title type, always return menu icon
    if (this.type === 'title') {
      return SVG_PATHS['menu'];
    }
    
    // Handle empty name case
    if (!this.name) {
      return SVG_PATHS['question'];
    }
    
    // Check if we have an alias for this icon name
    const iconKey = ICON_ALIASES[this.name] || this.name;
    
    // Return the path from our map, or question mark as fallback
    return SVG_PATHS[iconKey] || SVG_PATHS['question'];
  }
}
