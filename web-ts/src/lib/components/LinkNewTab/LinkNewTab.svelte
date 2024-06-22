<script lang="ts">
	import { mdiArrowTopRightThin } from '@mdi/js';
	import Icon from '../Icon/Icon.svelte';

	export let href: string;
</script>

<a {href} target="_blank" class="flex items-center gap-1 ">
	<slot />
	<Icon path={mdiArrowTopRightThin} color="#222" />
</a>
