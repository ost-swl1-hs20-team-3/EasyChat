import { AnyAaaaRecord } from 'dns';

export interface Message {
  sender: string;
  timestamp: string;

  getType(): MessageType;
  getContent(): string;
}

export enum MessageType {
  ChatMessage,
  UserConnected,
  UserNameChanged
}


export class ChatMessage implements Message {
  private content: string;

  public sender: string;
  public timestamp: string;

  constructor(sender: string, chatMessage: string) {
    this.sender = sender;
    this.content = chatMessage;
  }

  public getType(): MessageType {
    return MessageType.ChatMessage;
  }

  public getContent(): string {
    return this.content;
  }
}

export class UserConnectedMessage implements Message {
  private content: string;

  public sender: string;
  public timestamp: string;

  constructor(username: string) {
    this.content = `${username} ist diesem Chat beigetreten`;
  }

  public getType(): MessageType {
    return MessageType.UserConnected;
  }

  public getContent(): string {
    return this.content;
  }
}

export class UsernameChangedMessage implements Message {
  public sender: string;
  public content: string;
  public timestamp: string;

  constructor(oldUsername: string, newUsername: string) {
    this.content = `${oldUsername} änderte den Benutzernamen zu ${newUsername}`;
  }

  public getType(): MessageType {
    return MessageType.UserNameChanged;
  }

  public getContent(): string {
    return this.content;
  }
}
