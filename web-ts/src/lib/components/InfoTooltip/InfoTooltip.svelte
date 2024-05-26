<script lang="ts">
	import { mdiInformationOutline } from '@mdi/js';
	import Icon from '../Icon/Icon.svelte';
	import tooltip from '$lib/directives/use/tooltip.directive';
	import type { Props } from 'tippy.js';

	export let options: Partial<Props> = {};
    export let size: number = 16;
    export let color: string = '#999';
</script>

<div class="flex items-center">
	<div use:tooltip={options}>
		<Icon path={mdiInformationOutline} {size} {color} />
	</div>
	<slot />
</div>
