<script>
	import PrimaryButton from '$lib/components/Button/PrimaryButton.svelte';
	import PublicHeader from '$lib/components/Header/PublicHeader.svelte';
	import PublicMain from '$lib/components/Main/PublicMain.svelte';
	import mainImage from '$lib/assets/main.jpeg';
	import CampaignCard from '$lib/page-components/CampaignCard/CampaignCard.svelte';
	import { mapCampaignCard } from '$lib/services/campaign-map.service';
	import { Measurements, useTrackStatistic } from '../lib/api/index';

	export let data;
	const trackStatistic = useTrackStatistic();
</script>

<div class="h-screen">
	<div class="flex flex-col bg-primary items-center">
		<PublicHeader />
		<div
			class="bg-primary alaoo flex items-center justify-center max-w-[1440px] px-[64px] gap-[64px]"
		>
			<div class="space-y-12">
				<div class="text-[64px] leading-[88px] font-bold text-[#fff]">
					Make a Difference Today
				</div>
				<div class="text-[30px] leading-[44px] font-light text-[#fff]">
					Join our community to support charitable initiatives and help those in need.
				</div>
	
				<div class="flex items-center">
					<PrimaryButton
						class="rounded-[32px] !bg-[#fff] w-[264px] text-primary font-extrabold text-xl h-[64px]"
						href="/campaigns"
						>Donate</PrimaryButton
					>
	
					<PrimaryButton class="font-semibold w-[264px] text-xl hover:bg-primary" href="/auth/fundraiser/sign-up"
						>Become a fundraiser</PrimaryButton
					>
				</div>
			</div>
			<div class="main-section">
				<img src={mainImage} alt="main" class="w-full h-full" />
			</div>
		</div>
	</div>
</div>


<div class="max-w-[1440px] px-[64px] mx-auto">
	<h1 class="font-semibold text-2xl">Top campaigns</h1>

	<div
		class="grid grid-cols-4 laptopxl:grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1 grid-flow-row gap-6 mt-8 max-w-[1120px]"
	>
		{#each data.topCampaigns as campaign}
			<CampaignCard
				campaign={mapCampaignCard(campaign)}
				fundraiser={campaign.fundraiser}
				on:donate={() => {
					$trackStatistic.mutate({
						type: Measurements.click,
						dto: {
							metadata: { campaignId: campaign._id, categoryId: campaign.categoryId },
							click: 1
						}
					});
					window.location.href = `/campaign/${campaign._id}`;
				}}
			/>
		{/each}
	</div>
</div>

<div class="mt-16 max-w-[1440px] px-[64px] mx-auto mb-[82px]">
	<h1 class="font-semibold text-2xl">Campaigns to help Armed forces of Ukraine</h1>

	<div
		class="grid grid-cols-4 laptopxl:grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1 grid-flow-row gap-6 mt-8 max-w-[1120px]"
	>
		{#each data.zsuCampaigns as campaign}
			<CampaignCard
				campaign={mapCampaignCard(campaign)}
				fundraiser={campaign.fundraiser}
				on:donate={() => {
					$trackStatistic.mutate({
						type: Measurements.click,
						dto: {
							metadata: { campaignId: campaign._id, categoryId: campaign.categoryId },
							click: 1
						}
					});
					window.location.href = `/campaign/${campaign._id}`;
				}}
			/>
		{/each}
	</div>
</div>

<style>
	.main-section {
		border-radius: 16px;
		max-width: 800px;
		overflow: hidden;
	}

	.alaoo {
		height: calc(100vh - 106px - 120px);
	}
</style>
