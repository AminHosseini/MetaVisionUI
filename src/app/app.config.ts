import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterModule, provideRouter, withPreloading } from '@angular/router';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { routes } from './app.routes';
import { productCategoriesRoutes } from './shop/product-categories/product-categories.routes';
// import { interceptorProvider } from './shared/interceptors/interceptor-provider';
import { FlagBasedPreloadingStrategyService } from './shared/services/flag-based-preloading-strategy.service';
import { httpInterceptor } from './shared/interceptors/http.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideRouter(routes, withPreloading(FlagBasedPreloadingStrategyService)),
    provideRouter(
      productCategoriesRoutes,
      withPreloading(FlagBasedPreloadingStrategyService)
    ),
    provideHttpClient(withFetch(), withInterceptors([httpInterceptor])),
    // importProvidersFrom(RouterModule.forRoot(routes, { enableTracing: true })),
    importProvidersFrom(RouterModule.forRoot(routes)),
    // interceptorProvider,
  ],
};
