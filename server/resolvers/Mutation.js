const { User, Post,Comment } = require('../db/models')
const {pubsub, POST_ADDED} = require('../utils')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

//authentication
async function signup(parent, args, context, info) {
    const password = await bcrypt.hash(args.password, 10)
    const user = await User.create({ ...args, password })
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
    context.response.cookie('session_token', token, { httpOnly: true });
    const isLoggedIn = true
    return {
        isLoggedIn,
        user,
    }
}

async function login(parent, args, context, info) {
    const user = await User.findOne({ email: args.email })
    if (!user) {
        throw new Error('No such user found')
    }
    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
        throw new Error('Invalid password')
    }
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
    context.res.cookie('session_token', token, { httpOnly: true });
    
    const isLoggedIn = true

    return {
        isLoggedIn,
        user,
    }
}


//Post CRUD
async function add_post(parent, args, context, info) {
    const userId = getUserId(context)
    const resp = await Post.create({
        title: args.title,
        description: args.description,
        created_by: userId ,
    })
    pubsub.publish(POST_ADDED, {newPostAdded: resp});
    return resp
}

async function update_post(parent, args, context, info) {
    const userId = getUserId(context)
    const post = await Post.findOne({_id: args.id})
    if (!post) {
        throw new Error('Post doesn\'t exist')
    }
    if(userId == post.created_by){
        const resp = await Post.findByIdAndUpdate(args.id,{
            title: args.title,
            description: args.description
        },{new: true})
        return resp
    }else{
        throw new Error('Not authorized')
    }

}

async function delete_post(parent, args ,context, info) {
    const userId = getUserId(context)
    const post = await Post.findOne({_id: args.id})
    if (!post) {
        throw new Error('Post doesn\'t exist')
    }
    if(userId == post.created_by){
        const resp = await Post.findOneAndDelete({_id: args.id})
        return resp
    }else{
        throw new Error('Not authorized')
    }
}

//comment CRUD

async function add_comment(parent, args, context, info) {
    const userId = getUserId(context)
    user = await User.findOne({_id: userId})
    if (user){
        const resp = await Comment.create({
            text: args.text,
            user: userId ,
            post: args.postId,
            createdAt: Date.now(),
            updatedAt: Date.now()
        })
        return resp
    } else{
        throw new Error('Not authorized');
    }
}

async function update_comment(parent, args, context, info) {
    const userId = getUserId(context)
    const comment = await Comment.findOne({_id: args.id})
    if (!comment) {
        throw new Error('Comment doesn\'t exist')
    }
    if(userId == comment.user){
        const resp = await Comment.findByIdAndUpdate(args.id,{
            title: args.title,
            description: args.description
        },{new: true})
        return resp
    }else{
        throw new Error('Not authorized')
    }
}

async function delete_comment(parent, args ,context, info) {
    const userId = getUserId(context)
    const comment = await Comment.findOne({_id: args.id})
    if (!comment) {
        throw new Error('Comment doesn\'t exist')
    }
    if(userId == comment.user){
        const resp = await Comment.findOneAndDelete({_id: args.id})
        return resp
    }else{
        throw new Error('Not authorized')
    }
}




module.exports = {
    login,
    signup,
    add_post, 
    add_comment,
    update_post, 
    delete_post,
    update_comment,
    delete_comment
}

