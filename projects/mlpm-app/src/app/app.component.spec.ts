import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MenuColorTheme, MenuItem, MlpmComponent } from '../../../mlpm/src/public-api';
import { AppComponent } from './app.component';
import { ThemeService } from './theme.service';

// Mock for the MlpmComponent
@Component({
  selector: 'app-mock-mlpm',
  template: '<div></div>',
})
class MockMlpmComponent {
  @Input() menuItems: MenuItem[] = [];
  @Input() customTheme: Partial<MenuColorTheme> | undefined;
  @Input() collapsed = false;
}

describe('AppComponent', () => {
  let routerSpy: jasmine.SpyObj<Router>;
  let themeServiceSpy: jasmine.SpyObj<ThemeService>;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  // Mock theme objects for testing
  const mockDarkTheme: MenuColorTheme = {
    primaryBackground: '#212121',
    secondaryBackground: '#424242',
    tertiaryBackground: '#303030',
    primaryText: '#ffffff',
    secondaryText: '#e0e0e0',
    tertiaryText: '#bdbdbd',
    primaryAccent: '#ff4081',
    secondaryAccent: '#e91e63',
    tertiaryAccent: '#c2185b',
    primaryHover: '#616161',
    secondaryHover: '#757575',
    tertiaryHover: '#9e9e9e',
  };

  const mockLightTheme: MenuColorTheme = {
    primaryBackground: '#ffffff',
    secondaryBackground: '#f5f5f5',
    tertiaryBackground: '#eeeeee',
    primaryText: '#000000',
    secondaryText: '#212121',
    tertiaryText: '#424242',
    primaryAccent: '#ff4081',
    secondaryAccent: '#e91e63',
    tertiaryAccent: '#c2185b',
    primaryHover: '#eeeeee',
    secondaryHover: '#e0e0e0',
    tertiaryHover: '#bdbdbd',
  };

  beforeEach(async () => {
    // Create router spy
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    // Create themeService spy with properties and methods needed for testing
    themeServiceSpy = jasmine.createSpyObj('ThemeService', ['toggleTheme', 'setTheme'], {
      theme$: new BehaviorSubject('dark').asObservable(),
      currentTheme: 'dark',
      themeMap: {
        dark: mockDarkTheme,
        light: mockLightTheme,
      },
    });

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ThemeService, useValue: themeServiceSpy },
      ],
    })
      .overrideComponent(AppComponent, {
        remove: { imports: [MockMlpmComponent] },
        add: { imports: [MockMlpmComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should emit theme changes as observable', done => {
    // Subscribe to the customMenuTheme$ observable
    component.customMenuTheme$.subscribe(theme => {
      // Should match the dark theme from themeMap
      expect(theme).toEqual(themeServiceSpy.themeMap['dark']);
      done();
    });
  });

  it('should get theme from themeService.themeMap', () => {
    // Create a BehaviorSubject we can control
    const themeSub = new BehaviorSubject<'dark' | 'light'>('dark');

    // Override the theme$ property of the spy
    Object.defineProperty(themeServiceSpy, 'theme$', { value: themeSub.asObservable() });
    Object.defineProperty(themeServiceSpy, 'currentTheme', { get: () => themeSub.value });

    // Recreate the component to use our controlled theme$
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // First verify we get the dark theme (initial value)
    let emittedTheme: MenuColorTheme;
    const subscription = component.customMenuTheme$.subscribe(theme => {
      emittedTheme = theme as MenuColorTheme;
    });

    expect(emittedTheme!).toEqual(mockDarkTheme);

    // Now change to light theme
    themeSub.next('light');

    // Verify we now get the light theme
    expect(emittedTheme!).toEqual(mockLightTheme);

    // Clean up
    subscription.unsubscribe();
  });

  it('should delegate menu toggling to the menu component', () => {
    // Create a spy object for the menu component
    const menuSpy = jasmine.createSpyObj('MlpmComponent', ['toggle']);

    // Assign the spy to the component's menu property
    component.menu = menuSpy;

    // Act
    component.toggleMenu();

    // Assert
    expect(menuSpy.toggle).toHaveBeenCalledTimes(1);

    // Verify it handles subsequent calls
    component.toggleMenu();
    expect(menuSpy.toggle).toHaveBeenCalledTimes(2);
  });

  it('should handle menu link clicks and navigate', () => {
    // Create a test menu item
    const menuItem: MenuItem = {
      label: 'Test Item',
      link: '/test-link',
    };

    // Spy on console.log
    spyOn(console, 'log');

    // Call the method
    component.handleMenuLinkClick(menuItem);

    // Verify navigation occurred with correct path
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/test-link']);

    // Verify console logs - only one log message in updated component
    expect(console.log).toHaveBeenCalledWith('Menu item clicked:', menuItem);
  });

  it('should not navigate when menu item has no link', () => {
    // Create a test menu item without a link
    const menuItem: MenuItem = {
      label: 'Test Item',
    };

    // Spy on console.log
    spyOn(console, 'log');

    // Call the method
    component.handleMenuLinkClick(menuItem);

    // Verify navigation did not occur
    expect(routerSpy.navigate).not.toHaveBeenCalled();

    // Verify console logs
    expect(console.log).toHaveBeenCalledWith('Menu item clicked:', menuItem);
  });
});
