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
import { RESOURCES, TYPES } from '../../../constants/costs';
import {
	getListOfEnterprisesAction,
	getListOfDepartmentsAction,
	getFullDepartmentInfoAction,
} from '../../../redux/api/ApiActions';
import {
	getFullEnterpriseInfoStatus,
	getFullDepartmentInfo,
	getListOfEnterprises,
	getListOfDepartments,
} from '../../../redux/selectors';
import AccordionWrapper from '../../__atoms__/AccordionWrapper';
import TextFieldsWrapper from '../../__atoms__/TextFieldsWrapper';
import StatisticsTable from '../FullStatisticsTable';

function FullDepartmentStatistics() {
	const dispatch = useDispatch();

	const status = useSelector(getFullEnterpriseInfoStatus);
	const fullDepartmentInfo = useSelector(getFullDepartmentInfo);
	const listOfEnterprises = useSelector(getListOfEnterprises);
	const listOfDepartments = useSelector(getListOfDepartments);

	const [enterprises, setEnterprises] = useState<{ id: string; name: string }[]>([]);
	const [enterpriseName, setEnterpriseName] = useState('');
	const [resource, setResource] = useState('');
	const [type, setType] = useState('');
	const [departments, setDepartments] = useState<{ id: string; name: string }[]>([]);
	const [departmentName, setDepartmentName] = useState('');

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

	return (
		<AccordionWrapper>
			<Accordion title='See full statistics in department'>
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
				{status === 'Import' ? (
					<CircularProgress />
				) : (
					<StatisticsTable data={fullDepartmentInfo} structureName={departmentName} />
				)}
			</Accordion>
		</AccordionWrapper>
	);
}

export default FullDepartmentStatistics;
