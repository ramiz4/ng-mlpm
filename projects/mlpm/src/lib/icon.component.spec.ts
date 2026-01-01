import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
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

  describe('iconClasses', () => {
    it('should handle various icon name scenarios', () => {
      // Test with empty string
      component.name = '';
      expect(component.iconClasses).toEqual(['question'], 'Empty name should return question array');

      // Test with whitespace-only string - it gets split by spaces
      component.name = '   ';
      expect(component.iconClasses).toEqual(['', '', '', ''], 'Whitespace should be split into empty strings');

      // Test with simple name
      component.name = 'home';
      expect(component.iconClasses).toEqual(['home'], 'Simple name should be in an array');

      // Test with full class string
      component.name = 'fa fa-home';
      expect(component.iconClasses).toEqual(['fa', 'fa-home'], 'Class string should be split');
    });
  });

  describe('getSvgPath', () => {
    it('should handle all SVG path scenarios', () => {
      // Title type tests
      component.type = 'title';
      expect(component.getSvgPath()).toBe(SVG_PATHS['menu'], 'Title type should always return menu icon');

      // With different names, title type should still return menu icon
      component.name = 'home';
      expect(component.getSvgPath()).toBe(SVG_PATHS['menu'], 'Title type with name should still return menu icon');

      component.name = 'non-existent';
      expect(component.getSvgPath()).toBe(
        SVG_PATHS['menu'],
        'Title type with non-existent name should return menu icon'
      );

      // Default type tests
      component.type = 'default';

      // Empty name test
      component.name = '';
      expect(component.getSvgPath()).toBe(SVG_PATHS['question'], 'Empty name should return question icon');

      // Known icon name test
      if (SVG_PATHS['menu']) {
        component.name = 'menu';
        expect(component.getSvgPath()).toBe(SVG_PATHS['menu'], 'Known icon name should return its SVG path');
      }

      // Alias test
      if (Object.keys(ICON_ALIASES).length > 0) {
        const aliasKey = Object.keys(ICON_ALIASES)[0];
        const aliasValue = ICON_ALIASES[aliasKey];

        component.name = aliasKey;
        expect(component.getSvgPath()).toBe(
          SVG_PATHS[aliasValue] || SVG_PATHS['question'],
          'Alias should resolve to its target icon path'
        );
      }

      // Unknown icon test
      component.name = 'definitely-not-an-icon-name';
      expect(component.getSvgPath()).toBe(SVG_PATHS['question'], 'Unknown icon should fallback to question icon');
    });

    it('should handle alias with missing path in SVG_PATHS', () => {
      // Create a temporary alias for testing
      const originalIconAliases = { ...ICON_ALIASES };
      const nonExistentIconKey = 'non-existent-path';

      // Create a new property to test this specific condition
      ICON_ALIASES['test-alias'] = nonExistentIconKey;

      component.name = 'test-alias';
      expect(component.getSvgPath()).toBe(
        SVG_PATHS['question'],
        'Alias to non-existent path should fallback to question'
      );

      // Restore original aliases
      Object.keys(ICON_ALIASES).forEach(key => {
        if (key !== Object.keys(originalIconAliases).find(k => k === key)) {
          delete ICON_ALIASES[key];
        }
      });
    });

    it('should handle SVG path fallback mechanism', () => {
      // Save the original SVG_PATHS
      const originalPaths = { ...SVG_PATHS };

      // Test with a name that has an entry in SVG_PATHS
      const testIconName = 'home';
      const testPath = 'M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z';

      // Add a custom path to SVG_PATHS
      SVG_PATHS[testIconName] = testPath;

      // Set component name and test
      component.name = testIconName;
      expect(component.getSvgPath()).toBe(testPath, 'Should return defined path for icon');

      // Now delete the custom path to force the fallback
      delete SVG_PATHS[testIconName];

      // Test that it falls back to question mark
      expect(component.getSvgPath()).toBe(SVG_PATHS['question'], 'Should fallback when path is deleted');

      // Restore original paths
      Object.keys(originalPaths).forEach(key => {
        SVG_PATHS[key] = originalPaths[key];
      });
    });
  });

  describe('font icon detection', () => {
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
      spyOn(window, 'getComputedStyle').and.returnValue(mockStyle as unknown as CSSStyleDeclaration);

      // Test cases with expected results
      const testCases = [
        { content: '', expected: false, description: 'empty string' },
        { content: 'none', expected: false, description: 'none value' },
        { content: '""', expected: false, description: 'empty quotes' },
        { content: '"\\f015"', expected: true, description: 'font icon code' },
        { content: '"any non-empty value"', expected: true, description: 'non-empty string' },
      ];

      // Test each case
      testCases.forEach(({ content, expected, description }) => {
        // Set the content value for this test
        mockStyle.contentValue = content;

        // Reset hasFontIcon
        component.hasFontIcon = false;

        // Call the method
        componentPrivate.checkForFontIcon();

        // Verify
        expect(component.hasFontIcon).toBe(expected, `Should handle ${description} correctly`);
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
