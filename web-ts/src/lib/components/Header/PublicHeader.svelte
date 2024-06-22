<script>
	import logo from '$lib/assets/aide-white.svg';
	import PrimaryButton from '../Button/PrimaryButton.svelte';
	import { APP_ROUTES } from '$lib/constants/app-routes.constants';
</script>

<header class="flex items-center justify-between px-[48px] py-[24px] w-full">
	<div>
		<img src={logo} alt="Aide logo" class="h-[32px]" />
	</div>

	<div class="flex items-center gap-[32px]">
		<a href={APP_ROUTES.LOG_IN} class="flex hover:text-[#fff] text-[#fff] font-semibold">
			Log in
		</a>
		<PrimaryButton
			href={APP_ROUTES.SIGN_UP}
			class="h-[40px] w-[120px] rounded-[32px] !bg-[#fff] text-primary"
		>
			<span class="font-semibold">Sign up</span>
		</PrimaryButton>
	</div>
</header>
