<script lang="ts">
	import OrgAbout from './OrgAbout.svelte';
	import OrgHeader from './OrgHeader.svelte';
	import OrgProjects from './OrgProjects.svelte';
	import { setOrgContext } from './common.js';

	export let data;

	setOrgContext(data.organisation);
</script>

<OrgHeader />
<OrgAbout />
<OrgProjects />

<style lang="scss">
</style>
