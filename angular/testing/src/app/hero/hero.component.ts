import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  heroData = {
    title: 'Welcome to Our Website',
    subtitle: 'Discover amazing features and explore more!',
    backgroundImage: '/icon.png',
    buttonText: 'Get Started',
  };
}
