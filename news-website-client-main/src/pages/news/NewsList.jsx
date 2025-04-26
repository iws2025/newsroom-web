import React, { useEffect, useState } from 'react'
import News from '../../components/pages/News'
import { useParams } from 'react-router-dom';
import { getNewsOfUser } from '../../services/newsService';
import { getProfile } from '../../services/userService';
import Paginator from '../../components/paginator/Paginator';
import Loading from '../../components/loading/Loading';

const NewsList = () => {
	const { userId } = useParams();
	const [user, setUser] = useState({});
	const [newsList, setNewsList] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [isLoading, setIsLoading] = useState(false);

	const fetchUserNews = async () => {
		try {
			setIsLoading(true);
            const response = await getNewsOfUser({
				userId,
				page,
				pageSize: 9
			});
            const fetchedUserNews = response.data;
            setNewsList(fetchedUserNews);
			setTotalPages(response.totalPages);
        } catch (error) {   
            console.log(error);
        } finally {
			setIsLoading(false);
		}
	}

	const fetchUser = async () => {
		try {
			const response = await getProfile(userId);
			setUser(response.data);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchUser();
		fetchUserNews();
	}, [])

	if (isLoading) {
		return (
			<div id='news-list'>
      			<Loading />
			</div>
		)
	}

  return (
    <div id="news-list">
      	<div class="container-fluid">
        	<div class="container">
				<nav class="breadcrumb bg-transparent m-0 p-0">
					<a class="breadcrumb-item" href="/home">Home</a>
					<a class="breadcrumb-item" href="#">News</a>
					<span class="breadcrumb-item active">{ user?.username ?? ""}</span>
				</nav>
			</div>
		</div>

		<div class="container-fluid py-3">
			<div class="container">
				<div class="row">
					<div className="col-lg-12">
						<div className="row">
							{ newsList.map((news) => (
								<div class="col-lg-4" key={news._id}>
									<News news={news}/>
								</div>
							))}
						</div>
					</div>
					<div class="col-12">
						<Paginator currentPage={page} setCurrentPage={setPage} totalPages={totalPages}/>
					</div>
				</div>
			</div>
		</div>
    </div>
  )
}

export default NewsList