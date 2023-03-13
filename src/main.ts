import { enableProdMode, importProvidersFrom } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { environment } from "./environments/environment";
import { AppComponent } from "./app/app.component";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { TodoEffects } from "./app/todos/todo-store/todo.effects";
import { EffectsModule } from "@ngrx/effects";
import { reducers } from "./app/store/reducers";
import { StoreModule } from "@ngrx/store";
import { provideAnimations } from "@angular/platform-browser/animations";
import {
  withInterceptorsFromDi,
  provideHttpClient,
} from "@angular/common/http";
import { AppRoutingModule } from "./app/app-routing.module";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      AppRoutingModule,
      StoreModule.forRoot(reducers),
      EffectsModule.forRoot([TodoEffects]),
      StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: environment.production,
      })
    ),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
  ],
}).catch((err) => console.error(err));
