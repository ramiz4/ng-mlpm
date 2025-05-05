import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [DatePipe],
  templateUrl: './about.component.html',
})
export class AboutComponent {
  currentDate = new Date();
}
