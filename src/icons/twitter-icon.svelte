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
	class={'feather feather-twitter ' + $$props.class}
	{...$$restProps}
>
	<path
		d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
	/>
</svg>
