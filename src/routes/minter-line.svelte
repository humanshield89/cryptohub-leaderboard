<script lang="ts">
	import { browser } from '$app/environment';
	import * as blockies from 'blockies-ts';
	import ExternalLinkIcon from '../icons/external-link-icon.svelte';
	import CopyIcon from '../icons/copy-icon.svelte';
	import toast, { Toaster } from 'svelte-french-toast';
	import HashIcon from '../icons/hash-icon.svelte';
	import PackageIcon from '../icons/package-icon.svelte';
	import ActivityIcon from '../icons/activity-icon.svelte';
	import { fade, crossfade, slide, fly } from 'svelte/transition';
	import {
		connected,
		provider,
		chainId,
		chainData,
		signer,
		signerAddress,
		contracts
	} from 'ethers-svelte';
	import QuestionCircleIcon from '../icons/question-circle-icon.svelte';
	import { getHubDropPrize, getRankPrize } from '../utils/utils';

	type MinterStats = {
		_id: string;
		count: number;
		rarities: Array<string>;
		averageBlockNumber: number;
	};
	export let minterStats: MinterStats | undefined;
	export let raritiesCount: Array<number> = [];
	export let availableRarities: Array<string> = [];
	export let rarityScore: number = 0;
	export let rank: number = 0;

	$: inDelay = 100 * rank;
	let animated = false;

	const rarityNames = ['10 $HUB', '200 $HUB', '100 $HUB', '10.000 $HUB', 'Shareholder NFT'];

	const raritiesbgAndTextColors = [
		'bg-yellow-400 bg-opacity-80 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900',
		'bg-gray-400 bg-opacity-80 bg-gradient-to-r from-gray-400 to-gray-500 text-white',
		'bg-yellow-600 bg-opacity-80 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white',
		'bg-gray-600 bg-opacity-80 bg-gradient-to-r from-gray-600 to-gray-700 text-white',
		'bg-yellow-800 bg-opacity-80 bg-gradient-to-r from-yellow-800 to-yellow-900 text-white'
	].reverse();

	let imgSrc = '';

	if (browser) {
		imgSrc = blockies
			.create({
				seed: minterStats?._id,
				size: 8,
				scale: 16
			})
			.toDataURL();
	} else {
		imgSrc = '';
	}

	const shortenAddress = (address: string) => {
		return `${address.slice(0, 6)}...${address.slice(-4)}`;
	};

	function rankWithSufix(num: number) {
		const j = num % 10,
			k = num % 100;
		if (j == 1 && k != 11) {
			return num + 'st';
		}
		if (j == 2 && k != 12) {
			return num + 'nd';
		}
		if (j == 3 && k != 13) {
			return num + 'rd';
		}
		return num + 'th';
	}

	$: {
		//if (rank > 0) {
		setTimeout(() => {
			animated = true;
		}, inDelay);
		//}
	}

	const rankBackgroudColor = (rank: number) => {
		switch (rank) {
			case 1:
				return 'bg-yellow-400 bg-opacity-80 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white';
			case 2:
				return 'bg-gray-400 bg-opacity-80 bg-gradient-to-r from-gray-400 to-gray-500 text-white';
			case 3:
				return 'bg-yellow-600 bg-opacity-80 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white';
			default:
				return 'bg-base-300 bg-opacity-80 bg-gradient-to-r from-base-300 to-base-400 text-neutral-content';
		}
	};
</script>

{#if animated}
	<div
		class="flex bg-base-200 p-1 md:p-2 rounded-xl shadow-md gap-2 md:gap-4 items-center w-full border border-solid border-base-300"
		transition:fly={{ x: -100, duration: 1000, delay: inDelay }}
	>
		<div class={'avatar ' + ($signerAddress?.toLowerCase() === minterStats?._id ? 'online' : '')}>
			<div class={`avatar placeholder ${rank === 1 ? 'animate-none md:animate-bounce' : ''}`}>
				<div
					class={`text-neutral-content rounded-full w-12 ${rankBackgroudColor(rank)} ${
						rank > 3 ? 'bg-opacity-80' : ''
					}`}
				>
					<span class="text-xl font-extrabold"> {rankWithSufix(rank)} </span>
				</div>
			</div>
		</div>
		<div class="flex flex-col justify-between h-full p-2 gap-2">
			<div class="text-xs font-bold flex items-center ml-1">
				{shortenAddress(minterStats?._id || '')}
				<a
					href={`https://etherscan.io/address/${minterStats?._id}`}
					target="_blank"
					rel="noopener noreferrer"
					class="ml-2 tooltip"
					data-tip="View on Etherscan"
				>
					<ExternalLinkIcon class=" w-3 h-3 ml-1" />
				</a>
				<button
					class="ml-2 tooltip hidden md:inline"
					data-tip="Copy address"
					on:click={() => {
						navigator.clipboard.writeText(minterStats?._id || '');
						toast.success('Copied to clipboard');
					}}
				>
					<CopyIcon class=" w-3 h-3 ml-1" />
				</button>
			</div>

			<div class="flex gap-1">
				{#each availableRarities as rarity, index}
					{#if raritiesCount[index] > 0}
						<div
							class={`p-1 whitespace-nowrap text-xs tooltip cursor-pointer rounded-xl bg-opacity-40 ${raritiesbgAndTextColors[index]}`}
							data-tip={rarity}
						>
							<!--{rarityNames[index]}-->
							<span class="hidden md:inline">
								{rarityNames[index]}
							</span>
							<b> ({raritiesCount[index]})</b>
						</div>
					{/if}
				{/each}
			</div>
		</div>
		<div class="flex-1 flex justify-end">
			<div class={`flex gap-2`}>
				<!--
				<div
					class="pb-2 md:flex justify-center items-center gap-1 tooltip cursor-pointer hidden"
					data-tip="Averaged Purchase Block Number"
				>
					<PackageIcon class="w-4 h-4 text-white" />
					<b>
						{Math.round(minterStats?.averageBlockNumber || 0)}
					</b>
				</div>
-->
				<div
					class="justify-between items-between flex-col flex px-0 md:px-4 cursor-pointer text-center"
				>
					<span class="text-base text-white">Prize Collected</span>
					<span class=" text-lg font-bold">
						<span>{getHubDropPrize(minterStats?.rarities)}</span>
						<span class=" text-sm font-normal text-cyan-200"> $HUB </span>
					</span>
				</div>
				<div
					class="justify-between items-between hidden flex-col md:flex px-0 md:px-4 cursor-pointer text-center"
				>
					<span class="text-base text-white">Total minted</span>
					<span class="text-xl font-bold">
						{minterStats?.count}
					</span>
				</div>
				{#if !!getRankPrize(rank)}
					<div
						class="justify-between items-between flex-col flex px-0 md:px-4 cursor-pointer text-center"
					>
						<span class="text-base text-white">Rank Prize</span>
						<span class="text-lg font-bold">
							{getRankPrize(rank).split(' ')[0]}
							<span class=" text-sm font-normal text-cyan-200">
								{getRankPrize(rank).split(' ')[1]}
							</span>
						</span>
					</div>
				{/if}
				<!--
				<div
					class="md:flex justify-center items-end gap-1 tooltip cursor-pointer hidden"
					data-tip="Rarity score of all minted tokens"
				>
					<ActivityIcon class="w-4 h-4 text-white my-auto" />
					<b class="my-auto">
						{rarityScore}
					</b>
				</div>
				-->
			</div>
		</div>
	</div>
{/if}
