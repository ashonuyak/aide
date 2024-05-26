<script lang="ts">
	import { panelsStore } from '$lib/stores/panels.store';
	import { twMerge } from 'tailwind-merge';
	import StepsProgress from './StepsProgress.svelte';
	import PrimaryButton from '$lib/components/Button/PrimaryButton.svelte';
	import ArrowIcon from '$lib/components/Icon/ArrowIcon.svelte';
	import { createEventDispatcher, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import PublishModal from '$lib/components/Modal/PublishModal.svelte';
	import { modalsStore } from '$lib/stores/modals.store';

	export { classes as class };

	interface PanelsConfiguration {
		readonly name: string;
		readonly component: ConstructorOfATypedSvelteComponent;
	}

	export let panels: PanelsConfiguration[] = [];

	let classes: string = '';
	const defaultClasses: string = 'relative overflow-hidden';

	const dispatch = createEventDispatcher();

	const { current, previous, setPanel } = panelsStore;

	$: activePanel = panels.find((panel) => panel.name === $current);
	$: activePanelIndex = panels.findIndex((panel) => panel.name === $current);
	$: previousPanelIndex = panels.findIndex((panel) => panel.name === $previous);

	const isNext = writable(activePanelIndex > previousPanelIndex);
	setContext('isNext', { isNext });
	$: $isNext = activePanelIndex > previousPanelIndex;

	function setNextPanel() {
		const nextPanel = panels[activePanelIndex + 1];

		if (nextPanel) {
			setPanel(nextPanel.name);
		}
	}

	function handleStepClick({ detail }: { detail: number }) {
		setPanel(panels[detail].name);
	}

	function handleBackClick() {
		if (activePanelIndex) {
			const previousPanel = panels[activePanelIndex - 1];

			if (previousPanel) {
				setPanel(previousPanel.name);
			}
		} else {
			dispatch('close');
		}
	}

	let validPanel: boolean = false;

	function setIsValid(value: boolean) {
		validPanel = value;
	}

	setContext('campaignPanels', {
		setIsValid
	});

	let publishModalId: string = '';
</script>

<div class={twMerge(defaultClasses, classes)}>
	<button
		class="back-container inline-flex items-center cursor-pointer"
		on:click={handleBackClick}
	>
		<div class="back-arrow transition-transform">
			<ArrowIcon color="#444" size={24} class="translate-y-[1px]" />
		</div>
		<div class="text-[#444] font-semibold ml-[2px]">Back</div>
	</button>

	{#if activePanel}
		<svelte:component this={activePanel.component} />
	{/if}

	<div class="absolute bottom-0 w-full flex flex-col items-center gap-[16px]">
		<StepsProgress
			quantity={panels.length}
			current={activePanelIndex}
			on:step-click={handleStepClick}
		/>

		<div class="continue-container w-full">
			{#if activePanelIndex === panels.length - 1}
				<PrimaryButton
					class="font-semibold flex items-center"
					disabled={!validPanel}
					on:click={() => modalsStore.showModal(publishModalId)}
				>
					Finish setup
				</PrimaryButton>
			{:else}
				<PrimaryButton
					class="font-semibold flex items-center"
					disabled={!validPanel}
					on:click={() => setNextPanel()}
				>
					Continue
					<div class="continue-arrow transition-transform">
						<ArrowIcon
							color="#fff"
							size={24}
							class="translate-y-[1px] ml-[4px]"
							flipped
						/>
					</div>
				</PrimaryButton>
			{/if}
		</div>
	</div>
</div>

<PublishModal bind:id={publishModalId} />

<style>
	.back-container:hover .back-arrow {
		transform: translateX(-4px);
	}
	.continue-container:hover .continue-arrow {
		transform: translateX(4px);
	}
</style>
