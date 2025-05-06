import { JsonPipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, JsonPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct darkTheme object', () => {
    const darkTheme = component.darkTheme;
    expect(darkTheme).toEqual({
      primary: '#212121',
      secondary: '#424242',
      text: '#ffffff',
      accent: '#ff4081',
      hover: '#616161',
    });
  });

  it('should return correct lightTheme object', () => {
    const lightTheme = component.lightTheme;
    expect(lightTheme).toEqual({
      primary: '#ffffff',
      secondary: '#f5f5f5',
      text: '#000000',
      accent: '#ff4081',
      hover: '#eeeeee',
    });
  });

  it('should have example menu items defined', () => {
    expect(component.exampleMenuItems).toBeDefined();
    expect(component.exampleMenuItems.length).toBe(2);
    expect(component.exampleMenuItems[0].label).toBe('Dashboard');
    expect(component.exampleMenuItems[1].label).toBe('Settings');
    expect(component.exampleMenuItems[1].children?.length).toBe(2);
  });
});
