import React, { useEffect, useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import styled from 'styled-components';
import AccordionWrapper from '../../__atoms__/AccordionWrapper';
import { Accordion, AccordionSummary, MenuItem, TextField, Typography } from '@mui/material';
import TextFieldsWrapper from '../../__atoms__/TextFieldsWrapper';
import { RESOURCES, TYPES } from '../../../constants/costs';
import { getFullEnterpriseInfo, getListOfEnterprises } from '../../../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import {
	getFullEnterpriseInfoByResourceAction,
	getListOfEnterprisesAction,
} from '../../../redux/api/ApiActions';
import { YEARS } from '../../../constants/years';
ChartJS.register(...registerables);

function FullEnterpriseDiagram() {
	const dispatch = useDispatch();

	const fullEnterpriseInfo = useSelector(getFullEnterpriseInfo);
	const listOfEnterprises = useSelector(getListOfEnterprises);

	const [enterprises, setEnterprises] = useState<{ id: string; name: string }[]>([]);
	const [enterpriseName, setEnterpriseName] = useState('');
	const [resource, setResource] = useState('');
	const [type, setType] = useState('');
	const [chartData, setChartData] = useState<number[]>([]);
	const selectedEnterpriseId = useMemo(
		() => enterprises.find((item) => item.name === enterpriseName)?.id,
		[enterpriseName, enterprises]
	);

	useEffect(() => {
		const data: number[] = [];
		fullEnterpriseInfo.forEach(
			(item: { year: number; values: { [month: string]: number } }) => {
				const totalCostForYear = Object.values(item.values).reduce((a, b) => a + b, 0);

				data.push(totalCostForYear);
			}
		);
		setChartData(data);
	}, [fullEnterpriseInfo]);

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

	useEffect(() => {
		setEnterprises(listOfEnterprises);
	}, [listOfEnterprises]);

	useEffect(() => {
		dispatch(getListOfEnterprisesAction.request());
	}, [dispatch]);

	return (
		<AccordionWrapper>
			<Accordion>
				<AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
					<Typography>See total enterprise statistics</Typography>
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
				<Wrapper>
					{chartData.length ? (
						<Line
							data={{
								labels: YEARS,
								datasets: [{ label: enterpriseName, data: chartData }],
							}}
						/>
					) : null}
				</Wrapper>
			</Accordion>
		</AccordionWrapper>
	);
}

const Wrapper = styled('div')`
	width: 700px;
`;

export default FullEnterpriseDiagram;
