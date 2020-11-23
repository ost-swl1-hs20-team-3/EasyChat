export interface SocketRequest {
  getEventName(): string;

  getRequestObject(): any;
}

export interface SocketResponse {
  timestamp: string;

  getEventName(): string;
  getResponseObject(): any;
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
      username: this.username
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
      newUsername: this.newUsername
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
      content: this.content
    };
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
  private onlineUsers: number;

  public timestamp: string;

  constructor(dataObj: ApiSocketResponse) {
    this.data = dataObj;

    this.timestamp = dataObj?.timestamp;

    this.onlineUsers = dataObj?.responseData?.count;
  }

  public getEventName(): string {
    return 'online-user-changed';
  }

  public getResponseObject(): any {
    return this.data;
  }

  public getNumberOfOnlineUsers(): number {
    return this.onlineUsers;
  }
}

export class LoginBroadcastResponse implements SocketResponse {
  private data: any;
  private username: string;

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

  public getUserName(): string {
    return this.username;
  }

}

export class MessageBroadcastResponse implements SocketResponse {
  private data: any;
  private senderUsername: string;
  private content: string;

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

  public getSenderUsername(): string {
    return this.senderUsername;
  }

  public getContent(): string {
    return this.content;
  }
}

export class UsernameChangeResponse implements SocketResponse {
  private data: any;
  private oldUsername: string;
  private newUsername: string;

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

  public getOldUsername(): string {
    return this.oldUsername;
  }

  public getNewUsername(): string {
    return this.newUsername;
  }
}
