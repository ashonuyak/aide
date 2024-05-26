<script lang="ts">
	import TableHead from "./TableHead.svelte";
	import TableHeadCell from "./TableHeadCell.svelte";
	import TableRow from "./TableRow.svelte";
	import TableRowCell from "./TableRowCell.svelte";

    const Components = {
        TableHead,
        TableHeadCell,
        TableRow,
        TableRowCell
    };
</script>
<div>
    <slot {Components} />
</div>