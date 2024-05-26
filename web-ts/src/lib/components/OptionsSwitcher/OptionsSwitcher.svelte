<script lang="ts">
	import OptionsSwitcherItem from './OptionsSwitcherItem.svelte';

	const Components = { OptionsSwitcherItem };
</script>

<div class="inline-flex items-center overflow-hidden rounded-lg bg-[#f1f1f1] p-[2px]">
	<slot {Components} />
</div>
