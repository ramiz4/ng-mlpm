import { AsyncPipe, Location, NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-not-found',
  imports: [NgIf, AsyncPipe, NgClass],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly themeService = inject(ThemeService);

  theme$ = this.themeService.theme$;

  goToHome(): void {
    this.router.navigate(['/home']);
  }

  goBack(): void {
    this.location.back();
  }
}
