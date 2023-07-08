import { PUBLIC_API_URL } from '$env/static/public';
import type { PageServerLoadEvent } from './$types';

export async function load(event: PageServerLoadEvent) {
	const mintersURL = PUBLIC_API_URL + 'hubby';

	const mintersRes = await event.fetch(mintersURL);

	return {
		minters: await mintersRes.json()
	};
}
