<script lang="ts">
	import '../app.css';
	import { browser } from '$app/environment';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { user } from '$lib/stores/user.store';
	import { page } from '$app/stores';
	export let data;

	user.set(data.authenticated);

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});
</script>

<QueryClientProvider client={queryClient}>
	<slot />
</QueryClientProvider>

<svelte:head>
	<title>{$page.data.meta?.title || 'Web'} - Aide</title>
	<!-- <link rel="manifest" href="/manifest.json" /> -->
	<meta name="theme-color" content="currentColor" />

	{#if $page.data.meta}
		<meta name="description" content={$page.data.meta.description} />

		<!-- Facebook Meta Tags -->
		<!-- <meta property="og:type" content="website" />
		<meta property="og:title" content={$page.data.meta.title} />
		<meta property="og:description" content={$page.data.meta.description} />
		<meta property="og:image" content={$page.data.meta.imageUrl} /> -->

		<!-- Twitter Meta Tags -->
		<!-- <meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:title" content={$page.data.meta.title} />
		<meta name="twitter:description" content={$page.data.meta.description} />
		<meta name="twitter:image" content={$page.data.meta.imageUrl} /> -->
	{/if}
</svelte:head>

<style global>
	/* * {
        font-family: 'Inter', sans-serif;
        font-size: 16px;
		color: '#1d1d1b'
    } */
</style>
