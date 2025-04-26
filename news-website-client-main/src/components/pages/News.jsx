import React from 'react'
import UserDefaultImg from "../../assets/img/user.jpg"
import { formatDate } from '../../utilities/utils'
import { useNavigate } from 'react-router-dom'

const News = ({ news }) => {
    const navigate = useNavigate();

  return (
    <div class="position-relative mb-3 cursor-pointer">
        <img 
            src={ news.thumbnail ?? UserDefaultImg} 
            alt="thumbnail" 
            style={{ objectFit: "cover", height: "300px" }} 
            className="img-fluid w-100"
            onClick={() => navigate(`/news/detail/${news._id}`)}
        />
        <div class="overlay position-relative bg-light">
            
            <div className="mb-2" style={{ fontSize: "14px" }}>
                <a onClick={() => navigate(`/category/${news?.category}`)} className="text-capitalize cursor-pointer">{ news.category }</a>
                <span class="px-1">/</span>
                <span>{ formatDate(news?.createdAt) }</span>
            </div>
            <div 
                className="d-flex align-items-center mt-2 cursor-pointer" 
                style={{ gap: "10px"}}               
                onClick={() => navigate(`/news/list/${news?.author._id}`)}
            >
                <img src={ news?.author.avatar ?? UserDefaultImg } alt="" style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "50%"}} />
                <div className="d-flex flex-column user-info">
                    <h5>{ news?.author.username }</h5>
                    <span>{ news?.author.email }</span>
                </div>
            </div>
            <a className="h4 mt-3 line-clamp-3" 
                href=""            
                onClick={() => navigate(`/news/detail/${news._id}`)}
            > 
                { news?.title }
            </a>
            <p className="m-0 line-clamp-4" style={{ whiteSpace: "pre-line" }}>{ news?.content } </p>
            
        </div>
    </div>
    )
}

export default News