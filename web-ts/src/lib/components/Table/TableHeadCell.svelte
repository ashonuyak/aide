<script lang="ts">
	import { twMerge } from 'tailwind-merge';
</script>

<div class={twMerge('font-medium text-[#444]', $$props.class)}>
	<slot />
</div>
