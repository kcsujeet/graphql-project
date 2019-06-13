const {pubsub, POST_ADDED} = require('../utils')

const newPostAdded=  {
    subscribe: () => pubsub.asyncIterator([POST_ADDED])
}


  module.exports = {
      newPostAdded
  }