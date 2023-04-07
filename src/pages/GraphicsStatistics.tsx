import React from 'react';
import styled from 'styled-components';
import DepartmentDiagram from '../components/__templates__/Lab3/DepartmentDiagram';
import FullEnterpriseDiagram from '../components/__templates__/Lab3/FullEnterpriseDiagram';
import PieDepartmentDiagram from '../components/__templates__/Lab3/PieDepartmentDiagram';
import PageWrapper from '../components/__templates__/PageWrapper';

function GraphicsStatistics() {
	return (
		<PageWrapper>
			<Wrapper>
				<FullEnterpriseDiagram />
				<DepartmentDiagram />
				<PieDepartmentDiagram />
			</Wrapper>
		</PageWrapper>
	);
}

const Wrapper = styled('div')`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;
export default GraphicsStatistics;
