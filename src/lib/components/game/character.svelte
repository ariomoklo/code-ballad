<script lang="ts">
	import { useCharacterAnimation } from "$lib/utility/character/animation";
	import { spring, tweened } from "svelte/motion";
    import type { Writable } from "svelte/store";
	import { fade } from "svelte/transition";

    const charSize = 34
    const tileSize = 48
    const attackSpan = 48

    export let src: string
    export let tiles: Writable<App.Tile[][]>
    export let chara: Writable<App.Chara>

    const { position, opacity, calcPosition, updatePosition } = useCharacterAnimation(chara, tileSize, charSize)

    // const weaponScaleX = twee
    const weaponOpacity = tweened(0, { duration: 100 })
    const weaponPosition = spring(
        { x: 0, y: 0 },
        { stiffness: 0.2, damping: 0.5 }
    )

    chara.subscribe(c => {
        const tile = $tiles[c.xtile][c.ytile]
        const x = calcPosition(tile.xPos), y = calcPosition(tile.yPos)
        updatePosition(tile)
        
        if (c.onAttactState === 'UP') {
            weaponPosition.set({ x, y: y - attackSpan })
            weaponOpacity.set(1)
        } else if (c.onAttactState === 'DOWN') {
            weaponPosition.set({ x, y: y + attackSpan })
            weaponOpacity.set(1)
        } else if (c.onAttactState === 'LEFT') {
            weaponPosition.set({ x: x - attackSpan, y })
            weaponOpacity.set(1)
        } else if (c.onAttactState === 'RIGHT') {
            weaponPosition.set({ x: x + attackSpan, y })
            weaponOpacity.set(1)
        } else {
            weaponPosition.set({ x, y })
            weaponOpacity.set(0)
        }
    })
</script>

{#if $chara.onBoardArea}
    <figure transition:fade={{ delay: 1000 }} class="absolute top-0 left-0" style="translate: {$position.x}px {$position.y}px;">
        <img {src} alt="" class="w-9" style="opacity: {$opacity};">
    </figure>
{/if}

<figure class="absolute top-0 left-0" style="translate: {$weaponPosition.x}px {$weaponPosition.y}px; opacity: {$weaponOpacity};">
    <img src="https://api.iconify.design/fluent-emoji-flat:dagger.svg?color=%23888888" alt="" class="scale-y-[-1] w-9">
</figure>