import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { MONTHS } from '../../../constants/months';

function DepartmentStatisticsForYearTable({
	data,
	structureName,
	year,
}: {
	data: {
		[fuel: string]: {
			volumes?: { [month: string]: number };
			costs?: { [month: string]: number };
		};
	};
	structureName: string;
	year: string;
}) {
	if (!Object.keys(data).length) {
		return <h4>No data...</h4>;
	}
	return (
		<div>
			<h5>{year}</h5>
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
					{Object.keys(data).map((key) => {
						return (
							<>
								<TableRow>
									<TableCell>{key + ' costs'}</TableCell>
									{MONTHS.map((month: string) => {
										return (
											<TableCell>
												{data[key]['costs']?.[month] ?? 0}
											</TableCell>
										);
									})}
								</TableRow>
								<TableRow>
									<TableCell>{key + ' volumes'}</TableCell>
									{MONTHS.map((month: string) => {
										return (
											<TableCell>
												{data[key]['volumes']?.[month] ?? 0}
											</TableCell>
										);
									})}
								</TableRow>
							</>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
}

export default DepartmentStatisticsForYearTable;
