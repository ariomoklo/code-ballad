<script lang="ts">
	import type { WeaponAnimation } from "$lib/utility/character/animation";
    import { cva } from "class-variance-authority"

    export let src: string
    export let weapon: WeaponAnimation
    const { position, opacity, pointing } = weapon

    const spriteClass = cva(["w-9"], {
        variants: {
            pointing: {
                UP: ['scale-y-[-1]'],
                DOWN: ['scale-x-[-1]'],
                LEFT: ['scale-y-[-1]'],
                RIGHT: ['scale-x-[-1] scale-y-[-1]'],
            }
        }
    })
</script>

<figure class="absolute top-0 left-0" style="translate: {$position.x}px {$position.y}px; opacity: {$opacity};">
    <img {src} alt="" class="{spriteClass({ pointing: $pointing })}">
</figure>