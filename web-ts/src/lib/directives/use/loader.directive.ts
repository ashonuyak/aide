import Loader from '$lib/components/Loader.svelte';

export const loader = (node: Element, loading: boolean) => {
	let Spin: Loader | undefined;

    if (loading) {
        Spin = new Loader({
            target: node,
            intro: true
        });
    } else {
        if (Spin) {
            Spin?.$destroy?.();
            Spin = undefined;
        }
    }
};
