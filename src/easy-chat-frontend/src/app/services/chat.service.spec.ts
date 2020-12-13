import { TestBed } from '@angular/core/testing';

import { ChatService } from './chat.service';

describe('ChatService', () => {
  let service: ChatService;

  const mockActiveUsers = [
    { username: "Hallo", onFire: false },
    { username: "Erwin", onFire: false },
    { username: "Zelda", onFire: true },
    { username: "Hello", onFire: true },
    { username: "Aaron", onFire: false },
    { username: "Egon", onFire: false },
    { username: "Ewald", onFire: true }
  ];

  const mockActiveUsersSorted = [

    { username: "Ewald", onFire: true },
    { username: "Hello", onFire: true },
    { username: "Zelda", onFire: true },
    { username: "Aaron", onFire: false },
    { username: "Egon", onFire: false },
    { username: "Erwin", onFire: false },
    { username: "Hallo", onFire: false }
  ];


  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sort the users correctly (onFire, than Name ASC))', () => {
    service["activeUsers"] = mockActiveUsers;

    expect(service.onlineUsersSorted).toEqual(mockActiveUsersSorted);
    expect(service.onlineUsersSorted).toEqual(mockActiveUsersSorted);
    expect(service.onlineUsersSorted).toEqual(mockActiveUsersSorted);
  });
});
