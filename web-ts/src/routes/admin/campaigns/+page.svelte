<script lang="ts">
	import Search from '$lib/components/Search/Search.svelte';
	import {
		useGetAdminCampaigns,
		useBlockCampaign,
		useUnblockCampaign,
		useDeleteCampaign
	} from '$lib/api/index.js';
	import Table from '$lib/components/Table/Table.svelte';
	import Avatar from '$lib/components/Avatar/Avatar.svelte';
	import Dropdown from '$lib/components/Dropdown/Dropdown.svelte';
	import DotsButton from '$lib/components/Dropdown/DotsButton.svelte';
	import { formatDate } from '$lib/utils/format-date.util.js';
	import LinkNewTab from '$lib/components/LinkNewTab/LinkNewTab.svelte';

	export let data;
	let search = '';

	$: campaigns = useGetAdminCampaigns(data.campaigns, search);

	const blockCampaign = useBlockCampaign();

	const unblockCampaign = useUnblockCampaign();

	const deleteCampaign = useDeleteCampaign();

	console.log('data :>> ', data);
</script>

<div class="flex justify-between items-center mb-[40px]">
	<h1 class="font-medium text-[32px]">Campaigns</h1>
</div>

<Search placeholder="Search campaigns..." bind:value={search} class="pr-2 items-center" />

<Table let:Components>
	<Components.TableHead class="grid-cols-[2fr_1fr_2fr_2fr_2fr_60px]">
		<Components.TableHeadCell>Fundraiser</Components.TableHeadCell>
		<Components.TableHeadCell>Status</Components.TableHeadCell>
		<Components.TableHeadCell>Created at</Components.TableHeadCell>
		<Components.TableHeadCell>Last updated</Components.TableHeadCell>
		<Components.TableHeadCell></Components.TableHeadCell>
	</Components.TableHead>

	{#each $campaigns.data as campaign}
		<Components.TableRow class="grid-cols-[2fr_1fr_2fr_2fr_2fr_60px]">
			<Components.TableRowCell class="flex items-center gap-2">
				<span>{campaign.fundraiser.email}</span>
			</Components.TableRowCell>
			<Components.TableRowCell>{campaign.status}</Components.TableRowCell>
			<Components.TableRowCell>{formatDate(campaign.createdAt)}</Components.TableRowCell>
			<Components.TableRowCell>{formatDate(campaign.updatedAt)}</Components.TableRowCell>
			<Components.TableRowCell
				><LinkNewTab href={`http://localhost:5173/campaign/${campaign._id}`}
					>Go to campaign</LinkNewTab
				></Components.TableRowCell
			>

			<Components.TableRowCell class="flex justify-center">
				<Dropdown let:Components button={DotsButton}>
					<Components.DropdownWindow class="max-h-[200px] min-w-[176px] max-w-[240px]">
						{#if campaign.blocked}
							<Components.DropdownItem
								on:click={() => $blockCampaign.mutate(campaign._id)}
								>Block</Components.DropdownItem
							>
						{:else}
							<Components.DropdownItem
								on:click={() => $unblockCampaign.mutate(campaign._id)}
								>Unblock</Components.DropdownItem
							>
						{/if}
						<Components.DropdownItem
							class="text-[#dc3545]"
							on:click={() => $deleteCampaign.mutate(campaign._id)}
							>Delete</Components.DropdownItem
						>
					</Components.DropdownWindow>
				</Dropdown>
			</Components.TableRowCell>
		</Components.TableRow>
	{/each}
</Table>
