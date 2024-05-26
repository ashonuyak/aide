<script lang="ts">
	import { twMerge } from 'tailwind-merge';
</script>

<div class={twMerge('relative grid items-center bg-[#f6f6f6] h-12 pl-6', $$props.class)}>
	<slot />
</div>
