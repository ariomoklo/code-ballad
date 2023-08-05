<script lang="ts">
	import Character from "$lib/components/game/character.svelte";
    import Tile from "$lib/components/game/tile.svelte";
	import { onMount } from "svelte";
    import { writable } from "svelte/store";


    const areaSize = 3

    let catVisibility = false
    const catPosition = writable<{ x: number, y: number }>({ x: 0, y: 0 })
    const tiles = writable<App.Tile[][]>(
        Array(areaSize).fill(true).map((_1, y) => {
            const arr = Array(areaSize).fill(true).map((_2, x) => {
                const tile: App.Tile = { x, y, xPos: 0, yPos: 0 }
                return tile
            })
            return arr
        }))

    function randomSpawn() {
        catPosition.set({ x: Math.floor(Math.random() * (areaSize-1)), y: Math.floor(Math.random() * (areaSize-1)) })
        setTimeout(() => catVisibility = true, 500);
    }

    function moveUp() {
        if ($catPosition.y > 0) {
            catPosition.set({ x: $catPosition.x, y: $catPosition.y - 1})
        }
    }

    function moveDown() {
        if ($catPosition.y < areaSize - 1) {
            catPosition.set({ x: $catPosition.x, y: $catPosition.y + 1})
        }
    }

    function moveLeft() {
        if ($catPosition.x > 0) {
            catPosition.set({ x: $catPosition.x - 1, y: $catPosition.y })
        }
    }

    function moveRight() {
        if ($catPosition.x < areaSize - 1) {
            catPosition.set({ x: $catPosition.x + 1, y: $catPosition.y })
        }
    }

    onMount(() => {
        randomSpawn()
    })
</script>

<main class="flex w-screen h-screen bg-zinc-950">
    <section id="board" class="w-1/2 h-full flex relative items-center justify-center">
        <Character {tiles} position={catPosition} visibility={catVisibility} />
        <table class="table-fixed border-collapse border border-green-600">
            {#each $tiles as tileRow, y }
                <tr>
                    {#each tileRow as tile, x}
                        <Tile {tiles} {x} {y} />
                    {/each}
                </tr>
            {/each}
        </table>
    </section>
    <section id="editor" class="w-1/2 border-l border-l-zinc-500 bg-zinc-900">
        <article class="prose p-4 prose-invert">
            Testing character placement and movement
        </article>
        
        <section class="flex flex-wrap gap-2 w-full items-center justify-center text-center">
            <div class="grow w-full">
                <button class="w-40 bg-white text-black px-4 py-2" on:click={moveUp}>Move Up</button>
            </div>
            <button class="w-40 bg-white text-black px-4 py-2" on:click={moveLeft}>Move Left</button>
            <button class="w-40 bg-white text-black px-4 py-2" on:click={moveDown}>Move Down</button>
            <button class="w-40 bg-white text-black px-4 py-2" on:click={moveRight}>Move Right</button>
        </section>
    </section>
</main>