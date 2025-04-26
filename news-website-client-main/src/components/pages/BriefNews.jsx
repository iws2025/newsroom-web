import React from 'react'
import { formatDate } from '../../utilities/utils'
import { useNavigate } from 'react-router-dom';

const BriefNews = ({ news }) => {
  const navigate = useNavigate();

  return (
    <div className="d-flex mb-3" onClick={() => navigate(`/news/detail/${news?._id}`)}>
        <img src={news?.thumbnail} style={{ width: "100px", height: "100px", objectFit: "cover" }} />
        <div className="w-100 d-flex flex-column justify-content-center bg-light px-3" style={{ height: "100px" }}>
            <div className="mb-1" style={{ fontSize: "13px" }}>
                <a href="" classNameName="text-capitalize">{ news?.category }</a>
                <span className="px-1">/</span>
                <span>{ formatDate(news?.createdAt) }</span>
            </div>
            <a className="h6 m-0" href="">{ news?.title }</a>
        </div>
    </div>
  )
}

export default BriefNews