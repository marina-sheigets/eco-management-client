import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LINKS } from '../../constants/routing';

function LeftSideBar() {
	const [path, setPath] = useState('');
	const [currentPath, setCurrentPath] = useState<number>(0);
	const navigate = useNavigate();
	const handleSetPath = (value: string) => {
		setPath(value);
	};

	useEffect(() => {
		navigate(path);
	}, [path, navigate]);

	useEffect(() => {
		const url = window.location.pathname;
		const location = LINKS.find((link) => link.route === url);
		setCurrentPath(location?.id ?? 0);
	}, []);

	return (
		<Wrapper>
			<UL currentPath={currentPath}>
				{LINKS.map((item) => (
					<li
						key={item.id}
						onClick={() => {
							handleSetPath(item.route);
						}}>
						{item.name}
					</li>
				))}
			</UL>
		</Wrapper>
	);
}

const Wrapper = styled('div')`
	width: 300px;
	background: #0a6522;
	height: 100%;
	overflow-y: scroll;
`;

const UL = styled('ul')<{ currentPath: number }>`
	display: flex;
	flex-direction: column;
	justify-content: start;
	gap: 1.5rem;
	color: white;
	font-size: 1.2rem;
	li {
		cursor: pointer;
	}
	li: nth-child(${(props) => props.currentPath}) {
		color: yellow;
	}
`;
export default LeftSideBar;
