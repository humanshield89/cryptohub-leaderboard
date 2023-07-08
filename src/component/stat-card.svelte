<script>
	import { fade, fly } from 'svelte/transition';
	/**
	 * @type {string}
	 */
	export let label;

	/**
	 * @type {string}
	 */
	export let value;

	export let animated = false;

	$: {
		if (animated) {
			setTimeout(() => {
				animated = false;
			}, 50);
		}
	}
</script>

{#if !animated}
	<div
		in:fly={{ y: 100, duration: 1000 }}
		out:fly={{ y: -100, duration: 1000 }}
		class="flex justify-center items-center gap-3 w-full py-4 px-4 bg-base-200 rounded-lg border border-solid border-base-300 text-center shadow-md"
	>
		<div class="flex justify-center items-center flex-col gap-3">
			<p class="text-gray font-medium text-base">
				{label}
			</p>
			<h2
				class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
			>
				{value}
			</h2>
		</div>
	</div>
{/if}
