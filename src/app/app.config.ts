import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { MotorRepository } from './features/digital-twin/domain/repositories/motor.repository';
import { MotorApiRepository } from './features/digital-twin/infrastructure/repositories/motor-api.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: MotorRepository,
      useClass: MotorApiRepository,
    },
  ],
};
