<script lang="ts">
	import type { BaseAnimation } from "$lib/utility/character/animation";

    export let src: string
    export let weapon: BaseAnimation
    const { position, opacity } = weapon
</script>

<figure class="absolute top-0 left-0" style="translate: {$position.x}px {$position.y}px; opacity: {$opacity};">
    <img {src} alt="" class="scale-y-[-1] w-9">
</figure>