<script>
	import PrimaryButton from '$lib/components/Button/PrimaryButton.svelte';
	import PublicHeader from '$lib/components/Header/PublicHeader.svelte';
	import PublicMain from '$lib/components/Main/PublicMain.svelte';
</script>

<div class="h-screen flex flex-col bg-primary">
	<PublicHeader />
	<PublicMain>
		<div class="main-section flex items-center justify-between px-[24px] w-full" style="background-image: url(https://files.umso.co/lib_NzBDnSGOloSegeaJ/6646861.jpeg)">
			<div>
				<div class="text-[36px] font-bold">Some text inspiring lalala</div>
				<div class="text-[20px] font-bold">
					Some text inspiring lalala more more text, we are happy meme
				</div>

				<PrimaryButton>Donate</PrimaryButton>

				<PrimaryButton>Become a fundraiser</PrimaryButton>
			</div>

			<div class="w-6/12"></div>
		</div>
	</PublicMain>
</div>

<style>
    .main-section {
        background-image: url(https://files.umso.co/lib_NzBDnSGOloSegeaJ/6646861.jpeg);
        background-size: cover;
        border-radius: 16px;
    }
</style>
