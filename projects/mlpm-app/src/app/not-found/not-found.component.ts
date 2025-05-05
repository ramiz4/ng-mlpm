import { Location, NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-not-found',
  imports: [NgClass],
  templateUrl: './not-found.component.html',
  standalone: true,
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit, OnDestroy {
  isDarkTheme = true;
  private themeSubscription!: Subscription;

  constructor(
    private router: Router,
    private themeService: ThemeService,
    private location: Location
  ) {}

  ngOnInit(): void {
    // Subscribe to theme changes
    this.themeSubscription = this.themeService.darkTheme$.subscribe(
      (isDark) => {
        this.isDarkTheme = isDark;
      }
    );
  }

  ngOnDestroy(): void {
    // Clean up subscription when component is destroyed
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

  goBack(): void {
    this.location.back();
  }
}
