const jwt = require('jsonwebtoken')
const APP_SECRET = 'GraphQL-is-aw3some'

var get_cookies = function(request) {
  var cookies = {};
  request.headers && request.headers.cookie.split(';').forEach(function(cookie) {
    var parts = cookie.match(/(.*?)=(.*)$/)
    cookies[ parts[1].trim() ] = (parts[2] || '').trim();
  });
  return cookies;
};

function getUserId(context) {
  const Authorization = get_cookies(context.req)['session_token']
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, APP_SECRET)
    return userId
  }

  throw new Error('Not authenticated')
}

//pubsub definitions
const { PubSub } = require('apollo-server');
const pubsub = new PubSub();
const POST_ADDED = 'POST_ADDED';

module.exports = {
  APP_SECRET,
  getUserId,
  pubsub,
  POST_ADDED
}