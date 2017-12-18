import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { CommentsModule } from './comments/comments.module';
import { AppComponent } from './app.component';
import { CallbackComponent } from './callback.component';

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot(),
    CoreModule.forRoot(),
    CommentsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
