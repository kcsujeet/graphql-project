const { User, Comment } = require('../db/models')

async function created_by(parent, args,context){
    return await User.findOne({_id: parent.created_by})
}

async function comments(parent, args, context) {
    return await Comment.find({post: parent.id })
 }
module.exports = {
    created_by, 
    comments
}