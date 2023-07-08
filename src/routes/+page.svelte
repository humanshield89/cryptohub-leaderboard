<script lang="ts">
	import { page } from '$app/stores';
	import MinterLine from './minter-line.svelte';
	import { Toaster } from 'svelte-french-toast';
	import { defaultEvmStores } from 'ethers-svelte';
	import { onMount } from 'svelte';
	import Carousel from 'svelte-carousel';
	import { browser } from '$app/environment';

	import {
		connected,
		provider,
		chainId,
		chainData,
		signer,
		signerAddress,
		contracts
	} from 'ethers-svelte';
	import ExternalLinkIcon from '../icons/external-link-icon.svelte';
	import { goto } from '$app/navigation';
	import TwitterIcon from '../icons/twitter-icon.svelte';
	import SendIcon from '../icons/send-icon.svelte';
	import DiscordIcon from '../icons/discord-icon.svelte';
	import { fade, fly } from 'svelte/transition';

	const rareNFTImages = {
		606: '/1543.webp',
		701: '/1629.webp',
		1126: '/2010.webp',
		1208: '/2085.webp',
		2751: '/3474.webp',
		3231: '/3906.webp',
		4077: '/4668.webp',
		4158: '/4740.webp',
		4417: '/4974.webp',
		4902: '/91.webp'
	};

	const rareNFTToArrary = [
		'/1543.webp',
		'/1629.webp',
		'/2010.webp',
		'/2085.webp',
		'/3474.webp',
		'/3906.webp',
		'/4668.webp',
		'/4740.webp',
		'/4974.webp',
		'/91.webp'
	];

	const availableRarities = [
		'10 $HUB Prize',
		'200 $HUB Prize',
		'100 $HUB Prize',
		'10.000 $HUB Prize',
		'Shareholder NFT Winner'
	];
	const raritiesScore = [1, 2, 3, 4, 5];

	const stats = $page.data.minters?.data?.minterStats || [];
	const allMints: Array<any> = $page.data.minters?.data?.allMints || [];

	$: sortedStats = stats?.sort((a, b) => {
		if (a.count === b.count) {
			// compare averageBlock
			if (a.averageBlockNumber === b.averageBlockNumber) {
				// compare score
				const formattedRaritiesA = formattedRarities(a.rarities);
				const formattedRaritiesB = formattedRarities(b.rarities);

				const scoreA = formattedRaritiesA.reduce((acc, curr, index) => {
					return acc + curr * raritiesScore[index];
				}, 0);

				const scoreB = formattedRaritiesB.reduce((acc, curr, index) => {
					return acc + curr * raritiesScore[index];
				}, 0);

				return scoreB - scoreA;
			} else {
				return a.averageBlockNumber - b.averageBlockNumber;
			}
		} else {
			return b.count - a.count;
		}
	});

	$: topMints = [...allMints]
		.filter((mint) => mint.rarity === /*'100 $HUB Prize' ||*/ 'Shareholder NFT Winner')
		.slice(0, 10);

	let pageNumber = 1;
	let perPage = 8;
	$: totlaPages = Math.ceil(sortedStats?.length / perPage);
	$: allPages = Array.from({ length: totlaPages }, (_, i) => i + 1);
	// if pages are less than 6, show all pages otherwise show the first 3, last 3 and the current page
	$: pages =
		totlaPages < 6 ? allPages : [1, 2, 3, '...', totlaPages - 2, totlaPages - 1, totlaPages];

	$: paginatedStats = [...sortedStats]?.slice((pageNumber - 1) * perPage, pageNumber * perPage);

	const formattedRarities = (raritiesArray: Array<String>) => {
		const raritiesCount = availableRarities.map((rarity) => {
			return raritiesArray?.filter((rarityArray) => rarityArray === rarity).length;
		});

		return raritiesCount;
	};

	let animated = false;

	$: {
		if (browser) {
			setTimeout(() => {
				animated = true;
			}, 100);
		}
	}

	onMount(() => {
		// Add a test to return in SSR context
		//defaultEvmStores.setProvider();
	});

	const getImage = (tokenId: number) => {
		if (rareNFTImages[tokenId]) {
			return rareNFTImages[tokenId];
		} else {
			// return a random image from rareNFTToArrary
			return rareNFTToArrary[Math.floor(Math.random() * rareNFTToArrary.length)];
		}
	};

	$: currentUserRank = !$connected
		? 0
		: sortedStats?.findIndex((stat) => {
				console.log(stat._id, $signerAddress);
				return stat._id === $signerAddress;
		  }) + 1;
