<script lang="ts">
	export let width: number | string = 24;
	export let height: number | string = 24;
	export let fill: string = 'none';
	export let stroke: string = 'currentColor';
	export let strokeWidth: number = 2;
	export let strokeLinecap: 'round' | 'inherit' | 'butt' | 'square' | null | undefined = 'round';
	export let strokeLinejoin: 'round' | 'inherit' | 'miter' | 'bevel' | null | undefined = 'round';
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 24 24"
	{width}
	{height}
	{fill}
	{stroke}
	stroke-width={strokeWidth}
	stroke-linecap={strokeLinecap}
	stroke-linejoin={strokeLinejoin}
	class={'feather feather-external-link ' + $$props.class}
	{...$$restProps}
	><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline
		points="15 3 21 3 21 9"
	/><line x1="10" y1="14" x2="21" y2="3" /></svg
>
