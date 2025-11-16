import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    provideAnimations(), // 👈 هذا السطر ضروري
    ...(appConfig.providers || []),
  ],
}).catch((err) => console.error(err));
