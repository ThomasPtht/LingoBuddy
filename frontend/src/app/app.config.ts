import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { LucideAngularModule, ArrowLeft, GraduationCap, BookOpen, RotateCcw, Trophy, User, Trash } from 'lucide-angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth/auth.interceptor'; 

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])), // ← interceptor branché
    provideAnimations(), // ← remplace provideAnimations()
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    importProvidersFrom(LucideAngularModule.pick({ ArrowLeft, GraduationCap, BookOpen, RotateCcw, Trophy, User, Trash })),
  ],
};