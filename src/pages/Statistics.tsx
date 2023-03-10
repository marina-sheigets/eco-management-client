import React from 'react';
import styled from 'styled-components';
import CompleteStatisticsInCompany from '../components/__templates__/CompleteStatisticsInCompany';
import PageWrapper from '../components/__templates__/PageWrapper';

function Statistics() {
	return (
		<PageWrapper>
			<Wrapper>
				<CompleteStatisticsInCompany />
			</Wrapper>
		</PageWrapper>
	);
}

const Wrapper = styled('div')`
	width: 900px;
`;
export default Statistics;
