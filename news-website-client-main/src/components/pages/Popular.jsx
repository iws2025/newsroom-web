import React from 'react'
import { getLatestNews } from '../../services/newsService';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utilities/utils';
import Loading from '../loading/Loading';

const Popular = () => {
    const navigate = useNavigate();
    const [newsList, setNewsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchLatestNews = async () => {
		try {
            setIsLoading(true);
            const response = await getLatestNews({ page: 1, pageSize: 4});
            const fetchedUserNews = response.data;
            setNewsList(fetchedUserNews);
        } catch (error) {   
            console.log(error);
        } finally {
            setIsLoading(false);
        }
	}

    useEffect(() => {
        fetchLatestNews();
    }, []);

    if (isLoading) {
		return (
			<div id='main'>
      			<Loading />
			</div>
		)
	}

    return (
        <div className="col-lg-8">
        <div className="row">
            <div className="col-12">
                <div className="d-flex align-items-center justify-content-between bg-light py-2 px-4 mb-3">
                    <h3 className="m-0">Latest</h3>
                    <a className="text-secondary font-weight-medium text-decoration-none" href="" onClick={() => navigate(`/latest`)}>View All</a>
                </div>
            </div>
            {
                newsList.map((news) => (
                    <div className="col-lg-6" key={news._id}>
                        <div className="position-relative mb-3">
                            <img className="img-fluid w-100" src={ news.thumbnail } alt="thumbnail" style={{ objectFit: "cover" }} onClick={() => navigate(`/news/detail/${news._id}`)}/>
                            <div className="overlay position-relative bg-light">
                                <div className="mb-2" style={{ fontSize: "14px" }}>
                                    <a href="" className='text-capitalize' onClick={() => navigate(`/category/${news.category}`)}>{ news.category }</a>
                                    <span className="px-1">/</span>
                                    <span>{ formatDate(news.createdAt )}</span>
                                </div>
                                <a className="h4 line-clamp-3" href="" onClick={() => navigate(`/news/detail/${news._id}`)}>{ news.title }</a>
                                <p className="m-0 line-clamp-4">{ news.content }</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Popular