const News = require("../models/News");

//@description    Get news list by category
//@route          GET api/news?category=
//@access         Public
const getNewsByCategory = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.pageSize) || 10;
        const category = req.query.category;
        const skip = (page - 1) * limit;
    
        const filter = category ? { category } : {};

        const [total, news] = await Promise.all([
        News.countDocuments(filter),
        News.find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .populate("author", "username avatar email")
        ]);
    
        res.status(200).json({
            message: "Get news by category successfully",
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            data: news
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

//@description    Get most views news
//@route          GET api/news/featured
//@access         Public
const getFeaturedNews = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * limit;
    try {
        const total = await News.countDocuments({});
        const topNews = await News.find({})
            .skip(skip)
            .limit(limit)
            .sort({ views: -1 })           
    
        res.status(200).json({ 
            message: "Get featured news successfully", 
            data: topNews, currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total, 
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

const getLatestNews = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * limit;
    try {
        const total = await News.countDocuments({});
        const topNews = await News.find({})
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })           
    
        res.status(200).json({ 
            message: "Get latest news successfully", 
            data: topNews, currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total, 
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

//@description    Get news detail by id
//@route          GET api/news/:id
//@access         Public
const getNewsById = async (req, res) => {
    try {
        const news = await News.findById(req.params.id)
            .populate("author", "username avatar email")
            .populate({
                path: "comments",
                match: { replyTo: null },
                options: { sort: { createdAt: -1 } },
                populate: [
                    { path: "author", select: "username avatar" },
                    {
                        path: "replies",
                        populate: { path: "author", select: "username avatar" }
                    }
                    ]
                });
        
        if (!news) {
            return res.status(404).json({ message: "News not found." });
        }
        return res.status(200).json({ message: "Get news successfully", data: news });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error
        });
    }
}

//@description    Get news of a user
//@route          GET api/news/user/:id
//@access         Public
const getNewsOfUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.pageSize) || 10;
        const skip = (page - 1) * limit;

        const total = await News.countDocuments({ author: userId });
        const news = await News.find({ author: userId })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }) 
            .populate("author", "username email avatar");

        return res.status(200).json({
            message: "Get news by user successfully",
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            data: news
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

//@description    Search news
//@route          GET api/news/search
//@access         Public
const searchNews = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.pageSize) || 10;
        const skip = (page - 1) * limit;
    
        const keyword = req.query.keyword || "";
    
        const query = {
            title: { $regex: keyword, $options: "i" }
          };
      
        const total = await News.countDocuments(query);
        const news = await News.find(query)
            .populate("author", "username avatar email")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            message: "Search news successfully",
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            data: news
            });      
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

//@description    Create new news
//@route          POST api/news
//@access         Protected
const createNews = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "Unauthorized. Please log in." });
        }

        const { title, content, thumbnail, category } = req.body;
        if (!title || !content || !thumbnail || !category) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        const newNews = new News({
            title,
            content,
            thumbnail,
            category,
            author: req.user._id
        });

        const savedNews = await newNews.save();

        res.status(201).json({ message: "News created successfully.", news: savedNews });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error
        });
    }
}

//@description    Update an existing news
//@route          PUT api/news/:id
//@access         Protected
const updateNews = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
    
        if (!news) {
          return res.status(404).json({ message: "News not found." });
        }
    
        const updatedNews = await News.findByIdAndUpdate(req.params.id, {
            $set: req.body, 
        }, { new: true });
        return res.status(200).json({ message: "Updated news successfully", data: updatedNews });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error
        });
    }
}

//@description    Increase 1 view of a news
//@route          PUT api/news/:id/view
//@access         Public
const increaseView = async (req, res) => {
    try {
        const updated = await News.findByIdAndUpdate(
            req.params.id,
            { $inc: { views: 1 } },
            { new: true }
        );
    
        if (!updated) {
          return res.status(404).json({ message: "News not found" });
        }
    
        res.status(200).json({
          message: "View count increased",
          views: updated.views
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
    }
}

//@description    Delete a news
//@route          DELETE api/news/:id
//@access         Protected
const deleteNews = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
    
        if (!news) {
          return res.status(404).json({ message: "News not found." });
        }
    
        await News.findByIdAndDelete(req.params.id);
    
        return res.status(200).json({ message: "News deleted successfully." });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
}

module.exports = { getNewsByCategory, getFeaturedNews, getLatestNews, getNewsById, getNewsOfUser, searchNews, createNews, updateNews, increaseView, deleteNews }