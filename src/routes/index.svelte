<script lang="ts">
	import { pane } from './index.css';
</script>



<section class={pane}>
	<h1>Projets</h1>
	<ul>
		[Featured projects here]
	</ul>
	<a href="/projets" sveltekit:prefetch>Voir plus...</a>
</section>
<section class={pane}>
	<h1>Organisations</h1>
	<ul>
		[Featured orgs here]
	</ul>
	<a href="/organisations" sveltekit:prefetch>Voir plus...</a>
</section>
<section class={pane}>
	<h1>Acteurs</h1>
	<ul>
		[Featured actors here]
	</ul>
	<a href="/acteurs" sveltekit:prefetch>Voir plus...</a>
</section>