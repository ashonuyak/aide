<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import Carousel from '$lib/components/Carousel/Carousel.svelte';
	import { scale } from 'svelte/transition';
	import Badge from '$lib/components/Badge/Badge.svelte';
	import QrCode from '$lib/components/QRCode/QRCode.svelte';
	import Avatar from '$lib/components/Avatar/Avatar.svelte';
	import { campaignsStore } from '$lib/stores/campaigns.store';
	import {
		Status,
		type CampaignResponseDto,
		type FundraiserCampaignResponseDto,
		type UserMappedDto
	} from '@aide/sdk';
	import { categories } from '$lib/stores/categories.store';

	export { classes as class };
	export let campaign: CampaignResponseDto | FundraiserCampaignResponseDto;
	export let fundraiser: UserMappedDto;

	console.log('fundraiser :>> ', fundraiser);

	let classes: string = '';
	const defaultClasses: string =
		'campaign-container overflow-auto bg-[#fff] w-fill h-fill relative rounded-lg m-6 py-6 px-6 space-y-4';

	const { campaigns } = campaignsStore;

	const closedCampaignsCount = $campaigns ? $campaigns.filter(({ status }) => status === Status.Closed).length : campaign.closedCampaignsCount;

	const carouselImages = [campaign.mainImage, ...campaign.media].map((src) => ({
		src,
		alt: 'Fundraising campaign media image'
	}));

	const category = $categories.find(({ _id }) => _id === campaign.categoryId) || {
		title: 'No way',
		color: 'maroon'
	};
	const { title: categoryTitle, color } = category;

	console.log('closedCampaignsCount :>> ', closedCampaignsCount);
</script>

<div class={twMerge(defaultClasses, classes)} in:scale={{ start: 0.9, duration: 200 }}>
	<!-- header -->
	<div class="flex items-center justify-between">
		<div>
			<div class="flex items-center gap-4">
				<div class="font-semibold text-3xl line-clamp-2">{campaign.title}</div>
				<Badge class="text-base font-medium px-3 py-1 truncate">{categoryTitle}</Badge>
			</div>
			{#if campaign.subtitle}
				<div class="font-medium text-[#666] line-clamp-3">{campaign.subtitle}</div>
			{/if}
		</div>
		<div class="fundraiser-fake-card relative w-12 h-12">
			<div class="absolute inset-0 z-20">
				<Avatar src={fundraiser.avatarUrl} initials={fundraiser.initials} width="w-12" />
			</div>
			<div class="fundraiser-card campaign-container rounded-lg absolute right-6 top-6 w-0 h-0 z-10 overflow-hidden">
				<div>
					<div class="text-sm font-medium truncate">{fundraiser.username}</div>
					<div class="text-sm font-medium truncate">{fundraiser.email || 'Fundraiser'}</div>
				</div>
			</div>
		</div>
	</div>

	<Carousel images={carouselImages} let:Controls imgClass="object-contain">
		{#if carouselImages.length > 1}
			<Controls />
		{/if}
	</Carousel>

	<div class="grid grid-cols-[240px_1fr]">
		<div class="campaign-container rounded-lg p-4">
			<Avatar src={fundraiser.avatarUrl} initials={fundraiser.initials} width="w-16" />
			<div>
				<div class="text-sm font-medium">{fundraiser.username}</div>
				<div class="text-sm font-medium">{'Fundraiser' || fundraiser.email}</div>
			</div>
		</div>

		<div class="p-4">{campaign.description}</div>
	</div>

	<QrCode data="http://localhost:1337" class="w-32" />
</div>

<style>
	.campaign-container {
		box-shadow:
			0px 0px 0px 1px rgba(0, 0, 0, 0.04),
			0px 4px 6px 0px rgba(0, 0, 0, 0.08);
	}

	.fundraiser-card {
		transition: all 200ms ease-in-out;
	}

	.fundraiser-fake-card:hover .fundraiser-card {
		width: 240px;
		height: 64px;
		transform: translate(8px, -8px);
		padding: 16px;
		top: 0;
		right: 0
	}
</style>
