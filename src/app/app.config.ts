import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';//*Se importa el provider para el HttpClient
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    //*Se agregan los providers para el HttpClient
    provideHttpClient(withFetch())]
};
