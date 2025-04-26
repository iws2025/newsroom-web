import React, { useEffect, useState } from 'react'
import Tags from '../../components/pages/Tags'
import ImageUpload from '../../components/imageUpload/ImageUpload'
import { createNews, editNews, getNewsCategory, getNewsDetail } from '../../services/newsService';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Loading from '../../components/loading/Loading';

const NewsCreateEdit = () => {	
    const { newsId } = useParams();
    const { user } = useAuth();
	const navigate = useNavigate();

    const [news, setNews] = useState({
        title: "",
        content: "",
        category: "technology",
    });

    const [thumbnail, setThumbnail] = useState("");
    const [categories, setCategories] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target; 
        setNews((prevForm) => ({
            ...prevForm, 
            [name]: value, 
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!news.title || !news.category || !news.content) {
            toast.error("Please enter all required fields");
            return;
        }

        let result;
        if (newsId) {
            result = await editNews({
                newsId,
                title: news.title,
                content: news.content,
                category: news.category,
                thumbnail
            });
            if (result) {
                toast.success(result.message);
            }
            fetchNews();
        } else {
            result = await createNews({
                title: news.title,
                content: news.content,
                category: news.category,
                thumbnail
            });
            if (result) {
                toast.success(result.message);
            }
            if (user)
            {
                navigate(`/news/list/${user?._id}`);
            }
        }
     
    }

    const fetchNewsCategory = async () => {
        const response = await getNewsCategory();
        const categories = response.data;
        setCategories(categories);
    }

    const fetchNews = async () => {
        try {
            setIsLoading(true);
            const response = await getNewsDetail(newsId);
            const fetchedNews = response.data;
            setIsLoading(false);
            setNews(fetchedNews);
            setThumbnail(fetchedNews.thumbnail);
        } catch (error) {   
            console.log(error);
        }
    }   

    useEffect(() => {
        fetchNewsCategory();
        if (newsId) {
            fetchNews();
        }
    }, []);

    if (isLoading) {
		return (
			<div id="news-create-edit">
      			<Loading />
			</div>
		)
	}

    return (
        <div id="news-create-edit">
            <div className="container-fluid">
                <div className="container">
                    <nav className="breadcrumb bg-transparent m-0 p-0">
                    <a className="breadcrumb-item" href="/home">Home</a>
                    <a className="breadcrumb-item" href={`/news/list/${user?._id}`}>News</a>
                    {
                        newsId ?   
                            <span className="breadcrumb-item active">Edit news</span>
                        :
                            <span className="breadcrumb-item active">Create news</span>
                    }
                    </nav>
                </div>
            </div>

            <div className="container-fluid py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="bg-light py-2 px-4 mb-3">
                                <h3 className="mt-2">
                                    {
                                        newsId ? "Edit post" : "Create new post"
                                    }
                                </h3>
                                <form className="mt-4">
                                    <div className="control-group">
                                        <label htmlFor="title" className="font-weight-bold">Title</label>
                                        <input type="text" className="form-control" placeholder="Title" name="title" value={news.title} onChange={handleInputChange} autoComplete="off"/>
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div className="control-group">
                                        <label htmlFor="content" className="font-weight-bold">Content</label>
                                        <textarea className="form-control" rows="4" placeholder="Content" name="content" value={news.content} onChange={handleInputChange}></textarea>
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div className="control-group">
                                        <label htmlFor="category" className="font-weight-bold">Category</label>
                                        <select 
                                            name="category" 
                                            id="category" 
                                            className="form-control"
                                            value={news.category} 
                                            onChange={handleInputChange}
                                        >
                                            { categories.map((category) => (
                                                <option value={category} className="text-capitalize">{category}</option>
                                            ))}
                                        </select>      
                                        <p className="help-block text-danger"></p>                              
                                    </div>
                                    <div className="control-group">
                                        <label htmlFor="content" className="font-weight-bold">Thumbnail</label>
                                        <ImageUpload image={thumbnail} setImage={setThumbnail}/>
                                    </div>
                                    <div>
                                        <button className="btn btn-primary font-weight-semi-bold px-4" style={{ height: "50px" }} onClick={onSubmit}>Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <Tags />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsCreateEdit