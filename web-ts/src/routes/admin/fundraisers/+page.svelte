<script lang="ts">
	import Search from '$lib/components/Search/Search.svelte';
	import { useGetFundraisers } from '$lib/api/index.js';
	import Table from '$lib/components/Table/Table.svelte';
	import Avatar from '$lib/components/Avatar/Avatar.svelte';
	import Dropdown from '$lib/components/Dropdown/Dropdown.svelte';
	import DotsButton from '$lib/components/Dropdown/DotsButton.svelte';

	export let data;
	let search = '';

	$: fundraisers = useGetFundraisers(data.fundraisers, search);

	console.log('data :>> ', data);
</script>

<div class="flex justify-between items-center mb-[40px]">
	<h1 class="font-medium text-[32px]">Fundraisers</h1>
</div>

<Search placeholder="Search fundraisers..." bind:value={search} class="pr-2 items-center" />

<Table let:Components>
	<Components.TableHead class="grid-cols-[1fr_1fr_1fr_1fr_60px]">
		<Components.TableHeadCell>Fundraiser</Components.TableHeadCell>
		<Components.TableHeadCell>Email</Components.TableHeadCell>
		<Components.TableHeadCell>Signed up</Components.TableHeadCell>
		<Components.TableHeadCell>Last login</Components.TableHeadCell>
	</Components.TableHead>

	{#each $fundraisers.data as fundraiser}
		<Components.TableRow class="grid-cols-[1fr_1fr_1fr_1fr_60px]">
			<Components.TableRowCell class="flex items-center gap-2">
				<Avatar
					src={fundraiser.avatarUrl}
					initials={fundraiser.initials}
					width="w-[32px]"
				/>
				<span>{fundraiser.username}</span>
			</Components.TableRowCell>
			<Components.TableRowCell>{fundraiser.email}</Components.TableRowCell>
			<Components.TableRowCell>{fundraiser.createdAt}</Components.TableRowCell>
			<Components.TableRowCell>{fundraiser.createdAt}</Components.TableRowCell>

			<Components.TableRowCell class="flex justify-center">
				<Dropdown let:Components button={DotsButton}>
					<Components.DropdownWindow class="max-h-[200px] min-w-[176px] max-w-[240px]">
						{#if fundraiser.blocked}
							<Components.DropdownItem on:click={() => {}}
								>Block</Components.DropdownItem
							>
						{:else}
							<Components.DropdownItem on:click={() => {}}
								>Unblock</Components.DropdownItem
							>
						{/if}
						<Components.DropdownItem>Clear all sessions</Components.DropdownItem>
						<Components.DropdownItem class="text-[#dc3545]">Delete</Components.DropdownItem>
					</Components.DropdownWindow>
				</Dropdown>
			</Components.TableRowCell>
		</Components.TableRow>
	{/each}
</Table>
