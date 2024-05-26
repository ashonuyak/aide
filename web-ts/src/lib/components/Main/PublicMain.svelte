<main
	class="max-w-[1200px] tablet:max-w-[480px] laptop:max-w-[720px] laptopxl:max-w-[1040px] mobile:max-w-[458px] mobile:mx-[16px] m-auto py-10"
>
	<slot />
</main>

<style>
	main {
		height: 80%;
		width: 90%;
		background-color: white;
		border-radius: 24px;
        max-width: unset;
        display: flex;
	}
</style>
