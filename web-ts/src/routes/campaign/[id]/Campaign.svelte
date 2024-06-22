<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import Carousel from '$lib/components/Carousel/Carousel.svelte';
	import Badge from '$lib/components/Badge/Badge.svelte';
	import QrCode from '$lib/components/QRCode/QRCode.svelte';
	import Avatar from '$lib/components/Avatar/Avatar.svelte';
	import {
		type CampaignResponseDto,
		type FundraiserCampaignResponseDto,
		type UserMappedDto
	} from '@aide/sdk';
	import { categories } from '$lib/stores/categories.store';
	import PrimaryButton from '$lib/components/Button/PrimaryButton.svelte';
	import { clipboard } from '$lib/directives/use/clipboard.directive';
	import tooltip from '$lib/directives/use/tooltip.directive';

	export { classes as class };
	export let campaign: (CampaignResponseDto | FundraiserCampaignResponseDto) & {
		closedCampaignsCount: number;
	};
	export let fundraiser: UserMappedDto;

	let classes: string = '';
	const defaultClasses: string = 'relative mx-auto space-y-8 max-w-[1120px]';

	const closedCampaignsCount = campaign.closedCampaignsCount;

	const carouselImages = [campaign.mainImage, ...campaign.media].map((src) => ({
		src,
		alt: 'Fundraising campaign media image'
	}));

	const category = $categories.find(({ _id }) => _id === campaign.categoryId) || {
		title: 'No way',
		color: 'maroon'
	};
	const { title: categoryTitle, color } = category;

	let payPalForm: HTMLFormElement;

	console.log('campaign :>> ', campaign);
</script>

