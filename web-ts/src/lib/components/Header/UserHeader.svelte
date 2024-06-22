<script>
	import logo from '$lib/assets/aide-white.svg';
	import Avatar from '../Avatar/Avatar.svelte';
	import { user } from '$lib/stores/user.store';
	import { APP_ROUTES } from '$lib/constants/app-routes.constants';
	import PrimaryButton from '../Button/PrimaryButton.svelte';
</script>

<header class="flex items-center justify-between px-[24px] py-[12px] bg-primary">
	<div class="flex gap-12 items-center">
		<a href="/"><img src={logo} alt="Aide logo" class="h-[26px]" /></a>

		<div class="flex gap-6 items-center">
			<a class="font-semibold text-[#fff] text-base" href="/categories">Categories</a>

			<a class="font-semibold text-[#fff] text-base" href="/campaigns">Campaigns</a>
		</div>
	</div>

	{#if $user}
		<div class="flex items-center gap-[32px]">
			<Avatar src={$user.avatarUrl} initials={$user.initials} width="w-[32px]" />
		</div>
	{:else}
		<PrimaryButton
			href={APP_ROUTES.SIGN_UP}
			class="h-[32px] px-4 rounded-[32px] !bg-[#fff] text-primary text-[15px]"
		>
			<span class="font-semibold">Become a fundraiser</span>
		</PrimaryButton>
	{/if}
</header>
