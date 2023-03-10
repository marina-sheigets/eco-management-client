import React from 'react';
import styled from 'styled-components';
import PageWrapper from '../components/__templates__/PageWrapper';

function WelcomePage() {
	return (
		<PageWrapper>
			<Wrapper>Welcome to Dashboard!</Wrapper>
		</PageWrapper>
	);
}

const Wrapper = styled('div')`
	width: 100%;
	color: #0a6522;
	height: 100%;
	display: flex;
	flex: 1;
	font-size: 4rem;
	justify-content: center;
	align-items: center;
`;
export default WelcomePage;
