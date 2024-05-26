<script lang="ts">
	import PrimaryButton from '$lib/components/Button/PrimaryButton.svelte';
	import PublicMain from '$lib/components/Main/PublicMain.svelte';
	import { APP_ROUTES } from '$lib/constants/app-routes.constants';
	import { getAuth, type LoginDto, login } from '@aide/sdk';
	import googleIcon from '$lib/assets/icon-google.svg';
	import SimpleHeader from '$lib/components/Header/SimpleHeader.svelte';
	import InputText from '$lib/components/Input/InputText.svelte';
	import { slide } from 'svelte/transition';
	import InputPassword from '$lib/components/Input/InputPassword.svelte';
	import { ButtonType } from '$lib/enums/button-type.enum';
	import Form from '$lib/components/Form/Form.svelte';
	import { validate } from '$lib/utils/validate.util';
	import { clipboard } from '$lib/directives/use/clipboard.directive';

	let loginWithEmail: boolean;
	let userLoginInfo: LoginDto = { email: '', password: '' };

	async function beginOAuth() {
		const response = await getAuth();

		window.location.href = response.url;
	}

	async function logIn() {
		const response = await login({ loginDto: userLoginInfo });

		console.log('response :>> ', response);
	}

	function handleSubmit({ valid }: { valid: boolean }) {
		valid && logIn();
	}
</script>

<SimpleHeader />

<PublicMain>
	<div class="flex flex-col w-full h-full items-center justify-center gap-[80px]">
		<div class="flex flex-col items-center justify-center gap-[12px]">
			<div class="text-[48px] font-semibold">Welcome back</div>

			<div class="text-[24px]">Log in to continue</div>
		</div>

		<div class="flex flex-col items-center justify-center w-[440px]">
			<button
				on:click={beginOAuth}
				class="flex w-full justify-center gap-[8px] border-[#e8e8e8] border-[2px] py-[12px] rounded-[4px] items-center"
				><img src={googleIcon} alt="Google icon" />Log in with Google</button
			>

			<div class="divider flex items-center my-[16px] w-full">
				<span class="flex text-[#999] text-[12px] px-[8px] whitespace-nowrap">OR</span>
			</div>

			<Form
				on:submit={(event) => handleSubmit(event.detail)}
				classes="w-full flex flex-col gap-[12px] mb-[16px]"
			>
				{#if loginWithEmail}
					<div
						class="w-full flex flex-col gap-[12px]"
						transition:slide={{ axis: 'y', duration: 250 }}
					>
						<InputText
							placeholder="Email"
							bind:value={userLoginInfo.email}
							maxlength={200}
							validate={(value) => validate({ required: true, email: true }, value)}
						/>
						<InputPassword
							placeholder="Password"
							bind:value={userLoginInfo.password}
							maxlength={200}
							validate={(value) =>
								validate(
									{
										minlength: 12,
										maxlength: 36,
										required: true,
										password: true
									},
									value
								)}
						/>
					</div>
				{/if}

				<PrimaryButton
					on:click={(event) => {
						!loginWithEmail && event.preventDefault();
						loginWithEmail = true;
					}}
					type={ButtonType.Submit}
					><span class="font-semibold">Log in with email</span></PrimaryButton
				>
			</Form>

			<div class="flex gap-[8px] mt-[24px]">
				<span>Do not have an account?</span><a
					href={APP_ROUTES.SIGN_UP}
					class="text-blue font-semibold">Sign up</a
				>
			</div>
		</div>
	</div>
</PublicMain>

<style>
	.divider::before,
	.divider::after {
		content: '';
		background-color: #d9d9d9;
		display: block;
		height: 1px;
		width: 100%;
	}
</style>
