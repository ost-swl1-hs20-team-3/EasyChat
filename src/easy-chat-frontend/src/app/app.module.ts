import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatBarComponent } from './components/chat-bar/chat-bar.component';
import { ChatHistoryComponent } from './components/chat-history/chat-history.component';
import { ChatBubbleComponent } from './components/chat-bubble/chat-bubble.component';
import { UsernameEditComponent } from './components/username-edit/username-edit.component';
import { LogoComponent } from './components/logo/logo.component';


const APP_LOCALE_ID = 'de-CH';

import locale_de_ch from '@angular/common/locales/de-CH';
registerLocaleData(locale_de_ch);


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ChatComponent,
    ChatBarComponent,
    ChatHistoryComponent,
    ChatBubbleComponent,
    UsernameEditComponent,
    LogoComponent
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
  bootstrap: [AppComponent],
  entryComponents: [UsernameEditComponent]
})
export class AppModule { }
