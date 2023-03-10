import React from 'react';
import styled from 'styled-components';
import LeftSideBar from './LeftSideBar';

function PageWrapper({ children }: { children: React.ReactNode }) {
	return (
		<AppWrapper>
			<LeftSideBar />
			<Wrapper>{children}</Wrapper>
		</AppWrapper>
	);
}

const AppWrapper = styled('div')`
	display: flex;
	width: 100wh;
	height: 100vh;
`;
const Wrapper = styled('div')`
	padding: 2rem;
`;
export default PageWrapper;
