import { Routes } from '@angular/router';
import { SeachPageComponent } from './search/pages/search-page.component';
import { HomePageComponent } from './home/pages/home-page.component';
import { ArtistDetailsPageComponent } from './artist-details/pages/artist-details-page/artist-details-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'search', component: SeachPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'artist/:type/:id/:artistId', component: ArtistDetailsPageComponent },
  { path: '**', redirectTo: 'home' }
];
