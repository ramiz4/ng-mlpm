import { ElementRef } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { IconComponent } from './icon.component';
import { ICON_ALIASES, SVG_PATHS } from './icon.constants';

// Create an interface to expose private members for testing
interface IconComponentPrivateMembers {
  destroyed: boolean;
  checkForFontIcon: () => void;
}

describe('IconComponent', () => {
  let component: IconComponent;
  let componentPrivate: IconComponentPrivateMembers;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    componentPrivate = component as unknown as IconComponentPrivateMembers;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.type).toBe('default');
    expect(component.name).toBe('');
    expect(component.size).toBe('16');
    expect(component.color).toBe('currentColor');
    expect(component.hasFontIcon).toBeFalse();
  });

  it('should handle empty icon name in iconClasses', () => {
    component.name = '';
    expect(component.iconClasses).toEqual(['question']);
  });

  it('should split full class string in iconClasses', () => {
    component.name = 'fa fa-home';
    expect(component.iconClasses).toEqual(['fa', 'fa-home']);
  });

  it('should handle simple name in iconClasses', () => {
    component.name = 'home';
    expect(component.iconClasses).toEqual(['home']);
  });

  it('should return menu SVG path for title type', () => {
    component.type = 'title';
    expect(component.getSvgPath()).toBe(SVG_PATHS['menu']);
  });

  it('should return question mark SVG path for empty name', () => {
    component.type = 'default';
    component.name = '';
    expect(component.getSvgPath()).toBe(SVG_PATHS['question']);
  });

  it('should return specific SVG path for known icon name', () => {
    component.type = 'default';
    component.name = 'home';
    expect(component.getSvgPath()).toBe(
      SVG_PATHS['home'] || SVG_PATHS['question']
    );
  });

  it('should handle icon aliases correctly', () => {
    // Pick an alias from the ICON_ALIASES object
    const aliasKey = Object.keys(ICON_ALIASES)[0];
    const aliasValue = ICON_ALIASES[aliasKey];

    component.name = aliasKey;
    expect(component.getSvgPath()).toBe(
      SVG_PATHS[aliasValue] || SVG_PATHS['question']
    );
  });

  it('should fallback to question mark for unknown icon', () => {
    component.type = 'default';
    component.name = 'non-existent-icon';
    expect(component.getSvgPath()).toBe(SVG_PATHS['question']);
  });

  it('should correctly detect font icon during ngAfterViewInit', fakeAsync(() => {
    // Mock the checkForFontIcon method
    spyOn(componentPrivate, 'checkForFontIcon').and.callFake(() => {
      component.hasFontIcon = true;
    });

    component.ngAfterViewInit();
    tick(); // Process the Promise.resolve().then()

    expect(component.hasFontIcon).toBeTrue();
    expect(componentPrivate.checkForFontIcon).toHaveBeenCalled();
  }));

  it('should not check for font icon if component is destroyed', fakeAsync(() => {
    // Mark component as destroyed
    componentPrivate.destroyed = true;

    // Spy on the checkForFontIcon method
    spyOn(componentPrivate, 'checkForFontIcon');

    component.ngAfterViewInit();
    tick(); // Process the Promise.resolve().then()

    expect(componentPrivate.checkForFontIcon).not.toHaveBeenCalled();
  }));

  it('should check for font icon by examining computed style', () => {
    // Setup - we can't easily test the actual DOM CSS, so we'll mock what we need
    const mockElement = {
      nativeElement: document.createElement('i'),
    };
    component.iconElement = mockElement as ElementRef;

    // Mock window.getComputedStyle to return a content value
    const mockStyle = {
      getPropertyValue: (prop: string) =>
        prop === 'content' ? '"\\f015"' : '',
    };

    spyOn(window, 'getComputedStyle').and.returnValue(
      mockStyle as CSSStyleDeclaration
    );

    // Call the method directly
    componentPrivate.checkForFontIcon();

    // Expect hasFontIcon to be true because our mock returns a non-empty content
    expect(component.hasFontIcon).toBeTrue();
  });

  it('should handle missing iconElement in checkForFontIcon', () => {
    // Setup - null the iconElement
    component.iconElement = undefined as unknown as ElementRef;

    // This should not throw an error
    componentPrivate.checkForFontIcon();

    // Since the element is missing, hasFontIcon should remain false
    expect(component.hasFontIcon).toBeFalse();
  });

  it('should set destroyed flag on ngOnDestroy', () => {
    // Initial state
    expect(componentPrivate.destroyed).toBeFalse();

    // Act
    component.ngOnDestroy();

    // Assert
    expect(componentPrivate.destroyed).toBeTrue();
  });
});
