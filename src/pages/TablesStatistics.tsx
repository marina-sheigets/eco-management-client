import React from 'react';
import FullEnterpriseStatistics from '../components/__templates__/Lab1/FullEnterpriseStatistics';
import FullDepartmentStatistics from '../components/__templates__/Lab1/FullDepartmentStatistics';
import PageWrapper from '../components/__templates__/PageWrapper';
import TextFieldsWrapper from '../components/__atoms__/TextFieldsWrapper';
import MonthlyConsumptionStatistics from '../components/__templates__/MonthlyConsumptionStatistics';
import FullDepartmentStatisticsForOneYear from '../components/__templates__/Lab1/FullDepartmentStatisticsForOneYear';

function TablesStatistics() {
	return (
		<PageWrapper>
			<TextFieldsWrapper>
				<FullEnterpriseStatistics />
				<FullDepartmentStatistics />
				<FullDepartmentStatisticsForOneYear />
				<MonthlyConsumptionStatistics />
			</TextFieldsWrapper>
		</PageWrapper>
	);
}

export default TablesStatistics;