</script>

<svelte:head>
	<title>CryptoHubby Leaderboard</title>
	<meta
		name="description"
		content="Welcome to the Hubby Collection, a unique and captivating world of digital collectibles that will take your imagination on an extraordinary journey.

	This Genesis Collection was created with passion and attention to detail, each Hubby is a carefully crafted masterpiece with prizes inside waiting to be discovered."
	/>
</svelte:head>
<Toaster
	position="bottom-right"
	toastOptions={{
		duration: 1000,
		style: 'background: #333; color: #fff;'
	}}
/>
<div class=" h-24 flex items-center justify-center text-white text-2xl font-extrabold md:p-2 p-0">
	<div class="flex justify-between items-center w-full max-w-7xl px-2 md:px-4">
		<img src="/logo.png" class="h-24 mr-4" alt="cryptohub" />
		<div class="flex gap-1 items-center flex-wrap md:flex-nowrap">
			<button
				class="btn bg-base-300 w-full md:w-auto hover:bg-base-200 tooltip tooltip-bottom btn-sm md:btn-md"
				data-tip={$connected ? 'Disconnect Wallet' : 'Connect Wallet'}
				on:click={() => {
					if ($connected) {
						defaultEvmStores.disconnect();
					} else {
						defaultEvmStores.setProvider();
					}
				}}
			>
				{#if $connected}
					{$signerAddress.slice(0, 6)}...{$signerAddress.slice(-4) || ''}
				{:else}
					Connect Wallet
				{/if}
			</button>
			<button
				class="btn btn-primary w-full md:w-auto tooltip tooltip-bottom btn-sm md:btn-md"
				data-tip="View on Opensea"
				on:click={() => {
					window.open('https://opensea.io/collection/crypto-hubby-s/drop', '_blank');
				}}
			>
				Mint <ExternalLinkIcon class="w-4 h-4 inline-block" />
			</button>
		</div>
	</div>
</div>
<div class="flex flex-col p-0 items-center max-w-7xl gap-4 justify-center w-full m-auto mb-12">
	<!--
        heading with gradient text
    -->

	<div class="flex w-full gap-4 md:flex-nowrap flex-wrap-reverse">
		<div class="flex flex-col gap-4 basis-full w-full md:basis-3/5 lg:basis-3/5 px-2 md:px-0">
			{#if animated}
				<h1
					in:fly={{ y: -100, duration: 1000, delay: 100 }}
					out:fly={{ y: 100, duration: 1000, delay: 100 }}
					class="font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-primary to-secondary text-center m-auto my-4"
				>
					CryptoHubby Leaderboard
				</h1>

				<div
					in:fly={{ y: 100, duration: 1000, delay: 100 }}
					out:fly={{ y: -100, duration: 1000, delay: 100 }}
					class={`w-full flex justify-between ${
						$connected && currentUserRank ? 'justify-between' : 'justify-center'
					}`}
				>
					<div class="join">
						{#each pages as p}
							<button
								disabled={isNaN(Number(p))}
								class={`join-item btn btn-xs ${pageNumber == p ? 'btn-active' : ''}`}
								on:click={() => {
									if (isNaN(Number(p))) return;
									pageNumber = Number(p);
								}}
							>
								{p}
							</button>
						{/each}
					</div>
					{#if $connected}
						<div>
							My Rank: <b
								>{$connected
									? (currentUserRank && currentUserRank.toString().padStart(3, '0')) ||
									  'No Participation'
									: 'Connect Wallet'}</b
							>
						</div>
					{/if}
				</div>
			{/if}
			{#each paginatedStats as userStats, index}
				<MinterLine
					minterStats={userStats}
					{availableRarities}
					rank={(pageNumber - 1) * perPage + index + 1}
					raritiesCount={formattedRarities(userStats.rarities)}
					rarityScore={formattedRarities(userStats.rarities).reduce((acc, curr, index) => {
						return acc + curr * raritiesScore[index];
					}, 0)}
				/>
			{/each}
		</div>
		<div
			class=" w-full h-full basis-full md:basis-2/5 lg:basis-2/5 overflow-hidden flex flex-col justify-center items-center md:pl-4 md:border-l border-l-base-300"
		>
			{#if animated}
				<div in:fly={{ y: -100, duration: 1000, delay: 100 }}>
					<h1
						class="font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-primary to-secondary text-center w-fit m-auto my-4"
					>
						Top Mints
					</h1>
				</div>
				<div
					in:fly={{ y: 100, duration: 1000, delay: 100 }}
					out:fly={{ y: -100, duration: 1000, delay: 100 }}
					class="w-full"
				>
					{#if browser && topMints && topMints.length > 0}
						<Carousel particlesToShow={3} particlesToScroll={2}>
							{#each topMints as mint, index}
								<div class="p-1">
									<div class="rounded-xl bg-base-200 p-0">
										<img
											src={getImage(mint.hubbyId || 0) || '/1543.webp'}
											class=" w-full rounded-t-md"
											alt="nft"
											loading="lazy"
										/>
										<div class="p-2">
											<h1 class="text-sm font-bold text-center text-white">
												{mint.minter.slice(0, 6)}...{mint.minter.slice(-4) || ''}
											</h1>
											<a
												href={`https://opensea.io/assets/ethereum/0x21c040a28682bfbf94a6b3a6312fbf1225cb2e10/${mint.hubbyId}`}
												target="_blank"
												class="btn btn-xs w-full mt-1 flex items-center justify-center bg-base-300 hover:bg-base-200"
											>
												OpenSea
											</a>
										</div>
									</div>
								</div>
							{/each}
						</Carousel>
					{:else}
						<div>
							<div class="flex flex-col gap-2">
								<div class="rounded-xl bg-base-200 p-0">
									<div
										class="w-full h-48 rounded-md bg-base-300 flex justify-center items-center animate-pulse"
									>
										No Top Mints Yet
									</div>
								</div>
							</div>
						</div>
					{/if}
				</div>
				<div class="w-full hidden md:block">
					<h1
						in:fly={{ y: -100, duration: 1000, delay: 100 }}
						out:fly={{ y: 100, duration: 1000, delay: 100 }}
						class="font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-primary to-secondary text-center w-fit m-auto my-4"
					>
						CryptoHub Links
					</h1>
					<div
						in:fly={{ y: 100, duration: 1000, delay: 100 }}
						out:fly={{ y: -100, duration: 1000, delay: 100 }}
						class="flex flex-wrap gap-2 w-full justify-center"
					>
						<div
							class=" basis-[48%] flex justify-center p-4 gap-1 flex-col items-center bg-base-200 shadow-sm rounded-lg"
						>
							<h1 class="font-extrabold ext-center w-fit m-auto">Crypto Hub Dapp</h1>
							<p class="text-sm text-justify flex-1">
								One-Stop-Shop Launchpad for Web3 Projects where exciting projects host their
								presales and other sales before they get listed on exchanges.
							</p>
							<a
								class="btn rounded-xl w-full btn-sm btn-primary btn-outline mt-1"
								href="https://cryptohub.investments/"
								target="_blank"
							>
								Visit <ExternalLinkIcon class="w-4 h-4 inline-block" />
							</a>
						</div>
						<div
							class=" basis-[48%] flex justify-center p-4 gap-1 flex-col items-center bg-base-200 shadow-sm rounded-lg"
						>
							<h1 class="font-extrabold ext-center w-fit m-auto">Cryptohub Foundation</h1>
							<p class="text-sm text-justify flex-1">
								We are creating a fully featured Launchpad but distributing its ownership across key
								players and crypto investors in the web3.
							</p>
							<a
								class="btn rounded-xl w-full btn-sm btn-primary btn-outline mt-1"
								href="https://cryptohub.foundation/"
								target="_blank"
							>
								Mint Share <ExternalLinkIcon class="w-4 h-4 inline-block" />
							</a>
						</div>
						<a
							class="btn btn-circle flex justify-center items-center tooltip mt-2"
							data-tip="Visit Our Twitter"
							href="https://twitter.com/Crypto_hub_web3"
							target="_blank"
						>
							<TwitterIcon />
						</a>

						<a
							class="btn btn-circle flex justify-center items-center tooltip mt-2"
							data-tip="Telegram Group"
							href="https://t.me/cryptohublaunchpad"
							target="_blank"
						>
							<SendIcon />
						</a>

						<a
							class="btn btn-circle flex justify-center items-center tooltip mt-2"
							data-tip="Visit Our Discord"
							href="https://discord.com/invite/eDP5YTbBgA"
							target="_blank"
						>
							<DiscordIcon />
						</a>
					</div>
				</div>

				<div class="w-full hidden md:block">
					<h1
						in:fly={{ y: -100, duration: 1000, delay: 100 }}
						out:fly={{ y: 100, duration: 1000, delay: 100 }}
						class="font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-primary to-secondary text-center w-fit m-auto my-4"
					>
						How to Participate?
					</h1>
					<div
						in:fly={{ y: 100, duration: 1000, delay: 100 }}
						out:fly={{ y: -100, duration: 1000, delay: 100 }}
						class="flex flex-wrap gap-2 w-full justify-start"
					>
						<ol class=" list-inside list-decimal">
							<li class="text-md text-justify flex-1">
								Visit
								<a
									class=" link-primary"
									href="https://opensea.io/collection/crypto-hubby-s/drop"
									target="_blank">CryptoHubby Drop</a
								>.
							</li>
							<li class="text-md text-justify flex-1">
								Mint your CryptoHubby NFT by clicking on the Mint button.
							</li>
							<li class="text-md text-justify flex-1">The More you mint the better you rank.</li>
						</ol>
					</div>
				</div>

				<div class="w-full hidden md:block">
					<h1
						in:fly={{ y: -100, duration: 1000, delay: 100 }}
						out:fly={{ y: 100, duration: 1000, delay: 100 }}
						class="font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-primary to-secondary text-center w-fit m-auto my-4"
					>
						How is Ranking Calculated?
					</h1>
					<div
						in:fly={{ y: 100, duration: 1000, delay: 100 }}
						out:fly={{ y: -100, duration: 1000, delay: 100 }}
						class="flex flex-wrap gap-2 w-full justify-center"
					>
						<ol class="text-md list-inside list-decimal">
							<li class="text-justify flex-1">The ranking is based on NFTs minted.</li>
							<li class="text-justify flex-1">
								For example, if you mint 10 NFTs, you will be ranked higher than someone who minted
								only 1 NFT.
							</li>
							<li class="text-justify flex-1">
								If you mint 10 NFTs and someone else mints 10 NFTs, you will be ranked higher if you
								minted your NFTs earlier.
							</li>
							<li>
								If two users tie on the number of NFTs minted and the time of minting, the user who
								has better rarity score will be ranked higher.
							</li>
						</ol>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
<!-- Pagination -->
