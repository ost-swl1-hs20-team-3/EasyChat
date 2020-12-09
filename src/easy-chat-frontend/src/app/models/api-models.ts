import { MessageType } from './models';

export interface SocketRequest {
  getEventName(): string;

  getRequestObject(): any;
}

export interface SocketResponse {
  timestamp: string;

  getEventName(): string;
  getResponseObject(): any;
}

export interface MessageResponse {
  type: MessageType;
}

export interface ApiSocketResponse {
  timestamp?: string;
  socketId?: string;
  requestData?: any;
  responseData?: any;
}

// -------------------------------------------------------------------
// REQUESTS
// -------------------------------------------------------------------
export class LoginRequest implements SocketRequest {
  private data: any;

  private username: string;

  constructor(dataObj: { username: string }) {
    this.data = dataObj;

    this.username = dataObj.username;
  }

  public getEventName(): string {
    return 'login';
  }

  public getRequestObject(): any {
    return {
      username: this.username,
      type: MessageType.UserConnected
    };
  }
}

export class UsernameChangeRequest implements SocketRequest {
  private data: any;

  private oldUsername: string;
  private newUsername: string;

  constructor(dataObj: { oldUsername: string, newUsername: string }) {
    this.data = dataObj;

    this.oldUsername = dataObj.oldUsername;
    this.newUsername = dataObj.newUsername;
  }

  public getEventName(): string {
    return 'username-change';
  }

  public getRequestObject(): any {
    return {
      oldUsername: this.oldUsername,
      newUsername: this.newUsername,
      type: MessageType.UserNameChanged
    };
  }
}

export class MessageRequest implements SocketRequest {
  private data: any;

  private sender: string;
  private content: string;

  constructor(dataObj: { sender: string, content: string }) {
    this.data = dataObj;

    this.sender = dataObj.sender;
    this.content = dataObj.content;
  }

  public getEventName(): string {
    return 'message';
  }

  public getRequestObject(): any {
    return {
      sender: this.sender,
      content: this.content,
      type: MessageType.ChatMessage
    };
  }
}

export class AllMessagesRequest implements SocketRequest {

  getEventName(): string {
    return 'get-all-messages';
  }

  getRequestObject(): object {
    return {};
  }

}

// -------------------------------------------------------------------
// RESPONSES
// -------------------------------------------------------------------
export class ReservedUsernamesChangedResponse implements SocketResponse {
  private data: any;
  private reservedUsernames: string[] = [];

  public timestamp: string;

  constructor(dataObj: ApiSocketResponse) {
    this.data = dataObj;

    this.timestamp = dataObj?.timestamp;

    this.reservedUsernames = dataObj?.responseData?.reservedUsernames || [];
  }

  public getEventName(): string {
    return 'reserved-usernames-changed';
  }

  public getResponseObject(): any {
    return this.data;
  }

  public getReservedUsernames(): string[] {
    return this.reservedUsernames;
  }
}

export class OnlineUserChangedResponse implements SocketResponse {
  private data: any;
  private onlineUsers: Map<string, any>;

  public timestamp: string;

  constructor(dataObj: ApiSocketResponse) {
    this.data = dataObj;

    this.timestamp = dataObj?.timestamp;

    this.onlineUsers = dataObj?.responseData;
  }

  public getEventName(): string {
    return 'online-user-changed';
  }

  public getResponseObject(): any {
    return this.data;
  }

  public getOnlineUsers(): Map<string, any> {
    return this.onlineUsers;
  }
}

export class LoginBroadcastResponse implements SocketResponse {
  private data: any;

  public username: string;
  public timestamp: string;

  constructor(dataObj: ApiSocketResponse) {
    this.data = dataObj;

    this.timestamp = dataObj?.timestamp;

    this.username = dataObj?.responseData?.username;
  }

  public getEventName(): string {
    return 'login-broadcast';
  }

  public getResponseObject(): any {
    return this.data;
  }

}

export class MessageBroadcastResponse implements SocketResponse {
  private data: any;

  public senderUsername: string;
  public content: string;
  public timestamp: string;
  public senderSocketId: string;

  constructor(dataObj?: ApiSocketResponse) {
    this.data = dataObj;

    this.timestamp = dataObj?.timestamp;
    this.senderSocketId = dataObj?.socketId;

    this.senderUsername = dataObj?.responseData?.sender;
    this.content = dataObj?.responseData?.content;
  }

  public getEventName(): string {
    return 'message-broadcast';
  }

  public getResponseObject(): any {
    return this.data;
  }

}

export class AllMessagesResponse implements SocketResponse {
  private data: any;
  private messages: Array<MessageResponse> = [];

  public timestamp: string;

  constructor(dataObj?: ApiSocketResponse) {
    this.data = dataObj;

    this.messages = dataObj?.responseData;
    this.timestamp = dataObj?.timestamp;
  }

  public getEventName(): string {
    return 'all-messages';
  }

  public getResponseObject(): any {
    return this.data;
  }

  public getAllMessages(): Array<MessageResponse> {
    return this.messages;
  }

}

export class UsernameChangeResponse implements SocketResponse {
  private data: any;
  public oldUsername: string;
  public newUsername: string;

  public timestamp: string;

  constructor(dataObj?: ApiSocketResponse) {
    this.data = dataObj;

    this.timestamp = dataObj?.timestamp;
    this.oldUsername = dataObj?.responseData?.oldUsername;
    this.newUsername = dataObj?.responseData?.newUsername;
  }

  public getEventName(): string {
    return 'username-change-broadcast';
  }

  public getResponseObject(): any {
    return this.data;
  }

}
