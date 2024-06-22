<script lang="ts">
	import PrimaryButton from '$lib/components/Button/PrimaryButton.svelte';
	import PublicMain from '$lib/components/Main/PublicMain.svelte';
	import { APP_ROUTES } from '$lib/constants/app-routes.constants';
	import { getAuth, type SignUpDto, signUp } from '@aide/sdk';
	import googleIcon from '$lib/assets/icon-google.svg';
	import SimpleHeader from '$lib/components/Header/SimpleHeader.svelte';
	import InputText from '$lib/components/Input/InputText.svelte';
	import { slide } from 'svelte/transition';
	import InputPassword from '$lib/components/Input/InputPassword.svelte';
	import Form from '$lib/components/Form/Form.svelte';
	import { validate } from '$lib/utils/validate.util';
	import { ButtonType } from '$lib/enums/button-type.enum';

	let signUpWithEmail: boolean;
	let userSignUpInfo: SignUpDto = { username: '', email: '', password: '', firstName: '', lastName: '' };

	async function beginOAuth() {
		const response = await getAuth();

		window.location.href = response.url;
	}

	async function handleSignUp(event) {
		console.log('valid :>> ', event.detail.valid);

		if (event.detail.valid) {
			await signUp({ signUpDto: { ...userSignUpInfo, username: `${userSignUpInfo.firstName} ${userSignUpInfo.lastName}` } });

			window.location.href = '/auth/verify-email';
		}
	}
</script>

<SimpleHeader />

<PublicMain>
	<div class="flex flex-col w-full h-full items-center justify-center gap-[80px]">
		<div class="flex flex-col items-center justify-center gap-[12px]">
			<div class="text-[48px] font-semibold">Become a fundraiser!</div>

			<div class="text-[24px]">Join our mission to make a difference.</div>
		</div>

		<div class="flex flex-col items-center justify-center w-[440px]">
			<button
				on:click={beginOAuth}
				class="flex w-full justify-center gap-[8px] border-[#e8e8e8] border-[2px] py-[12px] rounded-[4px] items-center"
				><img src={googleIcon} alt="Google icon" />Sign up with Google</button
			>

			<div class="divider flex items-center my-[16px] w-full">
				<span class="flex text-[#999] text-[12px] px-[8px] whitespace-nowrap">OR</span>
			</div>

			<Form
				on:submit={handleSignUp}
				classes="w-full flex flex-col gap-[12px] mb-[16px]"
			>
				{#if signUpWithEmail}
					<div
						class="w-full flex flex-col gap-[12px]"
						transition:slide={{ axis: 'y', duration: 250 }}
					>
						<InputText
							placeholder="First name"
							bind:value={userSignUpInfo.firstName}
							maxlength={200}
							validate={(value) => validate({ required: true }, value)}
						/>
						<InputText
							placeholder="Last name"
							bind:value={userSignUpInfo.lastName}
							maxlength={200}
							validate={(value) => validate({ required: true }, value)}
						/>
						<!-- <div class="flex gap-2">
						</div> -->
						<InputText
							placeholder="Email"
							bind:value={userSignUpInfo.email}
							maxlength={200}
							validate={(value) => validate({ required: true, email: true }, value)}
						/>
						<InputPassword
							placeholder="Password"
							bind:value={userSignUpInfo.password}
							maxlength={200}
							validate={(value) =>
								validate(
									{
										minlength: 6,
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
						!signUpWithEmail && event.preventDefault();
						signUpWithEmail = true;
					}}
					--border-radius="4px"
					type={ButtonType.Submit}
					><span class="font-semibold">Sign up with email</span></PrimaryButton
				>
			</Form>

			<div class="flex gap-[8px] mt-[24px]">
				<span>Have an account?</span><a
					href={APP_ROUTES.LOG_IN}
					class="text-blue font-semibold">Log in</a
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
