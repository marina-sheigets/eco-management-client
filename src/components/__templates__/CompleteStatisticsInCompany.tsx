import { Accordion, AccordionSummary, MenuItem, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getListOfEnterprisesAction,
	getAllEnterpriseStatisticsAction,
} from '../../redux/api/ApiActions';
import { getEnterpriseStatus, getListOfEnterprises } from '../../redux/selectors';
import AccordionWrapper from '../__atoms__/AccordionWrapper';

function CompleteStatisticsInCompany() {
	const dispatch = useDispatch();
	const status = useSelector(getEnterpriseStatus);
	const listOfEnterprises = useSelector(getListOfEnterprises);
	const [enterprises, setEnterprises] = useState<{ id: string; name: string }[]>([]);
	const [enterpriseName, setEnterpriseName] = useState('');

	useEffect(() => {
		setEnterprises(listOfEnterprises);
	}, [listOfEnterprises]);

	useEffect(() => {
		dispatch(getListOfEnterprisesAction.request());
	}, [dispatch]);

	useEffect(() => {
		if (enterpriseName) {
			dispatch(getAllEnterpriseStatisticsAction.request({ enterprise: enterpriseName }));
		}
	}, [enterpriseName, dispatch]);
	return (
		<AccordionWrapper>
			<Accordion title='See whole statistics in enterprise'>
				<AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
					<Typography>See whole statistics in enterprise</Typography>
				</AccordionSummary>
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
			</Accordion>
		</AccordionWrapper>
	);
}

export default CompleteStatisticsInCompany;
