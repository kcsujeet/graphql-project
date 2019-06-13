const { User, Post,Comment } = require('../db/models')
const {pubsub, POST_ADDED} = require('../utils')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

//authentication
async function signup(parent, args, context, info) {
    console.log(args)
    const password = await bcrypt.hash(args.password, 10)
    const user = await User.create({ ...args, password })
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
    return {
        token,
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
    return {
        token,
        user,
    }
}

async function add_post(parent, args, context, info) {
    const userId = getUserId(context)
    const resp = await Post.create({
        title: args.title,
        description: args.description,
        created_by: userId ,
    })
    pubsub.publish(POST_ADDED, {newPostAdded: resp});
    console.log(resp)
    return resp
}

async function add_comment(parent, args, context, info) {
    const userId = getUserId(context)
    const resp = await Comment.create({
        text: args.text,
        user: userId ,
        post: args.postId,
        createdAt: Date.now(),
        updatedAt: Date.now()
    })
    return resp
}




module.exports = {
    login,
    signup,
    add_post, 
    add_comment
}

