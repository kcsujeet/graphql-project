const { Post, Comment } = require('../db/models')

async function posts(parent, args, context) {
   return await Post.find({created_by: parent.id })
}

async function comments(parent, args, context) {
    return await Comment.find({user: parent.id })
 }

module.exports = {
    posts,
    comments
}