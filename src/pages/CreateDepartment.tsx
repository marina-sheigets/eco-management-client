import { Button, MenuItem, TextField } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import StatusAlert from '../components/__molecules__/StatusAlert';
import PageWrapper from '../components/__templates__/PageWrapper';
import {
	clearDepartmentStatusMessageAction,
	createDepartmentAction,
	getListOfEnterprisesAction,
} from '../redux/api/ApiActions';
import { getDepartmentStatus, getListOfEnterprises } from '../redux/selectors';

function CreateDepartment() {
	const dispatch = useDispatch();

	const status = useSelector(getDepartmentStatus);

	const listOfEnterprises = useSelector(getListOfEnterprises);
	const [enterprises, setEnterprises] = useState([]);
	const [name, setName] = useState('');
	const [enterpriseName, setEnterpriseName] = useState('');

	const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);

	useEffect(() => {
		setEnterprises(listOfEnterprises);
	}, [listOfEnterprises]);

	const isAllCompleted = useMemo(
		() => name.trim().length && enterpriseName.trim().length,
		[name, enterpriseName]
	);

	const severity = useMemo(
		() => (status.includes('successfully') ? 'success' : 'error'),

		[status]
	);

	const handleCloseStatusMessage = () => {
		dispatch(clearDepartmentStatusMessageAction.request());
	};

	const handleChangeEnterpriseName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEnterpriseName(e.target.value);
	};
	const handleCreateDepartment = () => {
		dispatch(createDepartmentAction.request({ enterpriseName, departmentName: name }));
	};

	useEffect(() => {
		if (severity === 'success') {
			setName('');
			setEnterpriseName('');
		}
	}, [severity]);

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
					label='Select enterprise'
					fullWidth>
					{enterprises.map((enterprise: any) => (
						<MenuItem key={enterprise.id} value={enterprise.name}>
							{enterprise.name}
						</MenuItem>
					))}
				</TextField>
				<TextField
					value={name}
					onChange={handleChangeName}
					size='small'
					label='Enter name of department'
				/>
				<Button
					color='success'
					variant='contained'
					disabled={!isAllCompleted}
					onClick={handleCreateDepartment}>
					Create
				</Button>
			</Wrapper>
			<StatusAlert
				status={status}
				severity={severity}
				handleCloseStatusMessage={handleCloseStatusMessage}
			/>
		</PageWrapper>
	);
}

const Wrapper = styled('div')`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;
export default CreateDepartment;
