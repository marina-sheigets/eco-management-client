import axios from 'axios';

export const getAllEnterpriseStatisticsRequest = async ({ enterprise }: { enterprise: string }) => {
	try {
		const response = await axios.get(`/api/statistics`, {
			params: {
				enterprise,
			},
		});
		return { success: true, data: response.data };
	} catch (err: any) {
		return {
			success: false,
			data: err.response.data || { message: 'Ops, something went wrong !' },
		};
	}
};
