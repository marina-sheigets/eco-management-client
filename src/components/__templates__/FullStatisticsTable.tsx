import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { MONTHS } from '../../constants/months';

function StatisticsTable({
	structureName,
	data,
}: {
	structureName: string;
	data: { year: number; values: { [month: string]: number } }[];
}) {
	if (data.length === 0) {
		return <h6>No data...</h6>;
	}
	return (
		<div>
			<h5>{structureName}</h5>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell></TableCell>
						{MONTHS.map((month) => {
							return <TableCell key={month}>{month}</TableCell>;
						})}
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((yearInfo) => (
						<TableRow>
							<TableCell>{yearInfo.year}</TableCell>
							{MONTHS.map((month) => {
								return <TableCell key={month}>{yearInfo.values[month]}</TableCell>;
							})}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

export default StatisticsTable;
