export interface Message {
  senderName: string;
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

  public senderSocketId: string;
  public senderName: string;
  public timestamp: string;

  constructor(senderSocketId: string, senderName: string, chatMessage: string) {
    this.senderSocketId = senderSocketId;
    this.senderName = senderName;
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

  public senderName: string;
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
  public senderName: string;
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
