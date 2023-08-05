<script lang="ts">
	import { spring } from "svelte/motion";
    import type { Writable } from "svelte/store";

    export let x: number
    export let y: number
    export let attackSpan = 48
    export let chara: Writable<App.Chara>

    $: opacity = $chara.visible ? 1:0

    const position = spring(
        { x, y },
        { stiffness: 0.2, damping: 0.5 }
    )

    chara.subscribe(c => {
        if (c.onAttactState === 'UP') position.set({ x, y: y - attackSpan })
        if (c.onAttactState === 'DOWN') position.set({ x, y: y + attackSpan })
        if (c.onAttactState === 'LEFT') position.set({ x: x - attackSpan, y })
        if (c.onAttactState === 'RIGHT') position.set({ x: x + attackSpan, y })
        if (!c.onAttactState) position.set({ x, y })
    })
</script>

<figure class="absolute top-0 left-0" style="translate: {$position.x}px {$position.y}px; opacity: {opacity};">
    <img src="https://api.iconify.design/fluent-emoji-flat:dagger.svg?color=%23888888" alt="" class="scale-y-[-1] w-9">
</figure>