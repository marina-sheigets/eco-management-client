import React, { useState, useEffect, useMemo } from 'react';
import { Button, MenuItem, TextField, Tooltip, Typography } from '@mui/material';
import PageWrapper from '../components/__templates__/PageWrapper';
import { useDispatch, useSelector } from 'react-redux';
import {
	getListOfDepartments,
	getListOfEnterprises,
	getWorkingDaysStatus,
} from '../redux/selectors';
import { MONTHS } from '../constants/months';
import StatusAlert from '../components/__molecules__/StatusAlert';
import { YEARS } from '../constants/years';
import {
	clearWorkingDaysStatusAction,
	createWorkingDaysAction,
	getListOfDepartmentsAction,
	getListOfEnterprisesAction,
} from '../redux/api/ApiActions';
import styled from 'styled-components';

function CreateWorkingDays() {
	const dispatch = useDispatch();

	const status = useSelector(getWorkingDaysStatus);
	const listOfEnterprises = useSelector(getListOfEnterprises);
	const listOfDepartments = useSelector(getListOfDepartments);

	const [enterprises, setEnterprises] = useState<{ id: string; name: string }[]>([]);

	const [enterpriseName, setEnterpriseName] = useState('');

	const [departments, setDepartments] = useState([]);
	const [departmentName, setDepartmentName] = useState('');
	const [year, setYear] = useState('');
	const [monthsValues, setMonthsValues] = useState<
		{ id: number; month: string; value: string }[]
	>([]);
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

	const handleChangeMonth = (
		e: React.ChangeEvent<HTMLInputElement>,
		item: { id: number; month: string; value: string }
	) => {
		const { id } = item;

		const newArr = monthsValues.map((item) => {
			if (item.id === id) {
				return {
					...item,
					value: e.target.value,
				};
			}
			return item;
		});
		setMonthsValues(newArr);
	};

	const handleCreateWorkingDays = () => {
		dispatch(
			createWorkingDaysAction.request({
				enterprise: enterpriseName,
				department: departmentName,
				year,
				days: monthsValues,
			})
		);
	};

	const handleCloseStatusMessage = () => {
		dispatch(clearWorkingDaysStatusAction.request());
	};
	const isAllCompleted = useMemo(
		() => enterpriseName && departmentName && year,
		[enterpriseName, departmentName, year]
	);
	const severity = useMemo(() => (status.includes('Success') ? 'success' : 'error'), [status]);
	useEffect(() => {
		setEnterprises(listOfEnterprises);
	}, [listOfEnterprises]);

	useEffect(() => {
		setDepartments(listOfDepartments);
	}, [listOfDepartments]);

	useEffect(() => {
		const monthArr: { id: number; month: string; value: string }[] = [];
		MONTHS.forEach((month, index) => {
			monthArr.push({ id: index, month: month, value: '' });
		});
		setMonthsValues(monthArr);
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
					fullWidth
					size='small'
					select
					value={year}
					type='number'
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setYear(e.target.value)}
					label='Select year'>
					{YEARS.map((value: number) => (
						<MenuItem value={value} key={value}>
							{value}
						</MenuItem>
					))}
				</TextField>

				<Typography>
					Enter the amount of working days on each month. Empty month`s value will
					automatically equal 0.
				</Typography>
				<YearsRange>
					{monthsValues.map((item: { id: number; month: string; value: string }) => {
						return (
							<YearBox key={item.id}>
								<Typography>{item.month}</Typography>
								<TextField
									fullWidth
									size='small'
									value={item.value}
									type='number'
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										handleChangeMonth(e, item)
									}
								/>
							</YearBox>
						);
					})}
				</YearsRange>
				<div>
					<Button
						variant='contained'
						disabled={!isAllCompleted}
						onClick={handleCreateWorkingDays}>
						Complete
					</Button>

					<StatusAlert
						status={status}
						severity={severity}
						handleCloseStatusMessage={handleCloseStatusMessage}
					/>
				</div>
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
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

const YearsRange = styled('div')`
	display: grid;
	gap: 1rem;
	grid-template-rows: repeat(3, 1fr);
	grid-template-columns: repeat(4, 1fr);

	width: 900px;
`;

export default CreateWorkingDays;
