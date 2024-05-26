<script lang="ts">
	import FileDropzone from '../FileDropzone/FileDropzone.svelte';
	import Panel from '../Panels/Panel.svelte';
	import { campaignStore } from '$lib/stores/campaign.store';
	import Checkbox from '../Checkbox/Checkbox.svelte';
	import { fly, slide } from 'svelte/transition';
	import OptionsSwitcher from '../OptionsSwitcher/OptionsSwitcher.svelte';
	import Icon from '../Icon/Icon.svelte';
	import { mdiPlusCircle, mdiTrashCanOutline } from '@mdi/js';
	import InputLink from '../Input/InputLink.svelte';
	import paypalImg from '$lib/assets/paypal.webp';
	import Badge from '../Badge/Badge.svelte';
	import { getContext } from 'svelte';
	import InputText from '../Input/InputText.svelte';
	import { DEFAULT_PAYMENT_CARD } from '$lib/constants/default-payment-card.constants';

	const { qrCodeFile, qrCodeSrc, paymentCards, payPalEnabled, qrCodeUrl } = campaignStore;

	let qrCodeChecked = !!$qrCodeSrc;
	let ownQrCode = !!$qrCodeUrl || (!$qrCodeSrc && !$qrCodeUrl);

	const { setIsValid } = getContext<{ setIsValid: (value: boolean) => void }>('campaignPanels');

	$: {
		if ($paymentCards.every(({ key, value }) => (key && value) || (!key && !value))) {
			setIsValid(true);
		} else {
			setIsValid(false);
		}
	}
</script>

<Panel class="top-[40px]">
	<div class="font-semibold text-[28px]">Payment</div>

	<div class="text-[16px] text-[#666]">Add payment methods</div>

	<div class="space-y-[24px] mt-[32px]">
		<div
			class="border-[#c4e0f9] bg-[#D5EBFF] border-2 rounded-2xl divide-y-2 divide-[#c4e0f9]"
		>
			<div class="flex gap-4 p-[12px]">
				<img src={paypalImg} alt="paypal" class="rounded-[12px]" width="128" />
				<div class="flex flex-col justify-between">
					<div class="space-y-2">
						<div class="font-semibold flex items-center gap-2">
							<span>PayPal</span>
							<Badge class="bg-[#253b80] text-[#fff] font-semibold">Recommended</Badge
							>
						</div>

						<div class="text-[13px] font-medium text-[#253b80]">
							Setup PayPal following this guide to make donations to your campaign
							more straightforward.
						</div>
					</div>
					<a
						href="https://daddy.ngrok.io/setup-paypal"
						class="text-[14px] font-semibold text-[#253b80] underline underline-offset-2"
						target="_blank"
						>See the guide</a
					>
				</div>
			</div>
			<div class="p-[12px]">
				<Checkbox bind:checked={$payPalEnabled} color="navy"
					><span class="text-[14px] text-[#253b80]">Turn on PayPal</span></Checkbox
				>
			</div>
		</div>

		<div>
			<div class="font-medium">Payment cards</div>

			{#each [...$paymentCards] as _paymentCard, index}
				<div class="mt-1" transition:slide={{ axis: 'y', duration: 200 }}>
					<div class="grid grid-cols-[120px_1fr_24px] gap-2 items-baseline">
						<InputText
							bind:value={$paymentCards[index].key}
							class="rounded-lg h-9"
							maxlength={200}
							placeholder="Card name"
						/>
						<InputText
							maxlength={100}
							placeholder="Card"
							class="rounded-lg h-9"
							bind:value={$paymentCards[index].value}
						/>
						{#if $paymentCards.length > 1}
							<Icon
								path={mdiTrashCanOutline}
								size={24}
								color="#666"
								class="cursor-pointer translate-y-[6px]"
								on:click={() =>
									($paymentCards = [
										...$paymentCards.filter((_, i) => i !== index)
									])}
							/>
						{/if}
					</div>
				</div>
			{/each}

			<div class="flex items-center justify-start gap-1 mt-2">
				<Icon
					path={mdiPlusCircle}
					size={32}
					class="cursor-pointer"
					on:click={() => ($paymentCards = [...$paymentCards, DEFAULT_PAYMENT_CARD()])}
				/>
				<!-- <button
					class="font-medium"
					on:click={() => {
						$paymentCards = [...$paymentCards, DEFAULT_PAYMENT_CARD()];
					}}>Add card</button
				> -->
			</div>
		</div>

		<div>
			<Checkbox bind:checked={qrCodeChecked}>QR code</Checkbox>
			{#if qrCodeChecked}
				<div class="relative bg-[#fff] z-10 overflow-hidden mt-2">
					<div transition:fly={{ y: -100, duration: 100 }}>
						<OptionsSwitcher let:Components>
							<Components.OptionsSwitcherItem
								active={ownQrCode}
								on:click={() => (ownQrCode = true)}
								>Own file</Components.OptionsSwitcherItem
							>
							<Components.OptionsSwitcherItem
								active={!ownQrCode}
								on:click={() => (ownQrCode = false)}
								>From link</Components.OptionsSwitcherItem
							>
						</OptionsSwitcher>

						<div class="mt-2">
							{#if ownQrCode}
								<FileDropzone
									accept="image/png, image/jpeg, video/*"
									name="campaign-qr-code"
									bind:files={$qrCodeFile}
									><div slot="message">
										<span class="font-medium">Upload QR code</span> or drag and drop
									</div></FileDropzone
								>
							{:else}
								<InputLink
									class="rounded-lg h-9"
									maxlength={10000}
									value={$qrCodeUrl}
									placeholder="Enter link"
									on:change={({ detail }) => {
										$qrCodeUrl = detail;
										$qrCodeFile = null;
									}}
								></InputLink>
							{/if}
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</Panel>
