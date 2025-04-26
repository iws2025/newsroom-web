import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getNewsCategory } from '../../../services/newsService';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
	const navigate = useNavigate();
	const [categories, setCategories] = useState([]);

	const fetchNewsCategory = async () => {
        const response = await getNewsCategory();
        const categories = response.data;
        setCategories(categories);
    }
	useEffect(() => {
        fetchNewsCategory();
    }, []);

	return (
		<div className="container-fluid bg-light pt-5 px-sm-3 px-md-5">
			<div className="row">
				<div className="col-lg-3 col-md-6 mb-5">
				<a href="index.html" className="navbar-brand">
					<h1 className="mb-2 mt-n2 display-5 text-uppercase">
						<span className="text-primary">News</span>Room
					</h1>
				</a>
				<p>
				© 2025 Newsroom. All rights reserved.
				</p>
				<div className="d-flex justify-content-start mt-4">
					<a
						className="btn btn-outline-secondary text-center mr-2 px-0"
						style={{ width: 38, height: 38 }}
						href="https://x.com" target='_blank'
					>
						<i className="fab fa-twitter"></i>
					</a>
					<a
						className="btn btn-outline-secondary text-center mr-2 px-0"
						style={{ width: 38, height: 38 }}
						href="https://facebook.com" target='_blank'
					>
						<i className="fab fa-facebook-f"></i>
					</a>
					<a
						className="btn btn-outline-secondary text-center mr-2 px-0"
						style={{ width: 38, height: 38 }}
						href="https:/linkedin.com" target='_blank'
					>
						<i className="fab fa-linkedin-in"></i>
					</a>
					<a
						className="btn btn-outline-secondary text-center mr-2 px-0"
						style={{ width: 38, height: 38 }}
						href="https://instagram.com" target='_blank'
					>
						<i className="fab fa-instagram"></i>
					</a>
					<a
						className="btn btn-outline-secondary text-center mr-2 px-0"
						style={{ width: 38, height: 38 }}
						href="https://youtube.com" target='_blank'
					>
						<i className="fab fa-youtube"></i>
					</a>
				</div>
				</div>

				<div className="col-lg-3 col-md-6 mb-5">
					<h4 className="font-weight-bold mb-4">Categories</h4>
					<div className="d-flex flex-wrap m-n1">
						{categories.map((category, index) => (
							<a
								key={index}
								href="#"
								className="btn btn-sm btn-outline-secondary m-1 text-capitalize"
								onClick={() => navigate(`/category/${category}`)}
							>
								{category}
							</a>
						))}
					</div>
				</div>
				
				<div className="col-lg-3 col-md-6 mb-5">

				</div>

				<div className="col-lg-3 col-md-6 mb-5">
					<h4 className="font-weight-bold mb-4">Quick Links</h4>
					<div className="d-flex flex-column justify-content-start">
						{[
						'About',
						'Advertise',
						'Privacy & policy',
						'Terms & conditions',
						'Contact',
						].map((link, index) => (
						<a
							key={index}
							className="text-secondary mb-2"
							href="#"
						>
							<i className="fa fa-angle-right text-dark mr-2"></i>
							{link}
						</a>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
