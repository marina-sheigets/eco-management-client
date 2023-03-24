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
import { RESOURCES, TYPES } from '../../../constants/costs';
import { MONTHS } from '../../../constants/months';
import {
	getListOfEnterprisesAction,
	getFullEnterpriseInfoByResourceAction,
} from '../../../redux/api/ApiActions';
import {
	getFullEnterpriseInfoStatus,
	getFullEnterpriseInfo,
	getListOfEnterprises,
} from '../../../redux/selectors';
import AccordionWrapper from '../../__atoms__/AccordionWrapper';
import TextFieldsWrapper from '../../__atoms__/TextFieldsWrapper';
import StatisticsTable from '../FullStatisticsTable';

function FullEnterpriseStatistics() {
	const dispatch = useDispatch();
	const status = useSelector(getFullEnterpriseInfoStatus);
	const fullEnterpriseInfo = useSelector(getFullEnterpriseInfo);
	const listOfEnterprises = useSelector(getListOfEnterprises);
	const [data, setData] = useState<{ year: number; values: { [month: string]: number } }[]>([]);
	const [enterprises, setEnterprises] = useState<{ id: string; name: string }[]>([]);
	const [enterpriseName, setEnterpriseName] = useState('');
	const [resource, setResource] = useState('');
	const [type, setType] = useState('');

	const selectedEnterpriseId = useMemo(
		() => enterprises.find((item) => item.name === enterpriseName)?.id,
		[enterpriseName, enterprises]
	);
	useEffect(() => {
		setEnterprises(listOfEnterprises);
	}, [listOfEnterprises]);

	useEffect(() => {
		if (fullEnterpriseInfo.length) {
			const data = fullEnterpriseInfo.map(
				(item: { year: number; values: { [month: string]: number } }) => {
					const modifiedValues = Object.fromEntries(
						Object.entries(item.values).map(([key, value]) => {
							if (MONTHS.includes(key)) {
								return [key, value.toFixed(1)];
							}
							return [key, value];
						})
					);
					return { ...item, values: modifiedValues };
				}
			);
			console.log(data);
			setData(data);
		}
	}, [fullEnterpriseInfo]);
	useEffect(() => {
		dispatch(getListOfEnterprisesAction.request());
	}, [dispatch]);

	useEffect(() => {
		if (enterpriseName && resource && type) {
			dispatch(
				getFullEnterpriseInfoByResourceAction.request({
					enterprise: selectedEnterpriseId,
					resource,
					type,
				})
			);
		}
	}, [enterpriseName, type, resource, dispatch, selectedEnterpriseId]);

	return (
		<AccordionWrapper>
			<Accordion title='See full statistics in enterprise'>
				<AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
					<Typography>See whole statistics in enterprise</Typography>
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
						value={type}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setType(e.target.value)
						}
						select
						color='primary'
						size='small'
						label='Select type'>
						{TYPES.map((type: any) => (
							<MenuItem key={type} value={type}>
								{type}
							</MenuItem>
						))}
					</TextField>
				</TextFieldsWrapper>
				{status === 'Import' ? (
					<CircularProgress />
				) : (
					<StatisticsTable data={data} structureName={enterpriseName} />
				)}
			</Accordion>
		</AccordionWrapper>
	);
}

export default FullEnterpriseStatistics;
