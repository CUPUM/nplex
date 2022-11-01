<script lang="ts" context="module">
</script>

<script lang="ts">
</script>

<!-- <nav class="explore">
			{#if $page.data.showCategoryNav}
				<div transition:transform={{ translateY: -20, rotateX: -45, duration: 750, easing: expoInOut }}>
					<Switch name="category" variant="nav" value={$page.data.category}>
						{#each exploreRoutes as r, i}
							<SwitchItem
								id={r.category}
								value={r.category}
								on:click={() => gotoCategory(r)}
								disabled={r.category === $page.data.category && !$page.data.categoryIsResetable}
								loading={loadingCategoryPath === r.pathname}
							>
								{r.title}
							</SwitchItem>
						{/each}
					</Switch>
				</div>
			{/if}
		</nav> -->
<style lang="scss">
</style>
