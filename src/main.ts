// src/main.ts
import { enableProdMode, PLATFORM_ID } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

// Ionic Storage
import { provideStorage, StorageConfig, Storage } from '@ionic/storage-angular';

// Para cargar PWA Elements (cámara en web)
import { defineCustomElements } from '@ionic/pwa-elements/loader';

// Opcional: environment
import { environment } from './environments/environment';
import { TokenInterceptor } from './app/services/token.interceptor';

// (1) enableProdMode si estás en producción
if (environment.production) {
  enableProdMode();
}


// (4) Definir los elementos PWA (pwa-camera-modal) en el navegador
defineCustomElements(window);

// (5) Bootstrap de la aplicación en modo standalone
bootstrapApplication(AppComponent, {
  providers: [
    provideIonicAngular(),   // Ionic en modo standalone
    provideHttpClient(),     // HttpClient standalone
    provideRouter(routes),    // Rutas
    provideHttpClient(withInterceptorsFromDi()), // Usar conInterceptorsFromDi
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ]
}).catch(err => console.error(err));

