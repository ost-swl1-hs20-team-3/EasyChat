export const environment = {
  production: true,
  // https://cors-anywhere.herokuapp.com/ to prevent Mixed content error (github.io has SSL - Heroku not)
  SOCKET_ENDPOINT: 'https://cors-anywhere.herokuapp.com/http://easy-chat-backend.herokuapp.com/',
  FEATURE_FLAGS: {
  }
};
