import { Button, CircularProgress, TextField } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import StatusAlert from '../components/__molecules__/StatusAlert';
import PageWrapper from '../components/__templates__/PageWrapper';
import {
	createEnterpriseAction,
	clearEnterpriseStatusMessageAction,
} from '../redux/api/ApiActions';
import { getEnterpriseStatus } from '../redux/selectors';

function CreateEnterprise() {
	const dispatch = useDispatch();

	const status = useSelector(getEnterpriseStatus);
	const [name, setName] = useState('');

	const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);

	const handleCreateEnterprise = () => {
		dispatch(createEnterpriseAction.request({ name }));
	};

	const handleCloseStatusMessage = () => {
		dispatch(clearEnterpriseStatusMessageAction.request());
	};
	const isAllCompleted = useMemo(() => name.trim().length, [name]);

	const severity = useMemo(
		() => (status.includes('successfully') ? 'success' : 'error'),

		[status]
	);

	useEffect(() => {
		if (severity === 'success') {
			setName('');
		}
	}, [severity]);

	return (
		<PageWrapper>
			<Form>
				<TextField
					value={name}
					onChange={handleChangeName}
					size='small'
					label='Enter name of enterprise'
				/>
				{status === 'Started' ? (
					<CircularProgress />
				) : (
					<Button
						color='success'
						variant='contained'
						disabled={!isAllCompleted}
						onClick={handleCreateEnterprise}>
						Create
					</Button>
				)}
			</Form>
			<StatusAlert
				status={status}
				severity={severity}
				handleCloseStatusMessage={handleCloseStatusMessage}
			/>
		</PageWrapper>
	);
}

const Form = styled('div')`
	display: flex;
	gap: 1rem;
	width: 300px
	flex-direction: column;

    button {
        width:100px;
    }
`;
export default CreateEnterprise;
