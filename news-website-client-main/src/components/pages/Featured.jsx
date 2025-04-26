import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getFeaturedNews } from '../../services/newsService';
import { useState, useEffect } from 'react';
import { formatDate } from '../../utilities/utils';
import Loading from '../loading/Loading';

const Featured = () => {
    const navigate = useNavigate();
    const [newsList, setNewsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchFeaturedNews = async () => {
		try {
            setIsLoading(true);
            const response = await getFeaturedNews({ page: 1, pageSize: 4 });
            const fetchedUserNews = response.data;
            setNewsList(fetchedUserNews);
        } catch (error) {   
            console.log(error);
        } finally {
            setIsLoading(false);
        }
	}

    useEffect(() => {
        fetchFeaturedNews();
    }, []);

    if (isLoading) {
		return (
			<div id='featured'>
      			<Loading />
			</div>
		)
	}

  return (
    <div className="container-fluid py-3">
        <div className="container">
            <div className="d-flex align-items-center justify-content-between bg-light py-2 px-4 mb-3">
                <h3 className="m-0">Featured</h3>
            </div>
            <div className="d-flex position-relative" style={{ gap: "20px" }}>
                { newsList.map((news) => (
                    <div className="position-relative overflow-hidden" style={{ height: "300px", flex: 1 }} key={news?._id} onClick={() => navigate(`/news/detail/${news._id}`)}>
                        <img className="img-fluid w-100 h-100" src={ news?.thumbnail } alt="thumbnail" style={{ objectFit: "cover" }} />
                        <div className="overlay">
                            <div className="mb-1" style={{ fontSize: "13px" }}>
                                <a className="text-white text-capitalize" href="">{ news?.category }</a>
                                <span className="px-1 text-white">/</span>
                                <a className="text-white" href="">{ formatDate(news?.createdAt )}</a>
                            </div>
                            <a className="h4 m-0 text-white" href="">{ news?.title }</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Featured