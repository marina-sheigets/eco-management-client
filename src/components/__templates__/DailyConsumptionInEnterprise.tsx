import {
	Accordion,
	AccordionSummary,
	CircularProgress,
	MenuItem,
	TextField,
	Typography,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RESOURCES } from '../../constants/costs';
import { MONTHS } from '../../constants/months';
import {
	getListOfEnterprisesAction,
	getDailyConsumptionInEnterpriseAction,
} from '../../redux/api/ApiActions';
import {
	getFullEnterpriseInfoStatus,
	getListOfEnterprises,
	getDailyConsumptionInfoInEnterprise,
} from '../../redux/selectors';
import AccordionWrapper from '../__atoms__/AccordionWrapper';
import TextFieldsWrapper from '../__atoms__/TextFieldsWrapper';
import ConsumptionTable from '../__molecules__/ConsumptionTable';

function DailyConsumptionInEnterprise() {
	const dispatch = useDispatch();

	const status = useSelector(getFullEnterpriseInfoStatus);
	const dailyConsumptionInfoInEnterprise = useSelector(getDailyConsumptionInfoInEnterprise);
	const listOfEnterprises = useSelector(getListOfEnterprises);

	const [month, setMonth] = useState('');
	const [enterprises, setEnterprises] = useState<{ id: string; name: string }[]>([]);
	const [enterpriseName, setEnterpriseName] = useState('');
	const [resource, setResource] = useState('');

	const selectedEnterpriseId = useMemo(
		() => enterprises.find((item) => item.name === enterpriseName)?.id,
		[enterpriseName, enterprises]
	);
	useEffect(() => {
		setEnterprises(listOfEnterprises);
	}, [listOfEnterprises]);

	useEffect(() => {
		dispatch(getListOfEnterprisesAction.request());
	}, [dispatch]);

	useEffect(() => {
		if (selectedEnterpriseId && resource && month) {
			dispatch(
				getDailyConsumptionInEnterpriseAction.request({
					enterprise: selectedEnterpriseId,
					resource,
					month,
				})
			);
		}
	}, [month, resource, dispatch, selectedEnterpriseId]);

	return (
		<AccordionWrapper>
			<Accordion title='See daily consumption in enterprise'>
				<AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
					<Typography>See daily consumption statistics in enterprise</Typography>
				</AccordionSummary>
				<TextFieldsWrapper>
					<TextField
						fullWidth
						value={enterpriseName}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setEnterpriseName(e.target.value)
						}
						select
						color='primary'
						size='small'
						label='Select enterprise'>
						{enterprises.map((enterprise: any) => (
							<MenuItem key={enterprise.id} value={enterprise.name}>
								{enterprise.name}
							</MenuItem>
						))}
					</TextField>

					<TextField
						fullWidth
						value={resource}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setResource(e.target.value)
						}
						select
						color='primary'
						size='small'
						label='Select resource or fuel'>
						{RESOURCES.map((item: any) => (
							<MenuItem key={item} value={item}>
								{item}
							</MenuItem>
						))}
					</TextField>
					<TextField
						fullWidth
						value={month}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setMonth(e.target.value)
						}
						select
						color='primary'
						size='small'
						label='Select month'>
						{MONTHS.map((item: string) => (
							<MenuItem key={item} value={item}>
								{item}
							</MenuItem>
						))}
					</TextField>
				</TextFieldsWrapper>
				{status === 'Import' ? (
					<CircularProgress />
				) : (
					<ConsumptionTable
						data={dailyConsumptionInfoInEnterprise}
						department={enterpriseName}
					/>
				)}
			</Accordion>
		</AccordionWrapper>
	);
}

export default DailyConsumptionInEnterprise;
