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
import { ChatInfoMessageNewUserComponent } from './components/chat-info-message-new-user/chat-info-message-new-user.component';
import { ChatInfoMessageUsernameChangedComponent } from './components/chat-info-message-username-changed/chat-info-message-username-changed.component';
import { UsersOnlineButtonComponent } from './components/users-online-button/users-online-button.component';

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
    ChatInfoMessageNewUserComponent,
    ChatInfoMessageUsernameChangedComponent,
    UsersOnlineButtonComponent
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
