<script lang="ts">
	import { useCharacterAnimation } from "$lib/utility/character/animation";
    import type { Writable } from "svelte/store";
	import { fade } from "svelte/transition";
	import Weapon from "./weapon.svelte";

    const charSize = 34
    const tileSize = 48

    export let src: string
    export let tiles: Writable<App.Tile[][]>
    export let chara: Writable<App.Chara>

    const { position, opacity, weapon, syncPosition } = useCharacterAnimation(chara, tileSize, charSize)
    syncPosition(tiles)
</script>

{#if $chara.onBoardArea}
    <figure transition:fade={{ delay: 1000 }} class="absolute top-0 left-0" style="translate: {$position.x}px {$position.y}px;">
        <img {src} alt="" class="w-9" style="opacity: {$opacity};">
    </figure>
{/if}

<Weapon {weapon} src="https://api.iconify.design/fluent-emoji-flat:dagger.svg?color=%23888888" />