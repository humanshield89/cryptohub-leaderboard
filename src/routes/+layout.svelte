<script>
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import '../app.css';

	inject({ mode: dev ? 'development' : 'production' });
</script>

<div class="min-h-screen p-0 md:p-2">
	<slot />
</div>
<!-- Footer -->
