<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	export { classes as class };
	let classes: string = '';

	const defaultClasses = 'px-2 py-[2px] rounded-full bg-[#C4FCD5] text-[12px] text-[#222] font-semibold';
</script>

<span class={twMerge(defaultClasses, classes)}><slot /></span>
