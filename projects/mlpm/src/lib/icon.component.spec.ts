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

  it('should test iconClasses branch paths', () => {
    // Test with empty string
    component.name = '';
    expect(component.iconClasses).toEqual(['question']);

    // Test with whitespace-only string - it gets split by spaces
    component.name = '   ';
    expect(component.iconClasses).toEqual(['', '', '', '']);
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

  it('should set hasFontIcon to false when content is empty, none, or empty quotes', () => {
    // Setup
    const mockElement = {
      nativeElement: document.createElement('i'),
    };
    component.iconElement = mockElement as ElementRef;

    // Create a variable to hold our mock style that we'll modify between tests
    const mockStyle = {
      contentValue: '',
      getPropertyValue: function (prop: string) {
        return prop === 'content' ? this.contentValue : '';
      },
    };

    // Set up the spy once
    spyOn(window, 'getComputedStyle').and.returnValue(
      mockStyle as unknown as CSSStyleDeclaration
    );

    // Test with empty content
    mockStyle.contentValue = '';
    componentPrivate.checkForFontIcon();
    expect(component.hasFontIcon).toBeFalse();

    // Test with 'none' content
    mockStyle.contentValue = 'none';
    componentPrivate.checkForFontIcon();
    expect(component.hasFontIcon).toBeFalse();

    // Test with empty quotes content
    mockStyle.contentValue = '""';
    componentPrivate.checkForFontIcon();
    expect(component.hasFontIcon).toBeFalse();
  });

  it('should handle all content value variations for hasFontIcon', () => {
    // Setup
    const mockElement = {
      nativeElement: document.createElement('i'),
    };
    component.iconElement = mockElement as ElementRef;

    // Create a variable to hold our mock style that we'll modify between tests
    const mockStyle = {
      contentValue: '',
      getPropertyValue: function (prop: string) {
        return prop === 'content' ? this.contentValue : '';
      },
    };

    // Set up the spy once
    spyOn(window, 'getComputedStyle').and.returnValue(
      mockStyle as unknown as CSSStyleDeclaration
    );

    // Test cases with expected results
    const testCases = [
      { content: '', expected: false },
      { content: 'none', expected: false },
      { content: '""', expected: false },
      { content: '"\\f015"', expected: true },
      { content: '"any non-empty value"', expected: true },
    ];

    // Test each case
    testCases.forEach(({ content, expected }) => {
      // Set the content value for this test
      mockStyle.contentValue = content;

      // Reset hasFontIcon
      component.hasFontIcon = false;

      // Call the method
      componentPrivate.checkForFontIcon();

      // Verify
      expect(component.hasFontIcon).toBe(
        expected,
        `Failed for content value: "${content}"`
      );
    });
  });

  it('should handle missing iconElement in checkForFontIcon', () => {
    // Setup - null the iconElement
    component.iconElement = undefined as unknown as ElementRef;

    // This should not throw an error
    componentPrivate.checkForFontIcon();

    // Since the element is missing, hasFontIcon should remain false
    expect(component.hasFontIcon).toBeFalse();
  });

  it('should handle alias with missing path in SVG_PATHS', () => {
    // Create a temporary alias for testing
    const originalIconAliases = { ...ICON_ALIASES };
    const nonExistentIconKey = 'non-existent-path';

    // Create a new property to test this specific condition
    // We're making an alias point to a key that doesn't exist in SVG_PATHS
    (ICON_ALIASES)['test-alias'] = nonExistentIconKey;

    component.name = 'test-alias';
    expect(component.getSvgPath()).toBe(SVG_PATHS['question']);

    // Restore original aliases
    Object.keys(ICON_ALIASES).forEach((key) => {
      if (key !== Object.keys(originalIconAliases).find((k) => k === key)) {
        delete (ICON_ALIASES)[key];
      }
    });
  });

  it('should explicitly test the SVG path fallback mechanism', () => {
    // Save the original SVG_PATHS
    const originalPaths = { ...SVG_PATHS };

    // Test with a name that has an entry in SVG_PATHS
    const testIconName = 'home';
    // Define a custom path for testing
    const testPath =
      'M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z';

    // Add a custom path to SVG_PATHS
    (SVG_PATHS)[testIconName] = testPath;

    // Set component name and test
    component.name = testIconName;
    expect(component.getSvgPath()).toBe(testPath);

    // Now delete the custom path to force the fallback
    delete (SVG_PATHS)[testIconName];

    // Test that it falls back to question mark
    expect(component.getSvgPath()).toBe(SVG_PATHS['question']);

    // Restore original paths
    Object.keys(originalPaths).forEach((key) => {
      (SVG_PATHS)[key] = originalPaths[key];
    });
  });

  it('should comprehensively test all getSvgPath branches', () => {
    // Test for title type with various name values
    component.type = 'title';

    // Even with a name set, title type should always return menu icon
    component.name = '';
    expect(component.getSvgPath()).toBe(SVG_PATHS['menu']);

    component.name = 'home';
    expect(component.getSvgPath()).toBe(SVG_PATHS['menu']);

    component.name = 'non-existent';
    expect(component.getSvgPath()).toBe(SVG_PATHS['menu']);

    // Test for default type
    component.type = 'default';

    // Empty name
    component.name = '';
    expect(component.getSvgPath()).toBe(SVG_PATHS['question']);

    // Name with direct match in SVG_PATHS
    if (SVG_PATHS['menu']) {
      component.name = 'menu';
      expect(component.getSvgPath()).toBe(SVG_PATHS['menu']);
    }

    // Name with match through alias
    const aliasKey = Object.keys(ICON_ALIASES)[0];
    if (aliasKey) {
      component.name = aliasKey;
      const aliasTarget = ICON_ALIASES[aliasKey];
      expect(component.getSvgPath()).toBe(
        SVG_PATHS[aliasTarget] || SVG_PATHS['question']
      );
    }

    // Name with no match
    component.name = 'definitely-not-an-icon-name';
    expect(component.getSvgPath()).toBe(SVG_PATHS['question']);
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
