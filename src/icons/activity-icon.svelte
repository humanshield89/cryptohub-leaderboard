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
	class={'feather feather-activity ' + $$props.class}
	{...$$restProps}
>
	<polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
</svg>
