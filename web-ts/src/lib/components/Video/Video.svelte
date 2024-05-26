<script lang="ts">
	export let src: string;
	export let type: string = 'video/mp4';
	export let trackSrc: string = '';
	export let srclang: string = 'en';
	export let label: string = 'english_captions';
</script>

<video {...$$restProps} class={$$props.class}>
	<source {src} {type} />
	<slot />
	<track src={trackSrc} kind="captions" {srclang} {label} />
	Your browser does not support the video tag.
</video>
