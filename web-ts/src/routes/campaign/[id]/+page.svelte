<script lang="ts">
	import { Measurements, useGetTopCampaigns, useTrackStatistic } from '$lib/api';
	import Campaign from './Campaign.svelte';
	import CampaignCard from '$lib/page-components/CampaignCard/CampaignCard.svelte';
	import { mapCampaignCard } from '$lib/services/campaign-map.service';

	export let data;

	console.log('data :>> ', data);
	const trackStatistic = useTrackStatistic();

</script>

<div class="flex flex-col items-center">
	<Campaign campaign={data.campaign} fundraiser={data.campaign.fundraiser} />

	<div class="mt-16">
		<h1 class="font-semibold text-2xl">Campaigns you may like</h1>

		<div
			class="grid grid-cols-4 laptopxl:grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1 grid-flow-row gap-6 mt-8 max-w-[1120px]"
		>
			{#each data.topCategoryCampaigns as campaign}
				<CampaignCard
					campaign={mapCampaignCard(campaign)}
					fundraiser={campaign.fundraiser}
					on:donate={() => {
						$trackStatistic.mutate({
							type: Measurements.click,
							dto: {
								metadata: {
									campaignId: campaign._id,
									categoryId: campaign.categoryId
								},
								click: 1
							}
						});
						window.location.href = `/campaign/${campaign._id}`;
					}}
				/>
			{/each}
		</div>
	</div>

	<div class="mt-16">
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
								metadata: {
									campaignId: campaign._id,
									categoryId: campaign.categoryId
								},
								click: 1
							}
						});
						window.location.href = `/campaign/${campaign._id}`;
					}}
				/>
			{/each}
		</div>
	</div>
</div>
