import axios from 'axios';

export const createEnterpriseRequest = async ({ name }: { name: string }) => {
	try {
		const response = await axios.post('/api/create/enterprise', { name });
		return { success: true, data: response.data };
	} catch (err: any) {
		return {
			success: false,
			data: err.response.data || { message: 'Ops, something went wrong !' },
		};
	}
};

export const getListOfEnterprisesRequest = async () => {
	try {
		const response = await axios.get('/api/get/enterprises');
		return { success: true, data: response.data };
	} catch (err: any) {
		return {
			success: false,
			data: err.response.data || { message: 'Ops, something went wrong !' },
		};
	}
};

export const createDepartmentRequest = async ({
	enterpriseName,
	departmentName,
}: {
	enterpriseName: string;
	departmentName: string;
}) => {
	try {
		const response = await axios.post('/api/create/department', {
			enterpriseName,
			departmentName,
		});
		return { success: true, data: response.data };
	} catch (err: any) {
		return {
			success: false,
			data: err.response.data || { message: 'Ops, something went wrong !' },
		};
	}
};

export const getListOfDepartmentsRequest = async ({ id }: { id: string }) => {
	try {
		const response = await axios.get(`/api/departments/${id}`);
		return { success: true, data: response.data };
	} catch (err: any) {
		return {
			success: false,
			data: err.response.data || { message: 'Ops, something went wrong !' },
		};
	}
};

export const createCostsRequest = async ({
	department,
	enterprise,
	type,
	year,
	resource,
	costs,
}: {
	department: string;
	enterprise: string;
	type: string;
	year: number;
	resource: string;
	costs: { id: number; month: string; value: string }[];
}) => {
	try {
		const response = await axios.post(`/api/create/costs`, {
			department,
			enterprise,
			type,
			resource,
			costs,
			year,
		});
		return { success: true, data: response.data };
	} catch (err: any) {
		return {
			success: false,
			data: err.response.data || { message: 'Ops, something went wrong !' },
		};
	}
};

export const createVolumesRequest = async ({
	department,
	enterprise,
	type,
	volumes,
}: {
	department: string;
	enterprise: string;
	type: string;
	volumes: { year: string; value: string }[];
}) => {
	try {
		const response = await axios.post(`/api/create/volumes`, {
			department,
			enterprise,
			type,
			volumes,
		});
		return { success: true, data: response.data };
	} catch (err: any) {
		return {
			success: false,
			data: err.response.data || { message: 'Ops, something went wrong !' },
		};
	}
};

export const createWorkingDaysRequest = async ({
	department,
	enterprise,
	year,
	days,
}: {
	department: string;
	enterprise: string;
	year: number;
	days: { month: string; value: string }[];
}) => {
	try {
		const response = await axios.post(`/api/create/days`, {
			department,
			enterprise,
			year,
			days,
		});
		return { success: true, data: response.data };
	} catch (err: any) {
		return {
			success: false,
			data: err.response.data || { message: 'Ops, something went wrong !' },
		};
	}
};