<div class={twMerge(defaultClasses, classes)}>
	<!-- header -->
	<div class="flex items-center justify-between">
		<div>
			<div class="flex items-center gap-4">
				<div class="font-semibold text-4xl line-clamp-2">{campaign.title}</div>
				<Badge class="text-base font-medium px-3 py-1 truncate">{categoryTitle}</Badge>
			</div>
		</div>
		{#if campaign.qrCode || campaign.qrCodeUrl}
			<div class="fundraiser-fake-card relative w-12 h-12">
				<div class="fundraiser-card-avatar absolute inset-0 z-20">
					<Avatar
						src={fundraiser.avatarUrl}
						initials={fundraiser.initials}
						width="w-12"
					/>
				</div>
				<div
					class="fundraiser-card shadow-container rounded-lg absolute right-2 top-2 w-0 h-0 z-10 overflow-hidden opacity-0 flex flex-col justify-between"
				>
					<div class="">
						<div class="font-semibold truncate text-lg">{fundraiser.username}</div>
						<div class="text-sm font-medium truncate">
							{fundraiser.email || 'Fundraiser'}
						</div>
					</div>
					<!-- {#if closedCampaignsCount > 0}
						<div class="text-sm text-[#9d9d9d]">
							Successfully closed {closedCampaignsCount}
							{closedCampaignsCount === 1 ? 'campaign' : 'campaigns'}
						</div>
					{/if} -->
					<div class="truncate text-sm text-[#9d9d9d]">
						Member since {new Date(fundraiser.createdAt).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					</div>
				</div>
			</div>
		{/if}
	</div>

	<!-- body -->
	<div class="grid grid-cols-[1fr_360px] gap-8">
		<div class="space-y-8">
			<Carousel images={carouselImages} let:Controls imgClass="object-contain" class="">
				{#if carouselImages.length > 1}
					<Controls />
				{/if}
			</Carousel>

			<div class="text-lg leading-[22px] pt-6 border-t-2 border-t-[#e8e8e8]">{campaign.description}</div>
		</div>

		<div class="space-y-4 right-card p-6 rounded-lg h-fit">
			{#if campaign.qrCode || campaign.qrCodeUrl}
				{#if campaign.qrCodeUrl}
					<div class="flex w-full items-center justify-center">
						<QrCode data={campaign.qrCodeUrl} class="w-[240px]" />
					</div>
				{/if}
				{#if campaign.qrCode}
					<img
						src={campaign.qrCode}
						alt="QR code"
						class="w-32 rounded-lg cursor-pointer shadow-container"
					/>
				{/if}
			{:else}
				<div class="inline-flex justify-between w-full">
					<!-- <div class="fundraiser-card-avatar z-20"> -->
					<!-- </div> -->

					<div class="max-w-[260px]">
						<div class="overflow-hidden">
							<div class="font-semibold truncate text-lg">{fundraiser.username}</div>
							<div
								class="text-sm font-medium truncate"
								use:tooltip={{
									content: fundraiser.email,
									appendTo: 'parent',
									interactive: true
								}}
							>
								{fundraiser.email || 'Fundraiser'}
							</div>
						</div>
						<!-- {#if closedCampaignsCount > 0}
							<div class="text-sm text-[#9d9d9d]">
								Successfully closed {closedCampaignsCount}
								{closedCampaignsCount === 1 ? 'campaign' : 'campaigns'}
							</div>
						{/if} -->
						<div class="truncate text-sm text-[#9d9d9d]">
							Member since {new Date(fundraiser.createdAt).toLocaleDateString(
								'en-US',
								{
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								}
							)}
						</div>
					</div>
					<div>
						<Avatar
							src={fundraiser.avatarUrl}
							initials={fundraiser.initials}
							width="w-12"
						/>
					</div>
				</div>
			{/if}
			{#if campaign.subtitle}
				<div class="font-regular text-[#666] line-clamp-5 text-lg">
					{campaign.subtitle}
				</div>
			{/if}
			{#if campaign.payPalEnabled}
				<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
					<input type="hidden" name="cmd" value="_donations" />
					<input type="hidden" name="business" value="ashonuyak@gmail.com" />
					<input type="hidden" name="currency_code" value="USD" />
					<input type="hidden" name="item_name" value="Support the Cause!" />
					<PrimaryButton animate class="font-semibold w-full"
						>Donate with PayPal</PrimaryButton
					>
				</form>
			{/if}

			<div class="relative">
				<PrimaryButton class="font-semibold w-full">Share</PrimaryButton>
			</div>
		</div>
	</div>

	{#if campaign.paymentCards.filter(({ value }) => value)?.length}
		<div>
			<div class="text-lg font-medium">Payment cards</div>

			<div class="grid grid-cols-[auto_1fr] gap-x-4">
				{#each campaign.paymentCards as paymentCard}
					<div class="truncate">{paymentCard.key}</div>
					<div class="truncate w-fit cursor-pointer" use:clipboard={{ content: paymentCard.value, appendTo: 'parent' }}>{paymentCard.value}</div>
				{/each}
			</div>
		</div>
	{/if}

	{#if campaign.additionalLinks.filter(({ value }) => value)?.length}
		<div>
			<div class="text-lg font-medium">Additional links</div>

			<div class="grid grid-cols-[auto_1fr] gap-x-4">
				{#each campaign.additionalLinks as additionalLink}
					<div class="truncate">{additionalLink.key}</div>
					<a class="truncate underline text-[#006ce7]" href={additionalLink.value}>{additionalLink.value}</a>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.shadow-container,
	.right-card {
		box-shadow:
			0px 0px 0px 1px rgba(0, 0, 0, 0.04),
			0px 4px 6px 0px rgba(0, 0, 0, 0.08);
	}

	.right-card {
		box-shadow: 0 0.3125rem 1rem -0.1875rem #0003;
	}

	@keyframes pulse {
		0% {
			transform: scale(1);
		}

		50% {
			transform: scale(1.05);
		}

		100% {
			transform: scale(1);
		}
	}
	.fundraiser-card-avatar {
		animation: pulse 2s infinite linear;
	}

	.fundraiser-fake-card {
		z-index: 99999999;
	}

	.fundraiser-card,
	.fundraiser-card-avatar {
		transition: all 200ms ease-in-out;
	}

	.fundraiser-fake-card:hover .fundraiser-card-avatar {
		transform: scale(1.05);
		animation: none;
	}

	.fundraiser-fake-card:hover .fundraiser-card {
		width: 320px;
		height: 120px;
		transform: translate(8px, -8px);
		padding: 16px;
		top: 0;
		right: 0;
		background-color: white;
		opacity: 1;
	}
</style>
