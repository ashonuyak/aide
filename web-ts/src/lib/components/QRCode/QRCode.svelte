<script lang="ts">
	import { onMount } from 'svelte';
	import { twMerge } from 'tailwind-merge';
    import logo from '$lib/assets/logo.png';

	export { classes as class };
	let classes: string = '';
	const defaultClasses: string = '';

	export let data: any;
	export let image: string | undefined = logo;
	export let color: string = '#1d1d1b';

	let node: HTMLElement;

	let qrCode;

	onMount(() => {
		import('qr-code-styling').then(({ default: QRCodeStyling }) => {
			qrCode = new QRCodeStyling({
				data,
				qrOptions: {
					typeNumber: 0,
					mode: 'Byte',
					errorCorrectionLevel: 'L'
				},
				margin: 0,
				imageOptions: { hideBackgroundDots: true, imageSize: 0.7, margin: 8 },
				image,
				dotsOptions: { type: 'extra-rounded', color },
				cornersSquareOptions: { type: 'extra-rounded', color },
				cornersDotOptions: { type: 'dot', color }
			});
			qrCode.append(node);
			node.insertAdjacentHTML(
				'beforeend',
				`
                    <style>
                        canvas {
                            width: 100%;
                            height: 100%;
                            box-sizing: border-box;
                            border-radius: 8px;
                            padding: 8px;
                            cursor: pointer;
                            box-shadow:
                                0px 0px 0px 1px rgba(0, 0, 0, 0.04),
                                0px 4px 6px 0px rgba(0, 0, 0, 0.08);
                        }
                    </style>
                `
			);
		});
	});
</script>

<div class={twMerge(defaultClasses, classes)} bind:this={node}></div>
