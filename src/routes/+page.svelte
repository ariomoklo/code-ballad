<script lang="ts">
    import Character from "$lib/components/game/character.svelte";
    import Tile from "$lib/components/game/tile.svelte";
	import { useGameUtility } from "$lib/utility/game";
	import { onDestroy } from "svelte";

    const areaSize = 3
    const game = useGameUtility(areaSize)
    const tiles = game.tiles

    const cat = game.createCharacter('cat')
    const mouse = game.createCharacter('mouse')
    const bird = game.createCharacter('bird')

    let charid = ''
    let aliveCharacter = ['cat', 'mouse', 'bird']
    const unsub = game.onCharacterUpdate(char => {
        if (char.data.isDead === true) {
            aliveCharacter = aliveCharacter.filter(item => char.id !== item)
        }
    })

    onDestroy(() => unsub())
    function onGameBoardLoad(e: any) {
        game.spawn()
    }
</script>

<main class="flex w-screen h-screen bg-zinc-950">
    <section id="board" class="w-1/2 h-full flex relative items-center justify-center">
        <Character {tiles} chara={cat} src="https://api.iconify.design/fluent-emoji-flat:cat-with-wry-smile.svg?color=%23888888" />
        <Character {tiles} chara={bird} src="https://api.iconify.design/fluent-emoji-flat:bird.svg?color=%23888888" />
        <Character {tiles} chara={mouse} src="https://api.iconify.design/fluent-emoji-flat:mouse-face.svg?color=%23888888" />
        
        <table use:onGameBoardLoad class="table-fixed border-collapse border border-green-600">
            {#each $tiles as tileRow, y }
                <tr>
                    {#each tileRow as _, x}
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
        
        <div class="p-4">
            <select class="w-full" bind:value={charid}>
                {#each aliveCharacter as id}
                    <option value="{id}">{id.toUpperCase()}</option>
                {/each}
            </select>
        </div>

        <section class="flex flex-wrap gap-2 w-full items-center justify-center text-center my-4">
            <div class="grow w-full">
                <button class="w-40 bg-white text-black px-4 py-2" on:click={() => game.move(charid).up()}>Move Up</button>
            </div>
            <button class="w-40 bg-white text-black px-4 py-2" on:click={() => game.move(charid).left()}>Move Left</button>
            <button class="w-40 bg-white text-black px-4 py-2" on:click={() => game.move(charid).down()}>Move Down</button>
            <button class="w-40 bg-white text-black px-4 py-2" on:click={() => game.move(charid).right()}>Move Right</button>
        </section>

        <section class="flex flex-wrap gap-2 w-full items-center justify-center text-center my-4">
            <div class="grow w-full">
                <button class="w-40 bg-white text-black px-4 py-2" on:click={() => game.attact(charid, 'UP')}>Attack Up</button>
            </div>
            <button class="w-40 bg-white text-black px-4 py-2" on:click={() => game.attact(charid, 'LEFT')}>Attack Left</button>
            <button class="w-40 bg-white text-black px-4 py-2" on:click={() => game.attact(charid, 'DOWN')}>Attack Down</button>
            <button class="w-40 bg-white text-black px-4 py-2" on:click={() => game.attact(charid, 'RIGHT')}>Attack Right</button>
        </section>
    </section>
</main>