import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { MenuItem } from './menu-item.interface';
import { MlpmComponent } from './mlpm.component';

describe('MlpmComponent', () => {
  let component: MlpmComponent;
  let fixture: ComponentFixture<MlpmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MlpmComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MlpmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.title).toBe('');
    expect(component.titleIcon).toBe('');
    expect(component.menuItems.length).toBe(0);
    expect(component.menuStack.length).toBe(0);
    expect(component.titleStack.length).toBe(0);
    expect(component.iconStack.length).toBe(0);
    expect(component.activeIndex).toBe(0);
    expect(component.collapsed).toBeFalse();
  });

  it('should set colorTheme and apply it to CSS variables', () => {
    // Arrange
    const customTheme = {
      primary: '#ff0000',
      text: '#ffffff',
    };
    const spy = spyOn(document.documentElement.style, 'setProperty');

    // Act
    component.colorTheme = customTheme;

    // Assert
    expect(component.colorTheme.primary).toBe('#ff0000');
    expect(component.colorTheme.text).toBe('#ffffff');
    // Should maintain default values for properties not specified
    expect(component.colorTheme.secondary).toBe('#34495e');
    expect(spy).toHaveBeenCalledWith('--mlpm-primary-color', '#ff0000');
    expect(spy).toHaveBeenCalledWith('--mlpm-text-color', '#ffffff');
  });

  it('should return icon name or empty string', () => {
    expect(component.getIconName('test-icon')).toBe('test-icon');
    expect(component.getIconName('')).toBe('');
    expect(component.getIconName(undefined)).toBe('');
  });

  it('should correctly return allLevels', () => {
    // Arrange
    const menuItems: MenuItem[] = [{ label: 'Home', icon: 'home' }];
    const submenuItems: MenuItem[] = [{ label: 'Settings', icon: 'settings' }];

    // Act
    component.menuItems = menuItems;
    component.menuStack.push(submenuItems);

    // Assert
    expect(component.allLevels.length).toBe(2);
    expect(component.allLevels[0]).toBe(menuItems);
    expect(component.allLevels[1]).toBe(submenuItems);
  });

  it('should get correct level title', () => {
    // Arrange
    component.title = 'Main Menu';
    component.titleStack = ['Submenu 1', 'Submenu 2'];

    // Assert
    expect(component.getLevelTitle(0)).toBe('Main Menu');
    expect(component.getLevelTitle(1)).toBe('Submenu 1');
    expect(component.getLevelTitle(2)).toBe('Submenu 2');
    expect(component.getLevelTitle(3)).toBe(''); // Non-existent level
  });

  it('should get correct level icon', () => {
    // Arrange
    component.titleIcon = 'menu';
    component.iconStack = ['settings', 'user'];

    // Assert
    expect(component.getLevelIcon(0)).toBe('menu');
    expect(component.getLevelIcon(1)).toBe('settings');
    expect(component.getLevelIcon(2)).toBe('user');
    expect(component.getLevelIcon(3)).toBe(''); // Non-existent level
  });

  it('should open submenu with children', fakeAsync(() => {
    // Arrange
    const menuItem: MenuItem = {
      label: 'Parent',
      icon: 'folder',
      children: [{ label: 'Child', icon: 'file' }],
    };

    // Act
    component.openSubmenu(menuItem);
    tick(1); // For setTimeout to execute

    // Assert
    expect(component.menuStack.length).toBe(1);
    expect(component.titleStack[0]).toBe('Parent');
    expect(component.iconStack[0]).toBe('folder');
    expect(component.activeIndex).toBe(1);
  }));

  it('should emit linkClick when item has link', () => {
    // Arrange
    const menuItem: MenuItem = {
      label: 'Link Item',
      icon: 'link',
      link: '/test',
    };
    const spy = spyOn(component.linkClick, 'emit');

    // Act
    component.openSubmenu(menuItem);

    // Assert
    expect(spy).toHaveBeenCalledWith(menuItem);
  });

  it('should go back to previous level', fakeAsync(() => {
    // Arrange
    component.menuStack = [[{ label: 'Submenu Item', icon: 'folder' }]];
    component.titleStack = ['Submenu'];
    component.iconStack = ['folder'];
    component.activeIndex = 1;

    // Act
    component.goBack();
    tick(400); // Wait for the timeout in goBack

    // Assert
    expect(component.menuStack.length).toBe(0);
    expect(component.titleStack.length).toBe(0);
    expect(component.iconStack.length).toBe(0);
  }));

  it('should toggle collapsed state on title icon click at root level', () => {
    // Arrange
    component.activeIndex = 0;
    component.collapsed = false;

    // Act
    component.onTitleIconClick();

    // Assert
    expect(component.collapsed).toBeTrue();

    // Act again
    component.onTitleIconClick();

    // Assert
    expect(component.collapsed).toBeFalse();
  });

  it('should not toggle collapsed state when not at root level', () => {
    // Arrange
    component.activeIndex = 1;
    component.collapsed = false;

    // Act
    component.onTitleIconClick();

    // Assert
    expect(component.collapsed).toBeFalse();
  });
});
