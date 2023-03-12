import axios from 'axios';

export const getFullEnterpriseInfoByResourceRequest = async ({
	enterprise,
	resource,
	type,
}: {
	enterprise: string;
	resource: string;
	type: string;
}) => {
	try {
		const response = await axios.get(
			`/api/get/full/statistics/${enterprise}/${type}/${resource}`
		);
		return { success: true, data: response.data };
	} catch (err: any) {
		return {
			success: false,
			data: err.response.data || { message: 'Ops, something went wrong !' },
		};
	}
};

export const getFullDepartmentInfoRequest = async ({
	enterprise,
	department,
	resource,
	type,
}: {
	enterprise: string;
	resource: string;
	type: string;
	department: string;
}) => {
	try {
		const response = await axios.get(
			`/api/get/department/statistics/${enterprise}/${department}/${type}/${resource}`
		);
		return { success: true, data: response.data };
	} catch (err: any) {
		return {
			success: false,
			data: err.response.data || { message: 'Ops, something went wrong !' },
		};
	}
};

export const getMonthlyConsumptionInfoRequest = async ({
	department,
	resource,
	month,
}: {
	resource: string;
	month: string;
	department: string;
}) => {
	try {
		const response = await axios.get(
			`/api/get/consumption/statistics/${department}/${resource}/${month}`
		);
		return { success: true, data: response.data };
	} catch (err: any) {
		return {
			success: false,
			data: err.response.data || { message: 'Ops, something went wrong !' },
		};
	}
};
