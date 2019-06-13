const{User, Post} = require('../db/models')

function get_post(parent, arg){
    post = posts.find((post) => post.id == arg.id)
    return post
}

async function get_posts(){
    return await Post.find({}).exec()
}

async function get_users(){
    return await User.find({}).exec()
}

module.exports = {
    get_post,
    get_posts,
    get_users
}