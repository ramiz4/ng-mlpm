import { NgClass } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MlpmComponent, MenuColorTheme, MenuItem } from '../../../mlpm/src/public-api';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgClass, RouterOutlet, MlpmComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(MlpmComponent) menu!: MlpmComponent;

  isDarkTheme = true;

  // Dark theme definition
  darkTheme: MenuColorTheme = {
    primary: '#212121', // Dark background
    secondary: '#424242', // Slightly lighter background
    text: '#ffffff', // White text
    accent: '#ff4081', // Pink accent
    hover: '#616161', // Hover color
  };

  // Light theme definition
  lightTheme: MenuColorTheme = {
    primary: '#ffffff', // Light background
    secondary: '#f5f5f5', // Slightly darker background
    text: '#000000', // Black text
    accent: '#ff4081', // Pink accent
    hover: '#eeeeee', // Hover color
  };

  // Current active theme
  customTheme: MenuColorTheme = this.darkTheme;

  menuItems: MenuItem[] = [
    {
      label: 'Home',
      icon: 'fa fa-home',
      link: '/home',
    },
    {
      label: 'About',
      icon: 'fa fa-info-circle',
      link: '/about',
    },
    {
      label: 'Contact',
      icon: 'fa fa-envelope',
      link: '/contact',
    },
    {
      label: 'Services',
      icon: 'fa fa-cogs',
      link: '/services',
    },
    {
      label: 'Products',
      icon: 'fa fa-box',
      link: '/products',
      children: [
        { label: 'Electronics', link: '/electronics' },
        { label: 'Clothing', link: '/clothing' },
        { label: 'Books', link: '/books' },
        { label: 'Toys', link: '/toys' },
      ],
    },
    {
      label: 'Devices',
      icon: 'fa fa-mobile',
      link: '/devices',
      children: [
        {
          label: 'Phones',
          icon: 'fa fa-mobile',
          link: '/phones',
          children: [
            {
              label: 'iPhone',
              icon: 'fa fa-apple',
              link: '/iphone',
              children: [
                {
                  label: 'iPhone 14',
                  icon: 'fa fa-apple',
                  link: '/iphone-14',
                  children: [
                    {
                      label: 'iPhone 14 Pro',
                      icon: 'fa fa-apple',
                      link: '/iphone-14-pro',
                      children: [
                        {
                          label: 'iPhone 14 Pro 1TB',
                          icon: 'fa fa-apple',
                          link: '/iphone-14-pro-1tb',
                        },
                        {
                          label: 'iPhone 14 Pro 512GB',
                          icon: 'fa fa-apple',
                          link: '/iphone-14-pro-512gb',
                        },
                        {
                          label: 'iPhone 14 Pro 256GB',
                          icon: 'fa fa-apple',
                          link: '/iphone-14-pro-256gb',
                        },
                        {
                          label: 'iPhone 14 Pro 128GB',
                          icon: 'fa fa-apple',
                          link: '/iphone-14-pro-128gb',
                        },
                      ],
                    },
                    {
                      label: 'iPhone 14 Pro Max',
                      icon: 'fa fa-apple',
                      link: '/iphone-14-pro-max',
                      children: [
                        {
                          label: 'iPhone 14 Pro Max 1TB',
                          icon: 'fa fa-apple',
                          link: '/iphone-14-pro-max-1tb',
                        },
                        {
                          label: 'iPhone 14 Pro Max 512GB',
                          icon: 'fa fa-apple',
                          link: '/iphone-14-pro-max-512gb',
                        },
                        {
                          label: 'iPhone 14 Pro Max 256GB',
                          icon: 'fa fa-apple',
                          link: '/iphone-14-pro-max-256gb',
                        },
                        {
                          label: 'iPhone 14 Pro Max 128GB',
                          icon: 'fa fa-apple',
                          link: '/iphone-14-pro-max-128gb',
                        },
                      ],
                    },
                    {
                      label: 'iPhone 14 Plus',
                      icon: 'fa fa-apple',
                      link: '/iphone-14-plus',
                      children: [
                        {
                          label: 'iPhone 14 Plus 1TB',
                          icon: 'fa fa-apple',
                          link: '/iphone-14-plus-1tb',
                        },
                        {
                          label: 'iPhone 14 Plus 512GB',
                          icon: 'fa fa-apple',
                          link: '/iphone-14-plus-512gb',
                        },
                        {
                          label: 'iPhone 14 Plus 256GB',
                          icon: 'fa fa-apple',
                          link: '/iphone-14-plus-256gb',
                        },
                        {
                          label: 'iPhone 14 Plus 128GB',
                          icon: 'fa fa-apple',
                          link: '/iphone-14-plus-128gb',
                        },
                      ],
                    },
                  ],
                },
                {
                  label: 'iPhone 13',
                  icon: 'fa fa-apple',
                  link: '/iphone-13',
                  children: [
                    { label: 'iPhone 13 Pro' },
                    { label: 'iPhone 13 Pro Max' },
                    { label: 'iPhone 13 Mini' },
                  ],
                },
                {
                  label: 'iPhone 12',
                  icon: 'fa fa-apple',
                  link: '/iphone-12',
                  children: [
                    { label: 'iPhone 12 Pro' },
                    { label: 'iPhone 12 Pro Max' },
                    { label: 'iPhone 12 Mini' },
                  ],
                },
              ],
            },
            {
              label: 'Pixel',
              icon: 'fa fa-google',
              link: '/pixel',
              children: [
                { label: 'Pixel 7' },
                { label: 'Pixel 7 Pro' },
                { label: 'Pixel 6' },
                { label: 'Pixel 6 Pro' },
              ],
            },
          ],
        },
        {
          label: 'Laptops',
          icon: 'fa fa-laptop',
          link: '/laptops',
          children: [
            { label: 'MacBook Pro' },
            { label: 'MacBook Air' },
            { label: 'Dell XPS' },
            { label: 'HP Spectre' },
          ],
        },
        {
          label: 'Desktops',
          icon: 'fa fa-desktop',
          link: '/desktops',
          children: [
            { label: 'iMac' },
            { label: 'Mac Mini' },
            { label: 'Dell Inspiron' },
            { label: 'HP Pavilion' },
          ],
        },
        {
          label: 'Tablets',
          icon: 'fa fa-tablet',
          link: '/tablets',
          children: [
            { label: 'iPad' },
            { label: 'iPad Pro' },
            { label: 'iPad Air' },
            { label: 'iPad Mini' },
          ],
        },
        { label: 'Smartwatches', icon: 'fa fa-clock', link: '/smartwatches' },
      ],
    },
    {
      label: 'Accessories',
      icon: 'fa fa-plug',
      link: '/accessories',
      children: [
        { label: 'Chargers', link: 'chargers' },
        { label: 'Cables', link: 'cables' },
      ],
    },
  ];

  constructor(
    private readonly router: Router,
    private themeService: ThemeService
  ) {
    // Initialize the theme service with the current theme
    this.themeService.setDarkTheme(this.isDarkTheme);
  }

  // Handler for menu link clicks
  handleMenuLinkClick(item: MenuItem): void {
    // Users can implement their own custom logic here
    console.log('Menu item clicked:', item);

    // Example of different actions based on link
    if (item.link) {
      // You could navigate programmatically
      this.router.navigate([item.link]);

      // Or open in a new tab
      // window.open(item.link, '_blank');

      // Or show a modal with content related to the link
      // this.dialogService.open(item.link);

      // You can access additional properties from the menu item
      if (item.label) {
        console.log(`The selected item was: ${item.label}`);
      }
    }
  }

  // Toggle between dark and light themes
  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    this.customTheme = this.isDarkTheme ? this.darkTheme : this.lightTheme;
    // Update the theme service
    this.themeService.setDarkTheme(this.isDarkTheme);
  }

  // Example method to programmatically toggle the menu
  toggleMenu() {
    this.menu.collapsed = !this.menu.collapsed;
  }
}
