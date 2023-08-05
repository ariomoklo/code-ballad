<script lang="ts">
	import { onMount } from "svelte";
	import type { Writable } from "svelte/store";

    export let x: number
    export let y: number
    export let tiles: Writable<App.Tile[][]>
    let element: HTMLElement

    let position: DOMRect

    onMount(() => {
        position = element.getBoundingClientRect()
        tiles.update(t => {
            t[x][y] = {
                x, y,
                xPos: position.left,
                yPos: position.top
            }

            return t
        })
    });
</script>

<td bind:this={element} class="text-center w-12 h-12 border border-green-600 text-slate-700 text-[5px]">
    <!-- <p>{x},{y}</p>
    <p>{position?.left.toFixed(2)},<br>{position?.top.toFixed(2)}</p> -->
</td>