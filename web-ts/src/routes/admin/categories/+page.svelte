<script lang="ts">
	import Table from '$lib/components/Table/Table.svelte';
	import Dropdown from '$lib/components/Dropdown/Dropdown.svelte';
	import DotsButton from '$lib/components/Dropdown/DotsButton.svelte';
	import { useGetAdminCategories } from '$lib/api/index.js';

	export let data;

	$: categories = useGetAdminCategories(data.categories);
</script>

<div class="flex justify-between items-center mb-[40px]">
	<h1 class="font-medium text-[32px]">Categories</h1>
</div>

<Table let:Components>
	<Components.TableHead class="grid-cols-[2fr_1fr_2fr_2fr_2fr_60px]">
		<!-- logo -->
		<Components.TableHeadCell>Category</Components.TableHeadCell>
		<!-- name -->
		<Components.TableHeadCell></Components.TableHeadCell>
		<Components.TableHeadCell>Status</Components.TableHeadCell>
		<Components.TableHeadCell>Campaigns created</Components.TableHeadCell>
		<Components.TableHeadCell>Campaign live</Components.TableHeadCell>
		<Components.TableHeadCell></Components.TableHeadCell>
	</Components.TableHead>

	{#each $categories.data as category}
		<Components.TableRow class="grid-cols-[2fr_1fr_2fr_2fr_2fr_60px]">
			<Components.TableRowCell class="flex items-center gap-2">
				<img
					class="h-[64px] object-cover rounded-xl border border-[#e8e8e8]"
					src={category.mediaUrl}
					alt={category.title}
				/>
			</Components.TableRowCell>
			<Components.TableRowCell class="flex items-center gap-2">
				<span class="font-semibold">{category.title}</span>
			</Components.TableRowCell>
			<Components.TableRowCell>{category.status}</Components.TableRowCell>
			<Components.TableRowCell>{category.createdCampaigns}</Components.TableRowCell>
			<Components.TableRowCell>{category.liveCampaigns}</Components.TableRowCell>

			<Components.TableRowCell class="flex justify-center">
				<Dropdown let:Components button={DotsButton}>
					<Components.DropdownWindow class="max-h-[200px] min-w-[176px] max-w-[240px]">
						{#if category.status === 'live'}
							<Components.DropdownItem on:click={() => {}}
								>Hide</Components.DropdownItem
							>
						{:else}
							<Components.DropdownItem on:click={() => {}}
								>Show</Components.DropdownItem
							>
						{/if}
						<Components.DropdownItem class="text-[#dc3545]"
							>Delete</Components.DropdownItem
						>
					</Components.DropdownWindow>
				</Dropdown>
			</Components.TableRowCell>
		</Components.TableRow>
	{/each}


</Table>
