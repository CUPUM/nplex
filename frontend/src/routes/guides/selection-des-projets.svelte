<script lang="ts" context="module">
</script>

<script lang="ts">
	import { reveal } from '$actions/reveal';
	import { flyup } from '$actions/reveal/presets';
</script>

<h2 use:reveal={flyup}>Guide de sélection des projets</h2>
<p>
	Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus quaerat ducimus repellat animi quibusdam minima
	eos at impedit laborum? Similique sunt magnam magni, repellat modi molestias eius qui quis esse, tempora possimus
	placeat totam voluptas, explicabo unde ipsam odio porro? Est ut eum accusamus quis velit alias repellat quas
	facilis?
</p>
<p>
	Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo numquam et accusantium, dolores nostrum quia
	perspiciatis perferendis quibusdam tenetur nihil porro delectus corrupti eveniet nobis dolore magnam. Voluptate ab
	aliquam maxime labore ad optio placeat, saepe, quos doloribus sit corrupti atque voluptatem culpa cupiditate. Eos
	error consequuntur blanditiis iure commodi, porro quidem ipsa doloribus est beatae expedita laboriosam veritatis
	dicta.
</p>
<h3>Sous titre</h3>
<p>
	Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi rerum libero ipsam illo reiciendis iusto quas fugit
	corporis, sapiente ut consectetur quisquam in exercitationem eos quam, veritatis alias, eius ex.
</p>

<style lang="scss">
	* {
		grid-column: main;
	}

	h2,
	h3 {
		grid-column: col1 / col2;
	}

	p {
		grid-column: col2 / col3;
	}
</style>
