const {User, Post} = require('../db/models')

async function user(parent, args){
    return await User.findOne({_id: parent.user})
}

async function post(parent, args){
    return await Post.findOne({_id: parent.post})
}

module.exports = {
    user, 
    post
}