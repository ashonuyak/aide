<script>
	import { slide } from 'svelte/transition';
</script>

<span
	transition:slide={{ axis: 'y', duration: 100 }}
	class="text-[#dc3545] text-[13px] font-semibold ml-1"
>
	<slot />
</span>
