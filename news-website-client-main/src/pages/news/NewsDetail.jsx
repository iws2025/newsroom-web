import React, { useEffect, useState } from 'react'
import UserDefaultImg from "../../assets/img/user.jpg"
import Tags from '../../components/pages/Tags';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteNews, getNewsDetail, increaseView } from '../../services/newsService';
import { formatDate } from '../../utilities/utils';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import Loading from '../../components/loading/Loading';

const NewsDetail = () => {
	const { newsId } = useParams();
	const { user } = useAuth();
	const navigate = useNavigate();

	const [news, setNews] = useState();
	const [isLoading, setIsLoading] = useState(false);

	const onIncreaseView = async () => {
		try {
            const response = await increaseView(newsId);
            const fetchedNews = response.data;
            setNews(fetchedNews);
        } catch (error) {   
            console.log(error);
        }
	}

	const fetchNews = async () => {
		try {
			setIsLoading(true);
            const response = await getNewsDetail(newsId);
            const fetchedNews = response.data;
            setNews(fetchedNews);
        } catch (error) {   
            console.log(error);
        } finally {
			setIsLoading(false);
		}
	}

	const onDeleteNews = async (newsId) => {
		try {
            const result = await deleteNews(newsId);
            if (result) {
                toast.success(result.message);
				navigate(`/news/list/${user._id}`);
            }
        } catch (error) {   
            console.log(error);
        }
	}

	useEffect(() => {
		onIncreaseView();
		fetchNews();
	}, []);

	if (isLoading) {
		return (
			<div id='detail'>
      			<Loading />
			</div>
		)
	}

  	return (
    <div id='detail'>
      	<div class="container-fluid">
        	<div class="container">
				<nav class="breadcrumb bg-transparent m-0 p-0">
					<a class="breadcrumb-item" href="/home">Home</a>
					<a class="breadcrumb-item" href="/">News</a>
					<span class="breadcrumb-item active">{ news?.title }</span>
				</nav>
        	</div>
      	</div>

		<div className="container-fluid py-3">
			<div className="container">
				<div className="row">
					<div className="col-lg-8">
						<div className="position-relative mb-3">
							<img
								className="img-fluid w-100"
								src={ news?.thumbnail }
								style={{ objectFit: "cover" }}
								alt="news-main"
							/>
								<div className="overlay position-relative bg-light">
								<div className="mb-3 d-flex align-items-center justify-content-between w-100">
									<div>
										<a href={`/category/${news?.category}`} className="text-capitalize">{ news?.category }</a>
										<span className="px-1">/</span>
										<span>{ formatDate(news?.createdAt) }</span>
									</div>
									{
										user?._id === news?.author?._id && (
											<div className="btn-actions">
												<button className="btn btn-sm btn-outline-secondary font-weight-semi-bold py-2 mr-3" style={{ width: "80px"}} onClick={() => navigate(`/news/edit/${news?._id}`)}>Edit</button>
												<button className="btn btn-primary font-weight-semi-bold py-2" style={{ width: "80px"}} onClick={() => onDeleteNews(news?._id)}>Delete</button>
											</div>
										)
									}
								</div>
								<div 
									className="d-flex align-items-center mt-2 cursor-pointer" 
									style={{ gap: "10px"}} 
									onClick={() => navigate(`/news/list/${news?.author._id}`)}              
								>
									<img src={ news?.author?.avatar ?? UserDefaultImg } alt="" style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "50%"}}/>
									<div className="d-flex flex-column user-info">
										<h5>{ news?.author.username }</h5>
										<span>{ news?.author?.email }</span>
									</div>
								</div>
								<div className="mt-3">
									<h3 className="mb-3">{ news?.title }</h3>
									<p style={{ whiteSpace: "pre-line" }}>{ news?.content }</p>
								</div>
							</div>
						</div>
						<CommentList comments={news?.comments ?? []} newsId={newsId} refetch={fetchNews}/>
						<CommentForm newsId={newsId} refetch={fetchNews}/>
					</div>
					<Tags />
				</div>
			</div>
		</div>
      
    </div>
  )
}

export default NewsDetail