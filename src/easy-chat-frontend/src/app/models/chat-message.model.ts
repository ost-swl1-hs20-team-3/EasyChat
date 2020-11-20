export interface Message {
  sender: string;
  content: string;
  timestamp: string;

  getType(): MessageType;
}

export enum MessageType {
  ChatMessage,
  UserConnected,
  UserNameChanged
}


export class ChatMessage implements Message {
  public sender: string;
  public content: string;
  public timestamp: string;

  public getType(): MessageType { return MessageType.ChatMessage; }
}

export class UserConnectedMessage implements Message {
  public sender: string;
  public content: string;
  public timestamp: string;

  public getType(): MessageType { return MessageType.UserConnected; }
}

export class UsernameChangedMessage implements Message {
  public sender: string;
  public content: string;
  public timestamp: string;

  public getType(): MessageType { return MessageType.UserNameChanged; }
}
