import { ChatMessage } from './models';

describe('ChatMessage', () => {
  it('should create an instance', () => {
    expect(new ChatMessage('Msg')).toBeTruthy();
  });
});
