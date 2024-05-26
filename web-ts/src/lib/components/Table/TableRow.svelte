<script lang="ts">
	import { twMerge } from 'tailwind-merge';
</script>

<div
	class={twMerge(
		'relative grid items-center border-b border-b-[#e8e8e8] hover:bg-[#fbfbfb] pl-6',
		$$props.class
	)}
>
	<slot />
</div>
