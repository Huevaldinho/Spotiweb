import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SpotifyService } from './shared/services/spotify.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'App component';
  constructor(private spotifyService: SpotifyService) { }

  ngOnInit(): void { this.spotifyService.getAccessToken_(); }
}
