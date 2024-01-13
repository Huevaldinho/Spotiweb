import { Routes } from '@angular/router';
import { SeachPageComponent } from './search/pages/seach-page/search-page.component';
import { HomePageComponent } from './home/pages/home-page/home-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'search', component: SeachPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: '**', redirectTo: 'home' }
];
