<script lang="ts">
	export let checked: boolean = false;
	export let disabled: boolean = false;
	export let color: string = 'black';

	const id: string = crypto.randomUUID();

	const configs: any = {
		black: { '--border-color': 'rgb(211, 211, 211)', '--bg-checked': '#222', '--bg-checked-hover': '#000', '--border-color-hover': '#aaa' },
		navy: { '--border-color': '#c4e0f9', '--bg-checked': '#253b80', '--bg-checked-hover': '#253b80', '--border-color-hover': '#c4e0f9' }
	};

	const cssVarStyles = Object.entries(configs[color])
		.map(([key, value]) => `${key}:${value}`)
		.join(';');
</script>

<div class="flex items-center text-[#222]" style={cssVarStyles}>
	<input type="checkbox" id="checkbox-{id}" class="hidden" bind:checked {disabled} on:change />

	<label
		class="flex items-center cursor-pointer font-medium text-[15px] relative leading-[18px] select-none"
		for="checkbox-{id}"
	>
		<slot></slot>
	</label>
</div>

<style>
	label::before {
		content: '';
		display: inline-block;
		border-radius: 4px;
		cursor: pointer;
		border: 2px solid;
		border-color: var(--border-color, rgb(211, 211, 211));
		background-color: #fff;
		width: 18px;
		height: 18px;
		margin-right: 8px;
	}

	input:checked + label::before {
		border: 0px;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18' fill='none'%3E%3Cpath d='M5 10L7 12L13 6' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' /%3E%3C/svg%3E");
		background-color: var(--bg-checked, #222);
		background-repeat: no-repeat;
	}

	input:checked:hover + label::before {
		background-color: var(--bg-checked-hover, #000000);
	}

	input:disabled + label {
		cursor: default;
		color: rgba(102, 102, 102, 0.6);
	}

	input:checked:disabled + label::before {
		background-color: #e6e6e6;
	}

	input:hover + label::before {
		border-color: var(--border-color-hover, #aaaaaa);
	}

	input:hover:disabled + label::before {
		border-color: rgba(103, 102, 102, 0.6);
	}
</style>
