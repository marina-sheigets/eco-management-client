import {
	Accordion,
	AccordionSummary,
	MenuItem,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TextField,
	Tooltip,
	Typography,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { setLabels } from 'react-chartjs-2/dist/utils';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RESOURCES } from '../../../constants/costs';
import { YEARS } from '../../../constants/years';
import {
	getFullDepartmentInfoForYearAction,
	getListOfDepartmentsAction,
	getListOfEnterprisesAction,
} from '../../../redux/api/ApiActions';
import {
	getFullDepartmentForYearInfo,
	getFullEnterpriseInfoStatus,
	getListOfDepartments,
	getListOfEnterprises,
} from '../../../redux/selectors';
import AccordionWrapper from '../../__atoms__/AccordionWrapper';
import TextFieldsWrapper from '../../__atoms__/TextFieldsWrapper';

function PieDepartmentDiagram() {
	const dispatch = useDispatch();

	const status = useSelector(getFullEnterpriseInfoStatus);
	const fullDepartmentInfo = useSelector(getFullDepartmentForYearInfo);
	const listOfEnterprises = useSelector(getListOfEnterprises);
	const listOfDepartments = useSelector(getListOfDepartments);

	const [enterprises, setEnterprises] = useState<{ id: string; name: string }[]>([]);
	const [enterpriseName, setEnterpriseName] = useState('');
	const [year, setYear] = useState('');
	const [departments, setDepartments] = useState<{ id: string; name: string }[]>([]);
	const [departmentName, setDepartmentName] = useState('');
	const [chartData, setChartData] = useState<number[]>([]);
	const [labels, setLabels] = useState<string[]>([]);
	const [tableData, setTableData] = useState<{
		[resource: string]: { cost: number; percentage: string };
	}>({});
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

	const getOnlyCostsFromObject = (inputObject: {
		[resource: string]: { costs: { month: number }; volumes: { month: number } };
	}) => {
		let outputObject: { [resource: string]: { costs: { [month: string]: number } } } = {};
		for (let key in inputObject) {
			outputObject[key] = { costs: inputObject[key].costs };
		}
		return outputObject;
	};

	const getSumOfCostsForAllMonths = (inputObject: {
		[resource: string]: { costs: { [month: string]: number } };
	}) => {
		let outputObject: { [resource: string]: { [cost: string]: number } } = {};

		for (let [key, values] of Object.entries(inputObject)) {
			let allCostsForResource = Object.values(values.costs);
			const sumOfCosts = allCostsForResource.reduce((partialSum, a) => partialSum + a, 0);
			outputObject[key] = { cost: +sumOfCosts.toFixed(1) };
		}
		return outputObject;
	};

	const getPercentForEachCost = (inputObject: {
		[resource: string]: { [cost: string]: number };
	}) => {
		let outputObject: { [resource: string]: { cost: number; percentage: string } } = {};

		let wholeCostInDepartment = 0;

		for (let [key, value] of Object.entries(inputObject)) {
			wholeCostInDepartment += value.cost ?? 0;
		}

		for (let [key, value] of Object.entries(inputObject)) {
			outputObject[key] = {
				cost: value.cost,
				percentage: ((100 * value.cost) / wholeCostInDepartment).toString() + '%',
			};
		}

		return outputObject;
	};
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
		if (enterpriseName && year && selectedDepartmentId) {
			dispatch(
				getFullDepartmentInfoForYearAction.request({
					department: selectedDepartmentId,
					enterprise: selectedEnterpriseId,
					year,
				})
			);
		}
	}, [enterpriseName, year, dispatch, selectedEnterpriseId, selectedDepartmentId]);

	useEffect(() => {
		if (Object.keys(fullDepartmentInfo).length) {
			let costsObject: { [resource: string]: { costs: { [month: string]: number } } } =
				getOnlyCostsFromObject(fullDepartmentInfo);

			let objectWithSumOfCosts = getSumOfCostsForAllMonths(costsObject);
			let newChartData: number[] = []; // { Fuel: {costs:2423}, Electricity:{costs:545}};
			let newLabels: string[] = [];
			for (let [resource, costs] of Object.entries(objectWithSumOfCosts)) {
				newLabels.push(resource);
				newChartData.push(objectWithSumOfCosts[resource].cost);
			}
			setChartData(newChartData);
			setLabels(newLabels);

			let objectWithPercent = getPercentForEachCost(objectWithSumOfCosts);
			setTableData(objectWithPercent);
		}
	}, [fullDepartmentInfo]);
	return (
		<AccordionWrapper>
			<Accordion>
				<AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
					<Typography>See full statistics in department for one year</Typography>
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
						value={year}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setYear(e.target.value)
						}
						select
						color='primary'
						size='small'
						label='Select year'>
						{YEARS.map((item: number) => (
							<MenuItem key={item} value={item}>
								{item}
							</MenuItem>
						))}
					</TextField>
				</TextFieldsWrapper>
				<Wrapper>
					<ChartBox>
						{chartData.length && labels.length ? (
							<Pie
								data={{
									labels: labels,
									datasets: [{ data: chartData }],
								}}
							/>
						) : null}
					</ChartBox>
					<MiniTable>
						{Object.keys(tableData).length ? (
							<Table sx={{ border: '1px solid grey' }}>
								<TableHead>
									<TableHeaderCell>Resource</TableHeaderCell>
									<TableHeaderCell>Costs</TableHeaderCell>
									<TableHeaderCell>Percent %</TableHeaderCell>
								</TableHead>
								<TableBody>
									{Object.keys(tableData).map((resource) => {
										return (
											<TableRow>
												<TableCell>{resource}</TableCell>
												<TableCell>{tableData[resource].cost}</TableCell>
												<TableCell>
													{tableData[resource].percentage}
												</TableCell>
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
						) : null}
					</MiniTable>
				</Wrapper>
			</Accordion>
		</AccordionWrapper>
	);
}

const Wrapper = styled('div')`
	width: 1000px;
	display: flex;
	gap: 200px;
`;

const TableHeaderCell = styled(TableCell)`
	background: grey;
`;
const ChartBox = styled('div')`
	height: 400px;
	width: 400px;
`;

const MiniTable = styled('div')`
	height: 400px;
	width: 400px;
`;
export default PieDepartmentDiagram;
