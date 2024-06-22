<script lang="ts">
	import logo from '$lib/assets/aide-white.svg';
	import Avatar from '../Avatar/Avatar.svelte';
	import { user } from '$lib/stores/user.store';
	import Dropdown from '../Dropdown/Dropdown.svelte';
	import NoButton from '../Dropdown/NoButton.svelte';
	import { useLogout } from '$lib/api';

	let isAvatarDropdownOpened: boolean = false;

	const logout = useLogout();
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
			<Dropdown let:Components bind:open={isAvatarDropdownOpened} button={NoButton}>
				<span class="cursor-pointer" slot="title"
					><Avatar src={$user.avatarUrl} initials={$user.initials} width="w-[32px]" />
				</span>
				<Components.DropdownWindow class="w-[120px] border-2 border-[#e8e8e8] !shadow-none">
					<Components.DropdownItem
						on:click={() => {
							isAvatarDropdownOpened = false;
							$logout.mutate();
							window.location.href = '/';
						}}><span> Log out </span></Components.DropdownItem
					>
				</Components.DropdownWindow>
			</Dropdown>
		</div>
	{/if}
</header>
