const{User, Post} = require('../db/models')
const { getUserId } = require('../utils')

async function get_post(parent, arg){
    const post = await Post.find((post) => post.id == arg.id)
    return post
}

async function get_posts(){
    return await Post.find({}).exec()
}

async function get_users(){
    return await User.find({}).exec()
}

async function get_my_posts(parent, arg, context){
    return await Post.find({created_by: getUserId(context)})  
}

module.exports = {
    get_post,
    get_posts,
    get_users,
    get_my_posts
}