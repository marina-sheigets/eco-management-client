import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';

function ConsumptionTable({
	data,
	department,
}: {
	data: {
		month: string;
		values: { year: number; costs: number; days: number; average: number }[];
	};
	department: string;
}) {
	if (!Object.keys(data).length || !data?.values.length) {
		return <h4>No data...</h4>;
	}
	return (
		<Table>
			<TableHead>
				<TableCell />
				<TableCell>{data.month}</TableCell>
				<TableCell>Working days</TableCell>
				<TableCell>Daily Average</TableCell>
			</TableHead>
			<TableBody>
				{data.values.map((yearInfo) => (
					<TableRow>
						<TableCell>{yearInfo.year}</TableCell>
						<TableCell>{yearInfo.costs}</TableCell>
						<TableCell>{yearInfo.days}</TableCell>
						<TableCell>{yearInfo.average}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

export default ConsumptionTable;
