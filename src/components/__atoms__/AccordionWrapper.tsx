import styled from 'styled-components';

const AccordionWrapper = styled('div')`
	.MuiCollapse-root.MuiCollapse-entered {
		padding: 1rem;
	}
	.MuiButtonBase-root.MuiAccordionSummary-root {
		border: 1px solid grey;
		min-height: 40px;
		border-radius: 4px;
	}
`;

export default AccordionWrapper;
