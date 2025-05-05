import { AsyncPipe } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { MenuItem, MlpmComponent } from '../../../mlpm/src/public-api';
import { ThemeToggleComponent } from './shared/theme-toggle/theme-toggle.component';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, RouterOutlet, MlpmComponent, ThemeToggleComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(MlpmComponent) menu!: MlpmComponent;

  private readonly router = inject(Router);
  private readonly themeService = inject(ThemeService);

  customMenuTheme$ = this.themeService.theme$.pipe(
    switchMap((theme) => of(this.themeService.themeMap[theme]))
  );

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

  handleMenuLinkClick(item: MenuItem): void {
    console.log('Menu item clicked:', item);
    if (item.link) {
      this.router.navigate([item.link]);
    }
  }

  toggleMenu() {
    this.menu.collapsed = !this.menu.collapsed;
  }
}
