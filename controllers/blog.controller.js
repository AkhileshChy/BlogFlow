import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";

export const getblogs = async (req, res) => {
    const { tags } = req.query;
    try {
        const filter = {};
        if (tags) {
            let tagsArray;
            if (Array.isArray(tags)) {
                tagsArray = tags;
            }else{
                tagsArray = tags.split(',').map(tag => tag.trim());
            }
            filter.tags = { $in: tagsArray };
        }
        const blogs = await Blog.find(filter);
        res.status(201).json({ success: true, blogs });
    } catch (error) {
        console.log("Error in getblogs controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const getblog = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }
        return res.status(200).json({success: true, blog}); 
    } catch (error) {
        console.log("Error in getblog controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const createblog = async (req, res) => {
    try {
        const { title, body, tags } = req.body;
        const userId = req.user._id;

        const newBlog = new Blog({
            title,
            body,
            author: userId,
            tags
        });

        await newBlog.save();

        await User.findByIdAndUpdate(userId, {
            $push : { blogs: newBlog._id }
        });

        res.status(201).json({ message: 'Blog created successfully', newBlog });
    } catch (error) {
        console.log("Error in createblog controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const deleteblog = async (req, res) => {
    const { id } = req.params; 
    const userId = req.user.id;
    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }
        if (blog.author.toString() !== userId) {
            return res.status(403).json({ success: false, message: 'Forbidden: You are not the author of this blog' });
        }
        await Blog.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: 'Blog deleted successfully' });
    } catch (error) {
        console.log("Error in deleteblog controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
    } 
}

export const updateblog = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        if (blog.author.toString() !== userId) {
            return res.status(403).json({ message: 'Forbidden: You are not the author of this blog' });
        }
        const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json({ success: true, updatedBlog });
    } catch (error) {
        console.log("Error in updateblog controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
    }

}
