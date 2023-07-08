export const getHubDropPrize = (rarity: String | Array<String>) => {
	// if we got arrat of rarities call recursively
	let count = 0;
	if (Array.isArray(rarity)) {
		rarity.forEach((r) => {
			count += getHubDropPrize(r);
		});
		return count;
	}

	switch (rarity) {
		case '10 $HUB Prize':
			return count + 10;
		case '200 $HUB Prize':
			return count + 200;
		case '100 $HUB Prize':
			return count + 100;
		case '10.000 $HUB Prize':
			return count + 10000;
		default:
			return count;
	}
};

export const getRankPrize = (r: number) => {
	switch (r) {
		case 1:
			return '1700 USDT';
		case 2:
			return '500 USDT';
		case 3:
			return '250 USDT';
		// case where r is between 4 and 8
		case 4:
		case 5:
		case 6:
		case 7:
		case 8:
			return '100 USDT';
		// no prize for other ranks
		default:
			return '';
	}
};

export const formatMoney = (amount: number, minDec = 0, MaxDec = 2, currency: string) => {
	const options = currency ? { style: 'currency', currency } : {};

	return amount.toLocaleString('en-US', {
		...options,
		minimumFractionDigits: minDec,
		maximumFractionDigits: MaxDec
	});
};
