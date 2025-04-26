import React, { useEffect, useState } from 'react'
import Tags from '../../components/pages/Tags';
import News from '../../components/pages/News';
import BriefNews from '../../components/pages/BriefNews';
import Paginator from '../../components/paginator/Paginator';
import { getLatestNews, searchNews } from '../../services/newsService';
import { useLocation } from 'react-router-dom';
import Loading from '../../components/loading/Loading';

const Search = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const keyword = queryParams.get('keyword');

    const [newsList, setNewsList] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	const fetchNews = async () => {
		try {
			setIsLoading(true);
            const response = await searchNews({
                keyword,
				page,
				pageSize: 10
			});
            const fetchedUserNews = response.data;
			setTotalPages(response.totalPages);
            setNewsList(fetchedUserNews)
        } catch (error) {   
            console.log(error);
        } finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		fetchNews();
	}, [page, keyword]);

	if (isLoading) {
		return (
			<div id='category'>
      			<Loading />
			</div>
		)
	}

  	return (
    	<div id="category">
      		<div className="container-fluid">
        		<div className="container">
					<nav className="breadcrumb bg-transparent m-0 p-0">
						<a className="breadcrumb-item" href="/home">Home</a>
						<a className="breadcrumb-item" href="#">News</a>
						<span className="breadcrumb-item text-capitalize active">Search</span>
					</nav>
				</div>
			</div>

			<div className="container-fluid py-3">
				<div className="container">
					<div className="row">
						<div className="col-lg-8">
							<div className="row">
								<div className="col-12">
									<div className="d-flex align-items-center justify-content-between bg-light py-2 px-4 mb-3">
										<h3 className="m-0">{`Search results for keyword: ${keyword}`}</h3>
									</div>
								</div>
								{ newsList.slice(0, 4).map((news) => (
									<div className="col-lg-6" key={news._id}>
										<News news={news}/>
									</div>
								))}
							</div>
							<div classNameName="row">
								{ newsList.slice(4, newsList.length).map((news) => (
									<div className="col-lg-6" key={news._id}>
										<BriefNews news={news}/>
									</div>
								))}
							</div>
							{
								newsList.length == 0 &&
								<h2>No news found</h2>
							}
							{
								newsList.length > 0 &&
								<div className="row">
									<div className="col-12">
										<Paginator currentPage={page} setCurrentPage={setPage} totalPages={totalPages}/>
									</div>
								</div>
							}
						</div>
						<Tags />
					</div>
				</div>
			</div>
		</div>
  	)
}

export default Search