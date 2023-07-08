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
	class={'feather feather-send ' + $$props.class}
	{...$$restProps}
>
	<line x1="22" y1="2" x2="11" y2="13" />
	<polygon points="22 2 15 22 11 13 2 9 22 2" />
</svg>
