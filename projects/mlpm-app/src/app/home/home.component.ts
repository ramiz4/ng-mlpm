import { AsyncPipe, JsonPipe, NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-home',
  imports: [NgIf, AsyncPipe, NgClass, JsonPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private readonly themeService = inject(ThemeService);

  theme$ = this.themeService.theme$;

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

  // Theme objects
  get darkTheme() {
    return {
      primary: '#212121', // Dark background
      secondary: '#424242', // Slightly lighter background
      text: '#ffffff', // White text
      accent: '#ff4081', // Pink accent
      hover: '#616161', // Hover color
    };
  }

  get lightTheme() {
    return {
      primary: '#ffffff', // Light background
      secondary: '#f5f5f5', // Slightly darker background
      text: '#000000', // Black text
      accent: '#ff4081', // Pink accent
      hover: '#eeeeee', // Hover color
    };
  }
}
