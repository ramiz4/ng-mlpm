import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import {
  MenuColorTheme,
  MenuItem,
  MlpmComponent,
} from '../../../mlpm/src/public-api';
import { AppComponent } from './app.component';

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
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    // Create router spy
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: Router, useValue: routerSpy }],
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
    expect(component.theme).toBeTrue();
    expect(component.customTheme).toEqual(component.darkTheme);
  });

  it('should toggle theme from dark to light', () => {
    // Initially set to dark theme
    expect(component.theme).toBeTrue();
    expect(component.customTheme).toEqual(component.darkTheme);

    // Toggle theme
    component.toggleTheme();

    // Should now be light theme
    expect(component.theme).toBeFalse();
    expect(component.customTheme).toEqual(component.lightTheme);
  });

  it('should toggle theme from light to dark', () => {
    // First set to light theme
    component.theme = false;
    component.customTheme = component.lightTheme;

    // Toggle theme
    component.toggleTheme();

    // Should now be dark theme
    expect(component.theme).toBeTrue();
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
});
