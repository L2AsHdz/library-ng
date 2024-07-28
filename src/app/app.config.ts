import { ApplicationConfig } from '@angular/core';
import {provideRouter} from "@angular/router";
import {routes} from "./app.routes";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {AuthInterceptor} from "./features/auth/auth.interceptor";
import {provideAnimations} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
};
