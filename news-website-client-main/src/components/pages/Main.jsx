import TechnologyCategory from "../../assets/img/cat-500x80-2.jpg";
import BusinessCategory from "../../assets/img/news-700x435-1.jpg";
import EntertainmentCategory from "../../assets/img/cat-500x80-3.jpg";
import SportsCategory from "../../assets/img/cat-500x80-4.jpg";
import { useNavigate } from 'react-router-dom'
import { getFeaturedNews } from '../../services/newsService';
import { useEffect } from 'react';
import { useState } from 'react';
import { formatDate } from '../../utilities/utils';
import Loading from "../loading/Loading";

const Main = () => {
    const navigate = useNavigate();
    const [news, setNews] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const fetchFeaturedNews = async () => {
		try {
            setIsLoading(true);
            const response = await getFeaturedNews({ page: 1, pageSize: 1});
            const fetchedUserNews = response.data;
            setNews(fetchedUserNews[0]);
        } catch (error) {   
            console.log(error);
        } finally {
            setIsLoading(false);
        }
	}

    useEffect(() => {
        fetchFeaturedNews();
    }, [])

    if (isLoading) {
		return (
			<div id='main'>
      			<Loading />
			</div>
		)
	}

    return (
    <div class="container-fluid py-3">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <div class="owl-carousel owl-carousel-2 carousel-item-1 position-relative mb-3 mb-lg-0">
                        <div class="position-relative overflow-hidden" style={{ height: "435px" }} onClick={() => navigate(`/news/detail/${news?._id}`)}>
                            <img class="img-fluid h-100 w-100" src={news?.thumbnail} alt="news-banner" style={{ objectFit: "contain" }}/>
                            <div class="overlay">
                                <div class="mb-1">
                                    <a class="text-white text-capitalize" href="">{ news?.category }</a>
                                    <span class="px-2 text-white">/</span>
                                    <a class="text-white" href="">{ formatDate(news?.createdAt)} </a>
                                </div>
                                <a class="h2 m-0 text-white font-weight-bold" href="">{ news?.title }</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="d-flex align-items-center justify-content-between bg-light py-2 px-4 mb-3">
                        <h3 class="m-0">Categories</h3>
                        <a class="text-secondary font-weight-medium text-decoration-none" href="" onClick={() => navigate("/category/list")}>View All</a>
                    </div>
                    <div class="position-relative overflow-hidden mb-3" style={{ height: "80px" }} onClick={() => navigate("/category/business")}>
                        <img class="img-fluid w-100 h-100" src={BusinessCategory} style={{ objectFit: "cover" }} />
                        <a href="" class="overlay align-items-center justify-content-center h4 m-0 text-white text-decoration-none">
                            Business
                        </a>
                    </div>
                    <div class="position-relative overflow-hidden mb-3" style={{ height: "80px" }} onClick={() => navigate("/category/technology")}>
                        <img class="img-fluid w-100 h-100" src={TechnologyCategory} style={{ objectFit: "cover" }} />
                        <a href="" class="overlay align-items-center justify-content-center h4 m-0 text-white text-decoration-none">
                            Technology
                        </a>
                    </div>
                    <div class="position-relative overflow-hidden mb-3" style={{ height: "80px" }} onClick={() => navigate("/category/entertainment")}>
                        <img class="img-fluid w-100 h-100" src={EntertainmentCategory} style={{ objectFit: "cover" }} />
                        <a href="" class="overlay align-items-center justify-content-center h4 m-0 text-white text-decoration-none">
                            Entertainment
                        </a>
                    </div>
                    <div class="position-relative overflow-hidden" style={{ height: "80px" }} onClick={() => navigate("/category/sports")}>
                        <img class="img-fluid w-100 h-100" src={SportsCategory} style={{ objectFit: "cover" }} />
                        <a href="" class="overlay align-items-center justify-content-center h4 m-0 text-white text-decoration-none">
                            Sports
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Main