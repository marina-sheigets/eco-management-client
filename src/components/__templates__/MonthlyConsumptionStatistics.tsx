import {
	Accordion,
	AccordionSummary,
	CircularProgress,
	MenuItem,
	TextField,
	Tooltip,
	Typography,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RESOURCES } from '../../constants/costs';
import AccordionWrapper from '../__atoms__/AccordionWrapper';
import TextFieldsWrapper from '../__atoms__/TextFieldsWrapper';
import {
	getListOfEnterprisesAction,
	getListOfDepartmentsAction,
	getMonthlyConsumptionInfoAction,
} from '../../redux/api/ApiActions';
import {
	getFullEnterpriseInfoStatus,
	getListOfEnterprises,
	getListOfDepartments,
	getMonthlyConsumptionInfo,
} from '../../redux/selectors';
import { MONTHS } from '../../constants/months';
import ConsumptionTable from '../__molecules__/ConsumptionTable';

function MonthlyConsumptionStatistics() {
	const dispatch = useDispatch();

	const status = useSelector(getFullEnterpriseInfoStatus);
	const monthlyConsumptionInfo = useSelector(getMonthlyConsumptionInfo);
	const listOfEnterprises = useSelector(getListOfEnterprises);
	const listOfDepartments = useSelector(getListOfDepartments);

	const [month, setMonth] = useState('');
	const [enterprises, setEnterprises] = useState<{ id: string; name: string }[]>([]);
	const [enterpriseName, setEnterpriseName] = useState('');
	const [resource, setResource] = useState('');
	const [departments, setDepartments] = useState<{ id: string; name: string }[]>([]);
	const [departmentName, setDepartmentName] = useState('');

	const handleChangeDepartmentName = (e: React.ChangeEvent<HTMLInputElement>) =>
		setDepartmentName(e.target.value);

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
		if (departmentName && resource && month) {
			dispatch(
				getMonthlyConsumptionInfoAction.request({
					department: selectedDepartmentId,
					resource,
					month,
				})
			);
		}
	}, [month, resource, dispatch, departmentName, selectedDepartmentId]);

	return (
		<AccordionWrapper>
			<Accordion title='See daily consumption in department'>
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
					<ConsumptionTable data={monthlyConsumptionInfo} department={departmentName} />
				)}
			</Accordion>
		</AccordionWrapper>
	);
}

export default MonthlyConsumptionStatistics;
