<script>
	/**
	 * @typedef {'round' | 'inherit' | 'butt' | 'square' | null | undefined} StrokeLinecap
	 * @typedef {'round' | 'inherit' | 'miter' | 'bevel' | null | undefined} StrokeLinejoin
	 *
	 * @type {number | string}
	 */
	export let width = 24;

	/**
	 * @type {number | string}
	 */
	export let height = 24;

	/**
	 * @type {string}
	 */
	export let fill = 'none';

	/**
	 * @type {string}
	 */
	export let stroke = 'currentColor';

	/**
	 * @type {number}
	 */
	export let strokeWidth = 2;

	/**
	 * @type {StrokeLinecap}
	 */
	export let strokeLinecap = 'round';

	/**
	 * @type {StrokeLinejoin}
	 */
	export let strokeLinejoin = 'round';
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
	class={'feather feather-hash ' + $$props.class}
	{...$$restProps}
>
	<line x1="4" y1="9" x2="20" y2="9" />
	<line x1="4" y1="15" x2="20" y2="15" />
	<line x1="10" y1="3" x2="8" y2="21" />
	<line x1="16" y1="3" x2="14" y2="21" />
</svg>
