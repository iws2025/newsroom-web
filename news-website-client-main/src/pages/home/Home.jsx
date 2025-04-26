import React from 'react'
import TopNews from '../../components/pages/TopNews';
import Main from '../../components/pages/Main';
import Featured from '../../components/pages/Featured';
import Popular from '../../components/pages/Popular';
import Tags from '../../components/pages/Tags';


const Home = () => {
	return (
		<div id="home">
			{/* Breadcrumb Start */}
			<div className="container-fluid">
				<div className="container">
					<nav className="breadcrumb bg-transparent m-0 p-0">
						<a className="breadcrumb-item active" href="#">Home</a>
					</nav>
				</div>
			</div>
			{/* Breadcrumb End */}

			<TopNews />
			<Main />
			<Featured />

			<div className="container-fluid py-3">
				<div className="container">
					<div className="row">
						<Popular />
						<Tags />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home