import {
	Status,
	blockCampaign,
	blockFundraiser,
	clearAllUserSessions,
	deleteCampaign,
	getAdminCategories,
	getAllCampaigns,
	getAllCategories,
	getCampaignsByCategoryHandle,
	getFundraisers,
	getMyCampaigns,
	getMyself,
	getTopCampaigns,
	logout,
	trackStatistic,
	unblockCampaign,
	unblockFundraiser,
	updateCampaignStatus,
	type CampaignResponseDto,
	type FundraiserCampaignResponseDto,
	type GetCategoryDto,
	type TrackStatisticDto,
	type UserMappedDto
} from '@aide/sdk';
import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';

export const useGetMyself = () =>
	createQuery({
		queryKey: ['getMyself'],
		queryFn: getMyself
	});

export const useGetAllCategories = () =>
	createQuery({
		queryKey: ['getAllCategories'],
		queryFn: getAllCategories
	});

export const useGetFundraiserCampaigns = (
	initialData: FundraiserCampaignResponseDto[],
	search: string = '',
	status: string = ''
) =>
	createQuery({
		queryKey: ['getFundraiserCampaigns'],
		queryFn: () => getMyCampaigns({ search, status }),
		initialData
	});

export const useGetCampaigns = (
	initialData: CampaignResponseDto[],
	search: string = '',
	categoryHandle: string = '',
	region: string = ''
) =>
	createQuery({
		queryKey: ['getCampaignsByCategoryHandle'],
		queryFn: () => getCampaignsByCategoryHandle({ search, categoryHandle, region }),
		initialData
	});

export const useDeleteCampaign = () => {
	const queryClient = useQueryClient();

	return createMutation({
		mutationFn: (_id: string) => deleteCampaign({ deleteCampaignDto: { _id } }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['getFundraiserCampaigns']
			});
		}
	});
};

export const useBlockCampaign = () => {
	const queryClient = useQueryClient();

	return createMutation({
		mutationFn: (_id: string) => blockCampaign({ deleteCampaignDto: { _id } }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['getAdminCampaigns']
			});
		}
	});
};

export const useUnblockCampaign = () => {
	const queryClient = useQueryClient();

	return createMutation({
		mutationFn: (_id: string) => unblockCampaign({ deleteCampaignDto: { _id } }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['getAdminCampaigns']
			});
		}
	});
};

export const useBlockFundraiser = () => {
	const queryClient = useQueryClient();

	return createMutation({
		mutationFn: (_id: string) => blockFundraiser({ deleteCampaignDto: { _id } }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['getFundraisers']
			});
		}
	});
};

export const useUnblockFundraiser = () => {
	const queryClient = useQueryClient();

	return createMutation({
		mutationFn: (_id: string) => unblockFundraiser({ deleteCampaignDto: { _id } }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['getFundraisers']
			});
		}
	});
};

export const useClearAllFundraiserSessions = () => {
	return createMutation({
		mutationFn: (_id: string) => clearAllUserSessions({ deleteCampaignDto: { _id } })
	});
};

export const useChangeCampaignStatus = () => {
	const queryClient = useQueryClient();

	return createMutation({
		mutationFn: ({ _id, status }: { _id: string; status: Status }) =>
			updateCampaignStatus({ updateCampaignStatusDto: { _id, status } }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['getFundraiserCampaigns']
			});
		}
	});
};

export const useGetFundraisers = (initialData: UserMappedDto[], search: string = '') =>
	createQuery({
		queryKey: ['getFundraisers'],
		queryFn: () => getFundraisers({ search }),
		initialData
	});

export const useGetAdminCampaigns = (
	initialData: FundraiserCampaignResponseDto[],
	search: string = ''
) =>
	createQuery({
		queryKey: ['getAdminCampaigns'],
		queryFn: () => getAllCampaigns({ search }),
		initialData
	});

export const useGetAdminCategories = (initialData: GetCategoryDto[]) =>
	createQuery({
		queryKey: ['getAdminCategories'],
		queryFn: () => getAdminCategories(),
		initialData
	});

export const useLogout = () => {
	return createMutation({
		mutationFn: () => logout()
	});
};

export enum Measurements {
	click = 'click',
	categoryClick = 'categoryClick',
	impression = 'impression'
}

export const useTrackStatistic = () => {
	return createMutation({
		mutationFn: (data: { type: Measurements; dto: TrackStatisticDto }) =>
			trackStatistic({ $type: data.type, trackStatisticDto: data.dto })
	});
};

export const useGetTopCampaigns = () =>
	createQuery({
		queryKey: ['getTopCampaigns'],
		queryFn: () => getTopCampaigns({ $type: Measurements.click })
	});
