import { Button, MenuItem, TextField, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import StatusAlert from '../components/__molecules__/StatusAlert';
import PageWrapper from '../components/__templates__/PageWrapper';
import { TYPES_OF_COSTS } from '../constants/costs';
import { YEARS } from '../constants/years';
import {
	getListOfEnterprisesAction,
	getListOfDepartmentsAction,
	createCostsAction,
	clearCostsStatusAction,
} from '../redux/api/ApiActions';
import { getListOfEnterprises, getListOfDepartments, getCostsStatus } from '../redux/selectors';

function CreateCosts() {
	const dispatch = useDispatch();
	const listOfEnterprises = useSelector(getListOfEnterprises);
	const listOfDepartments = useSelector(getListOfDepartments);
	const status = useSelector(getCostsStatus);
	const [enterprises, setEnterprises] = useState<{ id: string; name: string }[]>([]);
	const [enterpriseName, setEnterpriseName] = useState('');

	const [departments, setDepartments] = useState([]);
	const [departmentName, setDepartmentName] = useState('');
	const [startYear, setStartYear] = useState('');
	const [endYear, setEndYear] = useState('');
	const [typeOfCosts, setTypeOfCosts] = useState('');
	const [yearsInterval, setYearsInterval] = useState<{ year: number; value: string }[]>([]);
	const [isEditingMode, setIsEditingMode] = useState(false);
	const [error, setError] = useState('');

	const handleChangeEnterpriseName = (e: React.ChangeEvent<HTMLInputElement>) =>
		setEnterpriseName(e.target.value);

	const handleChangeDepartmentName = (e: React.ChangeEvent<HTMLInputElement>) =>
		setDepartmentName(e.target.value);

	useEffect(() => {
		if (enterpriseName.length) {
			const elem = enterprises.find((item) => item.name === enterpriseName);
			dispatch(getListOfDepartmentsAction.request({ id: elem?.id }));
		}
	}, [enterpriseName, dispatch, enterprises]);

	useEffect(() => {
		if (endYear && startYear) {
			if (startYear > endYear) {
				setError('Start year should be less than end year');
				return;
			}
			setError('');

			const arr = [];
			for (let i = +startYear; i <= +endYear; i++) {
				arr.push({ year: i, value: '' });
			}
			setYearsInterval(arr);
		} else {
			setIsEditingMode(false);
		}
	}, [startYear, endYear]);

	const handleChangeYear = (
		e: React.ChangeEvent<HTMLInputElement>,
		item: { year: number; value: string }
	) => {
		const { year } = item;

		const newArr = yearsInterval.map((item) => {
			if (item.year === year) {
				return {
					...item,
					value: e.target.value,
				};
			}
			return item;
		});
		setYearsInterval(newArr);
		console.log(newArr);
	};

	const handleCreateCosts = () => {
		dispatch(
			createCostsAction.request({
				enterprise: enterpriseName,
				department: departmentName,
				type: typeOfCosts,
				costs: yearsInterval,
			})
		);
	};

	const handleCloseStatusMessage = () => {
		dispatch(clearCostsStatusAction.request());
	};
	const isAllCompleted = useMemo(
		() => !error.length && enterpriseName && departmentName,
		[error, enterpriseName, departmentName]
	);
	const severity = useMemo(() => (status.includes('Success') ? 'success' : 'error'), [status]);
	useEffect(() => {
		setEnterprises(listOfEnterprises);
	}, [listOfEnterprises]);

	useEffect(() => {
		setDepartments(listOfDepartments);
	}, [listOfDepartments]);

	useEffect(() => {
		dispatch(getListOfEnterprisesAction.request());
	}, [dispatch]);

	return (
		<PageWrapper>
			<Wrapper>
				<TextField
					value={enterpriseName}
					onChange={handleChangeEnterpriseName}
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
							disabled={!enterpriseName}
							value={departmentName}
							onChange={handleChangeDepartmentName}
							select
							color='primary'
							size='small'
							label='Select department'
							fullWidth>
							{departments.map((department: any) => (
								<MenuItem key={department.id} value={department.name}>
									{department.name}
								</MenuItem>
							))}
						</TextField>
					</Tooltip>
				)}
				<TextField
					value={typeOfCosts}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setTypeOfCosts(e.target.value)
					}
					select
					color='primary'
					size='small'
					label='Select type'>
					{TYPES_OF_COSTS.map((type: any) => (
						<MenuItem key={type} value={type}>
							{type}
						</MenuItem>
					))}
				</TextField>
				<Typography>Select interval</Typography>
				<Interval>
					<TextField
						fullWidth
						size='small'
						select
						value={startYear}
						type='number'
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setStartYear(e.target.value)
						}
						label='Enter start year'>
						{YEARS.map((value: number) => (
							<MenuItem value={value} key={value}>
								{value}
							</MenuItem>
						))}
					</TextField>
					<TextField
						fullWidth
						size='small'
						select
						type='number'
						value={endYear}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setEndYear(e.target.value)
						}
						label='Enter end year'>
						{YEARS.map((year: number) => (
							<MenuItem value={year} key={year}>
								{year}
							</MenuItem>
						))}
					</TextField>
				</Interval>
				{!isEditingMode ? (
					<Button
						onClick={() => setIsEditingMode(true)}
						disabled={!!error || !startYear || !endYear}>
						Open Editing Mode
					</Button>
				) : (
					<>
						<Typography>
							Enter value in UAH. Empty cells will automatically equal 0.
						</Typography>
						<YearsRange>
							{yearsInterval.map((item: { year: number; value: string }) => {
								return (
									<YearBox>
										<Typography>{item.year}</Typography>
										<TextField
											fullWidth
											size='small'
											value={item.value}
											type='number'
											onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
												handleChangeYear(e, item)
											}
										/>
									</YearBox>
								);
							})}
						</YearsRange>
						<div>
							{error ? (
								<Tooltip title={error}>
									<Button disabled>Complete</Button>
								</Tooltip>
							) : (
								<Button
									variant='contained'
									disabled={!isAllCompleted}
									onClick={handleCreateCosts}>
									Complete
								</Button>
							)}
							<StatusAlert
								status={status}
								severity={severity}
								handleCloseStatusMessage={handleCloseStatusMessage}
							/>
						</div>
					</>
				)}
			</Wrapper>
		</PageWrapper>
	);
}

const Wrapper = styled('div')`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

const YearBox = styled('div')`
	width: 100px;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;
const Interval = styled('div')`
	display: flex;
	gap: 1rem;
	width: 350px;
`;

const YearsRange = styled('div')`
	display: flex;
	gap: 1rem;
	padding: 6px 1rem;
	width: 900px;
	flex-wrap: wrap;
`;

export default CreateCosts;
