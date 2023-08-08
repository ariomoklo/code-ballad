<script lang="ts">
	import { spring } from "svelte/motion";
	import type { Writable } from "svelte/store";

    export let x: number
    export let y: number
    export let character: Writable<App.Chara>

    const scale = spring(0, { stiffness: 0.2, damping: 0.5 })
    let hide = false
    
    character.subscribe(c => {
        if (c.isDead === true) {
            scale.set(2)
            setTimeout(() => scale.set(1), 100);
        }
    })

    scale.subscribe(s => {
        if (s === 1) {
            hide = true
            scale.set(0)
            character.update(chara => {
                chara.visible = false
                return chara
            })
        }
    })
</script>

{#if !hide}
    <figure class="absolute top-0 left-0" style="translate: {x}px {y}px; scale: {$scale};">
        <img src="https://api.iconify.design/fluent-emoji-flat:collision.svg?color=%23888888" alt="" class="w-9">
    </figure>
{/if}