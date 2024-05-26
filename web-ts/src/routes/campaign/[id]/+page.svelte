<script lang="ts">
	import Campaign from './Campaign.svelte';

	export let data;

	console.log('data :>> ', data);
</script>

<Campaign campaign={data.campaign} fundraiser={data.campaign.fundraiser} />
