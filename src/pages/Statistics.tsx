/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PageWrapper from '../components/__templates__/PageWrapper';

function Statistics() {
	const navigate = useNavigate();
	return (
		<PageWrapper>
			<Wrapper>
				<div>
					<a href='' onClick={() => navigate('/tables')}>
						See tables
					</a>
				</div>
				<div>
					<a href='' onClick={() => navigate('/graphics')}>
						See graphics
					</a>
				</div>
			</Wrapper>
		</PageWrapper>
	);
}

const Wrapper = styled('div')`
	width: 100%;
`;
export default Statistics;
