<script lang="ts">
	import imagePlaceholder from '$lib/assets/campaign-card-image-placeholder.svg';
	import Dropdown from '../Dropdown/Dropdown.svelte';
	import DotsButton from '../Dropdown/DotsButton.svelte';
	import { Status } from '@aide/sdk';
	import { createEventDispatcher } from 'svelte';
	import { STATUS } from '$lib/constants/status.constants';
	import { STATUS_COLOR } from '$lib/constants/status-color.constants';

	export let title: string = '';
	export let subtitle: string = '';
	export let description: string = '';
	export let mainImage: string = '';
	export let categoryName: string = '';
	export let status: Status = Status.Draft;

	const dispatch = createEventDispatcher();
</script>

<div class="relative card-container">
	<!-- wrapper -->
	<div class="w-full h-full card-wrapper flex flex-col rounded-lg bg-[#fff] overflow-hidden">
		<!-- header -->
		<div
			class="px-3 h-12 w-full bg-[#f3f3f3] flex items-center justify-between border-b border-b-[#e8e8e8]"
		>
			<div class="font-semibold truncate">{categoryName}</div>

			<div class="flex items-center gap-2">
				<div
					class="px-2 py-[2px] bg-[#444] font-semibold text-xs text-primary rounded-full truncate max-w-[200px]"
					style="background-color: {STATUS_COLOR[status]}"
				>
					{STATUS[status]}
				</div>
				<!-- <Icon path={mdiDotsHorizontal} size={24} color="#444" class="cursor-pointer " /> -->

				<Dropdown let:Components button={DotsButton}>
					<Components.DropdownWindow class="max-h-[200px] min-w-[120px] max-w-[240px]">
						{#if status === Status.Draft}
							<Components.DropdownItem on:click={() => dispatch('publish')}
								>Publish</Components.DropdownItem
							>
						{:else}
							<Components.DropdownItem on:click={() => dispatch('pause')}
								>Pause</Components.DropdownItem
							>
						{/if}
						<Components.DropdownItem on:click={() => dispatch('edit')}
							>Edit</Components.DropdownItem
						>
						<Components.DropdownItem on:click={() => dispatch('delete')}
							>Delete</Components.DropdownItem
						>
					</Components.DropdownWindow>
				</Dropdown>
			</div>
		</div>

		<!-- body -->
		<div class="flex flex-col px-3 py-4 justify-between flex-grow max-h-[400px]">
			<div
				class="bg-chocolate flex items-center justify-center overflow-hidden rounded-2xl flex-grow"
			>
				<img src={mainImage || imagePlaceholder} alt={title} />
			</div>

			<div>
				<div class="font-semibold mt-3 line-clamp-2">{title}</div>

				<div class="mt-2 text-[14px] line-clamp-3">{subtitle || description}</div>
			</div>
		</div>
	</div>

	<!-- <div
		class="absolute top-[-8px] px-2 py-[2px] bg-[#444] font-semibold text-[10px] text-[#fff] rounded-full right-4 truncate max-w-[200px]"
	>
		{status.toUpperCase()}
	</div> -->
</div>

<style>
	.card-wrapper {
		box-shadow:
			0px 0px 0px 1px rgba(0, 0, 0, 0.04),
			0px 4px 6px 0px rgba(0, 0, 0, 0.08);
	}

	.card-container {
		transition: transform 0.15s ease-in-out;
	}

	.card-container:hover {
		transform: scale(1.05);
	}
</style>
