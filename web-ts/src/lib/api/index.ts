import {
	Status,
	deleteCampaign,
	getAllCampaigns,
	getAllCategories,
	getCampaignsByCategoryHandle,
	getFundraisers,
	getMyCampaigns,
	getMyself,
	updateCampaignStatus,
	type CampaignResponseDto,
	type FundraiserCampaignResponseDto,
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
	categoryHandle: string = ''
) =>
	createQuery({
		queryKey: ['getCampaignsByCategoryHandle'],
		queryFn: () => getCampaignsByCategoryHandle({ search, categoryHandle }),
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
