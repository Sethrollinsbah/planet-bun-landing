<script lang="ts">
	let { children } = $props();
</script>

<div class="flex min-h-[90vh] w-full flex-col items-center justify-start">
	{@render children()}
</div>
