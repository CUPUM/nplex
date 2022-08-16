import { page, session } from '$app/stores';
import AuthModal from '$components/complexes/AuthModal.svelte';
import Footer from '$components/complexes/Footer.svelte';
import MessagesOutlet from '$components/complexes/MessagesOutlet.svelte';
import Navbar from '$components/complexes/Navbar.svelte';
import Loading from '$components/primitives/Loading.svelte';
import { authModal } from '$stores/auth';
import { backgroundColor } from '$stores/backgroundColor';
import '$styles/app.scss';
import '$styles/vars.css';
import { sizes } from '$utils/values/sizes';
import type { LoadEvent, LoadOutput } from '@sveltejs/kit';
import { onMount } from 'svelte';

throw new Error("@migration task: Migrate the load function input (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
export async function load({ stuff }: LoadEvent): Promise<LoadOutput> {
	throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
	return {
		stuff: {
			showFooter: true,
		},
	};
}
