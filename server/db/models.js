const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
})

const postSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    created_by: { type: Schema.Types.ObjectId, ref: 'User' },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
})

const commentSchema = new Schema({
    text: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now },
})

const User = mongoose.model('User', userSchema)
const Post = mongoose.model('Post', postSchema)
const Comment = mongoose.model('Comment', commentSchema)

userSchema.pre('remove', function(next) {
    Post.remove({created_by: this._id}).exec();
    Comment.remove({user: this._id}).exec();
    next();
});

postSchema.pre('remove', function(next) {
    Comment.remove({post: this._id}).exec();
    next();
});

module.exports = {
    User,
    Post,
    Comment
}