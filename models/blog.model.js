import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        tags: [
            { type: String }
        ],
        createdAt: {
            type: Date,
            default: Date.now
        },
        comments: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                },
                comment: {
                    type: String,
                    required: true
                },
                commentedAt: {
                    type: Date,
                    default: Date.now
                }
            }
        ],
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    { timestamps: true }
);

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;