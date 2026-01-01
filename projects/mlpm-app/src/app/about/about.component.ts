import { DatePipe, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [DatePipe, JsonPipe],
  templateUrl: './about.component.html',
})
export class AboutComponent {
  currentDate = new Date();

  // Example features that could be implemented in MLPM
  libraryFeatures = [
    {
      name: 'Multi-level Navigation',
      description: 'Support for unlimited menu hierarchy depths',
      status: 'Implemented',
    },
    {
      name: 'Theming System',
      description: 'Fully customizable color schemes and appearances',
      status: 'Implemented',
    },
    {
      name: 'Animation Effects',
      description: 'Smooth transitions between menu levels',
      status: 'In Progress',
    },
    {
      name: 'Mobile Responsiveness',
      description: 'Adapts to different screen sizes automatically',
      status: 'Planned',
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
