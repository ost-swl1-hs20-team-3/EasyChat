import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContentComponent } from './components/content/content.component';
import { ChatBarComponent } from './components/chat-bar/chat-bar.component';
import { CurrentlyTypingBarComponent } from './components/currently-typing-bar/currently-typing-bar.component';


const APP_LOCALE_ID = 'de-CH';

import locale_de_ch from '@angular/common/locales/de-CH';
registerLocaleData(locale_de_ch);


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    ChatBarComponent,
    CurrentlyTypingBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    {
      provide: LOCALE_ID, useValue: APP_LOCALE_ID
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
