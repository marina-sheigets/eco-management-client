import React from 'react';
import FullEnterpriseStatistics from '../components/__templates__/FullEnterpriseStatistics';
import FullDepartmentStatistics from '../components/__templates__/FullDepartmentStatistics';
import PageWrapper from '../components/__templates__/PageWrapper';
import TextFieldsWrapper from '../components/__atoms__/TextFieldsWrapper';
import MonthlyConsumptionStatistics from '../components/__templates__/MonthlyConsumptionStatistics';

function TablesStatistics() {
	return (
		<PageWrapper>
			<TextFieldsWrapper>
				<FullEnterpriseStatistics />
				<FullDepartmentStatistics />
				<MonthlyConsumptionStatistics />
			</TextFieldsWrapper>
		</PageWrapper>
	);
}

export default TablesStatistics;
