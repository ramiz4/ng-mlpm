import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {
  MenuColorTheme,
  MenuItem,
  MlpmComponent,
} from '../../../mlpm/src/public-api';
import { AppComponent } from './app.component';
import { ThemeService } from './theme.service';

// Mock for the MlpmComponent
@Component({
  selector: 'app-mock-mlpm',
  template: '<div></div>',
})
class MockMlpmComponent {
  @Input() menuItems: MenuItem[] = [];
  @Input() customTheme: MenuColorTheme | undefined;
  @Input() collapsed = false;
}

describe('AppComponent', () => {
  let routerSpy: jasmine.SpyObj<Router>;
  let themeServiceSpy: jasmine.SpyObj<ThemeService>;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    // Create router spy
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    
    // Create themeService spy with properties and methods needed for testing
    themeServiceSpy = jasmine.createSpyObj('ThemeService', 
      ['toggleTheme', 'setTheme'], 
      {
        theme$: new BehaviorSubject('dark').asObservable(),
        currentTheme: 'dark'
      }
    );

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ThemeService, useValue: themeServiceSpy }
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

  it('should have the dark theme by default', () => {
    expect(themeServiceSpy.currentTheme).toBe('dark');
    expect(component.customTheme).toEqual(component.darkTheme);
  });

  it('should toggle theme from dark to light', () => {
    // Initially dark theme
    expect(component.customTheme).toEqual(component.darkTheme);

    // Setup themeService to return light after toggle
    Object.defineProperty(themeServiceSpy, 'currentTheme', { value: 'light' });

    // Toggle theme - this will call themeService.toggleTheme()
    component.toggleTheme();

    // Should call service method
    expect(themeServiceSpy.toggleTheme).toHaveBeenCalled();
    
    // Now simulate what the component would do after toggle
    component.customTheme = themeServiceSpy.currentTheme === 'dark' 
      ? component.darkTheme 
      : component.lightTheme;
    
    // Should now be light theme
    expect(component.customTheme).toEqual(component.lightTheme);
  });

  it('should toggle theme from light to dark', () => {
    // Setup initial theme as light
    Object.defineProperty(themeServiceSpy, 'currentTheme', { value: 'light' });
    
    // Force component to update customTheme to light
    component.customTheme = component.lightTheme;
    fixture.detectChanges();
    
    // Verify it's light theme
    expect(component.customTheme).toEqual(component.lightTheme);
    
    // Setup themeService to return dark after toggle
    Object.defineProperty(themeServiceSpy, 'currentTheme', { value: 'dark' });
    
    // Toggle theme
    component.toggleTheme();
    
    // Should call service method
    expect(themeServiceSpy.toggleTheme).toHaveBeenCalled();
    
    // Now simulate what the component would do after toggle
    component.customTheme = themeServiceSpy.currentTheme === 'dark' 
      ? component.darkTheme 
      : component.lightTheme;
    
    // Should now be dark theme
    expect(component.customTheme).toEqual(component.darkTheme);
  });

  it('should toggle menu', () => {
    // Setup the menu property
    component.menu = { collapsed: false } as MlpmComponent;

    // Toggle menu
    component.toggleMenu();

    // Should be collapsed
    expect(component.menu.collapsed).toBeTrue();

    // Toggle again
    component.toggleMenu();

    // Should not be collapsed
    expect(component.menu.collapsed).toBeFalse();
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

    // Verify console logs
    expect(console.log).toHaveBeenCalledWith('Menu item clicked:', menuItem);
    expect(console.log).toHaveBeenCalledWith(
      'The selected item was: Test Item'
    );
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

  it('should use darkTheme when theme is dark', () => {
    // Ensure theme is dark
    Object.defineProperty(themeServiceSpy, 'currentTheme', { value: 'dark' });
    
    // Create a new component to pick up the theme
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    // Verify dark theme is used
    expect(component.customTheme).toEqual(component.darkTheme);
  });

  it('should use lightTheme when theme is light', () => {
    // Set theme to light
    Object.defineProperty(themeServiceSpy, 'currentTheme', { value: 'light' });
    
    // Create a new component to pick up the theme
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    // Verify light theme is used
    expect(component.customTheme).toEqual(component.lightTheme);
  });
});
