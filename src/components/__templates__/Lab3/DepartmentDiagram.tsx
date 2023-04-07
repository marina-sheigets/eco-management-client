import {
	Accordion,
	AccordionSummary,
	MenuItem,
	TextField,
	Tooltip,
	Typography,
} from '@mui/material';
import { Chart as ChartJS, registerables } from 'chart.js';
import React, { useEffect, useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RESOURCES, TYPES } from '../../../constants/costs';
import { MONTHS } from '../../../constants/months';
import {
	getFullDepartmentInfoAction,
	getListOfDepartmentsAction,
	getListOfEnterprisesAction,
} from '../../../redux/api/ApiActions';
import {
	getFullDepartmentInfo,
	getListOfDepartments,
	getListOfEnterprises,
} from '../../../redux/selectors';
import AccordionWrapper from '../../__atoms__/AccordionWrapper';
import TextFieldsWrapper from '../../__atoms__/TextFieldsWrapper';

ChartJS.register(...registerables);

function DepartmentDiagram() {
	const dispatch = useDispatch();

	const fullDepartmentInfo = useSelector(getFullDepartmentInfo);
	const listOfEnterprises = useSelector(getListOfEnterprises);
	const listOfDepartments = useSelector(getListOfDepartments);

	const [enterprises, setEnterprises] = useState<{ id: string; name: string }[]>([]);
	const [enterpriseName, setEnterpriseName] = useState('');
	const [resource, setResource] = useState('');
	const [type, setType] = useState('');
	const [departments, setDepartments] = useState<{ id: string; name: string }[]>([]);
	const [departmentName, setDepartmentName] = useState('');
	const [chartData, setChartData] = useState<{ label: string; data: number[] }[]>([]);

	const handleChangeDepartmentName = (e: React.ChangeEvent<HTMLInputElement>) =>
		setDepartmentName(e.target.value);

	const selectedEnterpriseId = useMemo(
		() => enterprises.find((item) => item.name === enterpriseName)?.id,
		[enterpriseName, enterprises]
	);

	const selectedDepartmentId = useMemo(
		() => departments.find((item) => item.name === departmentName)?.id,
		[departmentName, departments]
	);

	useEffect(() => {
		setEnterprises(listOfEnterprises);
	}, [listOfEnterprises]);

	useEffect(() => {
		setDepartments(listOfDepartments);
	}, [listOfDepartments]);

	useEffect(() => {
		if (enterpriseName.length) {
			const elem = enterprises.find((item) => item.name === enterpriseName);
			dispatch(getListOfDepartmentsAction.request({ id: elem?.id }));
		}
	}, [enterpriseName, dispatch, enterprises]);

	useEffect(() => {
		dispatch(getListOfEnterprisesAction.request());
	}, [dispatch]);

	useEffect(() => {
		if (enterpriseName && selectedDepartmentId && resource && type) {
			dispatch(
				getFullDepartmentInfoAction.request({
					department: selectedDepartmentId,
					enterprise: selectedEnterpriseId,
					resource,
					type,
				})
			);
		}
	}, [enterpriseName, type, resource, dispatch, selectedEnterpriseId, selectedDepartmentId]);

	useEffect(() => {
		if (fullDepartmentInfo.length) {
			let array: { label: string; data: number[] }[] = [];
			fullDepartmentInfo.forEach(
				(item: { year: number; values: { [month: string]: number } }) => {
					array.push({ label: item.year.toString(), data: Object.values(item.values) });
				}
			);
			setChartData(array);
		}
	}, [fullDepartmentInfo]);
	return (
		<AccordionWrapper>
			<Accordion>
				<AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
					<Typography>See full statistics in department</Typography>
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
					{enterpriseName ? (
						<TextField
							value={departmentName}
							onChange={handleChangeDepartmentName}
							select
							color='primary'
							size='small'
							label='Select department'>
							{departments.map((department: any) => (
								<MenuItem key={department.id} value={department.name}>
									{department.name}
								</MenuItem>
							))}
						</TextField>
					) : (
						<Tooltip title='Select enterprise at first'>
							<TextField
								disabled
								value={''}
								onChange={() => {}}
								select
								color='primary'
								size='small'
								label='Select department'
								fullWidth></TextField>
						</Tooltip>
					)}
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
					{fullDepartmentInfo.length ? (
						<Line
							data={{
								labels: MONTHS,
								datasets: chartData,
							}}
						/>
					) : null}
				</Wrapper>
			</Accordion>
		</AccordionWrapper>
	);
}

const Wrapper = styled('div')`
	width: 1000px;
	height: 600px;
`;
export default DepartmentDiagram;
