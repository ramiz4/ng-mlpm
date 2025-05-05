import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { ThemeService } from '../theme.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let themeServiceSpy: jasmine.SpyObj<ThemeService>;
  let themeSubject: BehaviorSubject<'dark' | 'light'>;

  beforeEach(async () => {
    // Create a subject we can control for testing both theme states
    themeSubject = new BehaviorSubject<'dark' | 'light'>('dark');
    
    // Create theme service spy with theme$ observable and currentTheme getter
    themeServiceSpy = jasmine.createSpyObj('ThemeService', 
      ['toggleTheme'], 
      {
        theme$: themeSubject.asObservable()
      }
    );
    
    // Set up the currentTheme getter to return the current subject value
    Object.defineProperty(themeServiceSpy, 'currentTheme', {
      get: () => themeSubject.value
    });

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: ThemeService, useValue: themeServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have theme$ observable from ThemeService', () => {
    expect(component.theme$).toBe(themeServiceSpy.theme$);
  });

  it('should return correct darkTheme object', () => {
    const darkTheme = component.darkTheme;
    expect(darkTheme).toEqual({
      primary: '#212121',
      secondary: '#424242',
      text: '#ffffff',
      accent: '#ff4081',
      hover: '#616161'
    });
  });

  it('should return correct lightTheme object', () => {
    const lightTheme = component.lightTheme;
    expect(lightTheme).toEqual({
      primary: '#ffffff',
      secondary: '#f5f5f5',
      text: '#000000',
      accent: '#ff4081',
      hover: '#eeeeee'
    });
  });

  it('should have example menu items defined', () => {
    expect(component.exampleMenuItems).toBeDefined();
    expect(component.exampleMenuItems.length).toBe(2);
    expect(component.exampleMenuItems[0].label).toBe('Dashboard');
    expect(component.exampleMenuItems[1].label).toBe('Settings');
    expect(component.exampleMenuItems[1].children?.length).toBe(2);
  });

  it('should handle both dark and light themes via theme$ observable', () => {
    // Test with dark theme
    themeSubject.next('dark');
    fixture.detectChanges();
    // Technically we're testing that the observable passes through correctly
    expect(component.theme$).toBe(themeServiceSpy.theme$);
    
    // Test with light theme
    themeSubject.next('light');
    fixture.detectChanges();
    // And here as well
    expect(component.theme$).toBe(themeServiceSpy.theme$);
  });
});
