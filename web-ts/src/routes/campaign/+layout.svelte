<script>
	import UserHeader from '$lib/components/Header/UserHeader.svelte';
</script>

<UserHeader />

<div class="slim-mainpanel">
	<div class="container">
		<slot />
	</div>
</div>

<style>
	.slim-mainpanel {
		min-height: 88vh;
	}
	.slim-mainpanel .container {
		max-width: 1600px;
		width: 80%;
		padding: 82px 0;
		margin: 0 auto;
		box-sizing: border-box;
	}

	@media only screen and (max-width: 1024px) {
		.slim-mainpanel .container {
			padding: 32px 24px;
			width: 100%;
		}
	}
</style>
