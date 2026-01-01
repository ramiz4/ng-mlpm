import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
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
      primaryBackground: '#ff0000',
      secondaryBackground: '#00ff00',
      tertiaryBackground: '#0000ff',
      primaryText: '#ffffff',
      secondaryText: '#eeeeee',
      tertiaryText: '#dddddd',
      primaryAccent: '#ff00ff',
      secondaryAccent: '#00ffff',
      tertiaryAccent: '#ffff00',
      primaryHover: '#990000',
      secondaryHover: '#009900',
      tertiaryHover: '#000099',
    };
    const spy = spyOn(fixture.nativeElement.style, 'setProperty');

    // Act
    component.colorTheme = customTheme;

    // Assert
    expect(spy).toHaveBeenCalledWith('--mlpm-primary-background', '#ff0000');
    expect(spy).toHaveBeenCalledWith('--mlpm-secondary-background', '#00ff00');
    expect(spy).toHaveBeenCalledWith('--mlpm-tertiary-background', '#0000ff');
    expect(spy).toHaveBeenCalledWith('--mlpm-primary-text', '#ffffff');
    expect(spy).toHaveBeenCalledWith('--mlpm-secondary-text', '#eeeeee');
    expect(spy).toHaveBeenCalledWith('--mlpm-tertiary-text', '#dddddd');
    expect(spy).toHaveBeenCalledWith('--mlpm-primary-accent', '#ff00ff');
    expect(spy).toHaveBeenCalledWith('--mlpm-secondary-accent', '#00ffff');
    expect(spy).toHaveBeenCalledWith('--mlpm-tertiary-accent', '#ffff00');
    expect(spy).toHaveBeenCalledWith('--mlpm-primary-hover', '#990000');
    expect(spy).toHaveBeenCalledWith('--mlpm-secondary-hover', '#009900');
    expect(spy).toHaveBeenCalledWith('--mlpm-tertiary-hover', '#000099');
  });

  it('should apply partial theme without affecting other properties', () => {
    // Arrange
    const partialTheme = {
      primaryBackground: '#ff0000',
      primaryText: '#ffffff',
    };
    const spy = spyOn(fixture.nativeElement.style, 'setProperty');

    // Act
    component.colorTheme = partialTheme;

    // Assert
    expect(spy).toHaveBeenCalledWith('--mlpm-primary-background', '#ff0000');
    expect(spy).toHaveBeenCalledWith('--mlpm-primary-text', '#ffffff');
    expect(spy).toHaveBeenCalledTimes(2);
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

  it('should handle menu item with undefined icon when opening submenu', fakeAsync(() => {
    // Arrange - create a menu item with children but without an icon
    const menuItem: MenuItem = {
      label: 'Parent',
      // icon is intentionally omitted to test the fallback
      children: [{ label: 'Child' }],
    };

    // Act
    component.openSubmenu(menuItem);
    tick(1); // For setTimeout to execute

    // Assert
    expect(component.menuStack.length).toBe(1);
    expect(component.titleStack[0]).toBe('Parent');
    // Verify that an empty string was pushed to iconStack when icon was undefined
    expect(component.iconStack[0]).toBe('');
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
