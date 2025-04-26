import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getFeaturedNews } from '../../services/newsService';
import { useState, useEffect } from 'react';

const TopNews = () => {
    const navigate = useNavigate();
    const [newsList, setNewsList] = useState([]);

    const fetchFeaturedNews = async () => {
		try {
            const response = await getFeaturedNews({ page: 1, pageSize: 4});
            const fetchedUserNews = response.data;
            setNewsList(fetchedUserNews.slice(1, 4));
        } catch (error) {   
            console.log(error);
        }
	}

    useEffect(() => {
        fetchFeaturedNews();
    }, []);

  return (
    <div class="container-fluid py-3">
        <div class="container">
            <div class="d-flex position-relative w-100">
                <div className="row w-100">
                    {
                        newsList.map((news) => (
                            <div class="d-flex col-4" key={news?._id} onClick={() => navigate(`/news/detail/${news?._id}`)}>
                                <img src={ news?.thumbnail } style={{ width: "80px", height: "80px", objectFit: "cover" }} />
                                <div class="d-flex align-items-center bg-light px-3 w-100" style={{ height: "80px" }}>
                                    <a class="text-secondary font-weight-semi-bold" href="">{news?.title}</a>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default TopNews