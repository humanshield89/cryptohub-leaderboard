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
	{width}
	{height}
	viewBox="0 0 24 24"
	{fill}
	{stroke}
	stroke-width={strokeWidth}
	stroke-linecap={strokeLinecap}
	stroke-linejoin={strokeLinejoin}
	class={'feather feather-help-circle ' + $$props.class}
	{...$$restProps}
>
	<circle cx="12" cy="12" r="10" />
	<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
	<line x1="12" y1="17" x2="12.01" y2="17" />
</svg>
