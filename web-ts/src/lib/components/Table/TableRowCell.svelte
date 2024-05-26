<script>
	import { twMerge } from 'tailwind-merge';
</script>

<div class={twMerge('py-6 text-[#444]', $$props.class)}>
	<slot />
</div>
