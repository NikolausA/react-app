import { Routes, Route } from 'react-router-dom';
import { Header } from './components';

import styled from 'styled-components';

const AppColomn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1000px;
	min-height: 100%;
	margin: 0 auto;
	background-color: #fff;
`;

const Content = styled.div`
	padding: 120px;
`;

const H1 = styled.h1`
	text-align: center;
`;

const Footer = () => <div>Footer</div>;

export const Blog = () => {
	return (
		<AppColomn>
			<Header />
			<Content>
				<h1>Learn React</h1>
				<Routes>
					<Route path="/" element={<div>Main Page</div>} />
					<Route path="/login" element={<div>Login Page</div>} />
					<Route path="/register" element={<div>Register Page</div>} />
					<Route path="/users" element={<div>Users Page</div>} />
					<Route path="/post" element={<div>New Post Page</div>} />
					<Route path="/post/:postId" element={<div>Post Page</div>} />
					<Route path="*" element={<div>404</div>} />
				</Routes>
			</Content>
			<Footer />
		</AppColomn>
	);
};
