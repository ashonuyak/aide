<script>
	import logo from '$lib/assets/aide-white.svg';
	import Avatar from '../Avatar/Avatar.svelte';
	import { user } from '$lib/stores/user.store';
</script>

<header class="flex items-center justify-between px-[24px] py-[12px] bg-primary">
	<div class="flex gap-12 items-center">
		<img src={logo} alt="Aide logo" class="h-[26px]" />

		<div class="flex gap-6 items-center">
			<a class="font-semibold text-[#fff] text-base" href="/categories">Categories</a>

			<a class="font-semibold text-[#fff] text-base" href="/campaigns">Campaigns</a>
		</div>
	</div>

	{#if $user}
		<div class="flex items-center gap-[32px]">
			<Avatar src={$user.avatarUrl} initials={$user.initials} width="w-[32px]" />
		</div>
	{/if}
</header>
