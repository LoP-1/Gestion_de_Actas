import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/auth/interceptor';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ]
});