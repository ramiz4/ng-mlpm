import { Component, inject } from '@angular/core';
import { AppComponent } from '../app.component';
import { JsonPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [NgClass, JsonPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  // Get a reference to the parent AppComponent to access theme
  private appComponent = inject(AppComponent, { optional: true });

  // Access the current theme state
  get isDarkTheme(): boolean {
    return this.appComponent?.isDarkTheme ?? true;
  }

  // Example menu items that could be used with MLPM
  exampleMenuItems = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      link: '/dashboard',
    },
    {
      label: 'Settings',
      icon: 'settings',
      children: [
        { label: 'Profile', icon: 'person', link: '/settings/profile' },
        { label: 'Account', icon: 'account_circle', link: '/settings/account' },
      ],
    },
  ];

  // Use themes from AppComponent
  get darkTheme() {
    return (
      this.appComponent?.darkTheme ?? {
        primary: '#212121', // Dark background
        secondary: '#424242', // Slightly lighter background
        text: '#ffffff', // White text
        accent: '#ff4081', // Pink accent
        hover: '#616161', // Hover color
      }
    );
  }

  get lightTheme() {
    return (
      this.appComponent?.lightTheme ?? {
        primary: '#ffffff', // Light background
        secondary: '#f5f5f5', // Slightly darker background
        text: '#000000', // Black text
        accent: '#ff4081', // Pink accent
        hover: '#eeeeee', // Hover color
      }
    );
  }
}
