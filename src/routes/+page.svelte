<script lang="ts">
    import Character from "$lib/components/game/character.svelte";
    import Tile from "$lib/components/game/tile.svelte";
	import { useGameUtility } from "$lib";
	import { onMount } from "svelte";

    const areaSize = 3
    const game = useGameUtility(areaSize)
    const tiles = game.tiles

    const cat = game.createCharacter('cat')
    const mouse = game.createCharacter('mouse')
    const bird = game.createCharacter('bird')

    let charid = 'cat'

    onMount(() => {
        game.spawn()
    })
</script>

<main class="flex w-screen h-screen bg-zinc-950">
    <section id="board" class="w-1/2 h-full flex relative items-center justify-center">
        <svg class="absolute w-full h-full">
            <Character {tiles} chara={cat}>
                <g fill="none"><path fill="#FFB02E" d="M4 25.942C4 28.174 5.763 30 7.918 30h16.164C26.237 30 28 28.073 28 25.84V6.43c0-1.3-1.59-1.9-2.485-1L20.974 10h-9.812L6.5 5.43c-.9-.9-2.5-.3-2.5 1v19.512Z"/><path fill="#FF822D" d="m9 10.927l-2.8 2.6c-.5.5-1.4.1-1.4-.6v-5.2c0-.6.9-1 1.4-.5l2.8 2.6c.3.3.3.8 0 1.1Zm14.05 0l2.8 2.6c.5.5 1.4.1 1.4-.6v-5.2c0-.6-.9-1-1.4-.5l-2.8 2.6c-.3.3-.3.8 0 1.1Z"/><path fill="#F70A8D" d="M17.043 20h-2.086a.5.5 0 0 0-.353.854l1.043 1.042a.5.5 0 0 0 .707 0l1.043-1.042a.5.5 0 0 0-.354-.854Z"/><path fill="#FF6723" d="M2.724 20.053a.5.5 0 1 0-.448.894l4 2a.5.5 0 1 0 .448-.894l-4-2Zm0 6.894a.5.5 0 1 1-.448-.894l4-2a.5.5 0 1 1 .448.894l-4 2Zm27.223-6.671a.5.5 0 0 0-.67-.223l-4 2a.5.5 0 1 0 .447.894l4-2a.5.5 0 0 0 .223-.67Zm-.671 6.671a.5.5 0 1 0 .448-.894l-4-2a.5.5 0 1 0-.448.894l4 2Z"/><path fill="#402A32" d="M9.947 15.276a.5.5 0 1 0-.894.448a4.589 4.589 0 0 0 1.292 1.52A.998.998 0 0 0 10 18v1a1 1 0 1 0 2 0v-1a.94.94 0 0 0 0-.038c.16.025.327.038.5.038a.5.5 0 0 0 0-1c-.654 0-1.212-.271-1.658-.637a3.597 3.597 0 0 1-.895-1.087ZM20 18a.94.94 0 0 1 0-.038a3.34 3.34 0 0 1-.5.038a.5.5 0 1 1 0-1c.654 0 1.212-.271 1.658-.637c.45-.368.757-.811.895-1.087a.5.5 0 1 1 .894.448a4.59 4.59 0 0 1-1.292 1.52A.998.998 0 0 1 22 18v1a1 1 0 1 1-2 0v-1Zm2.5 4a.5.5 0 0 1 .5.5c0 1.569-.707 2.706-1.625 3.44c-.901.721-2.011 1.06-2.875 1.06a.5.5 0 0 1 0-1c.637 0 1.526-.261 2.25-.84c.708-.566 1.25-1.428 1.25-2.66a.5.5 0 0 1 .5-.5Z"/></g>
            </Character>
            <Character {tiles} chara={bird}>
                <g fill="none"><path fill="#F9C23C" d="m6.388 7.22l-3.07 1.61c-.36.19-.43.68-.13.97l2.61 2.47l.59-5.05Zm12.17 21.28h-1.78l1.2-6h-1.5l-1.2 6h-3.5l1.2-6h-1.5l-1.2 6h-1.8c-.73 0-1.33.52-1.47 1.21c-.04.15.09.29.24.29h12.53c.16 0 .28-.14.25-.29a1.51 1.51 0 0 0-1.47-1.21Z"/><path fill="#CA0B4A" d="M17.568 6.22c-.13-.42-.3-.82-.52-1.19h.62c1.29 0 2.33-1.04 2.33-2.33c0-.38-.32-.7-.7-.7h-7.46c-3.18 0-5.78 2.48-5.99 5.61l-1.29 11.18c-.38 3.31 2.2 6.21 5.53 6.21h13.75l-.003-.01h5.283c.4 0 .72-.32.72-.72v-9.15c0-.52-.55-.87-1.03-.65l-7.342 3.42L19.168 11h-.004l-1.596-4.78Z"/><path fill="#212121" d="M10 10a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"/></g>
            </Character>
            <Character {tiles} chara={mouse}>
                <g fill="none"><path fill="#CDC4D6" d="M14.987 12.083a6.5 6.5 0 1 0-7.794 6.786a6.589 6.589 0 0 0-.1 1.131c0 5.226 4.17 8.28 7.736 9.33c.765.226 1.58.235 2.338-.008c3.374-1.08 7.802-4.499 7.802-9.322c0-.34-.043-.725-.13-1.138a6.5 6.5 0 1 0-7.825-6.785c-.327-.03-.665-.046-1.014-.046c-.344 0-.682.018-1.013.052Z"/><path fill="#1C1C1C" d="M12 21a1 1 0 0 0-1 1v1a1 1 0 1 0 2 0v-1a1 1 0 0 0-1-1Zm8 0a1 1 0 0 0-1 1v1a1 1 0 1 0 2 0v-1a1 1 0 0 0-1-1Z"/><path fill="#FF8687" d="M12.976 12.513c-2.777.921-4.81 3.058-5.563 5.453a5 5 0 1 1 5.563-5.453ZM29 13a5 5 0 0 1-4.412 4.966c-.715-2.077-2.47-4.502-5.561-5.486A5 5 0 0 1 29 13ZM16.031 27.969c1.196 0 1.938-1.735 1.938-2.11c0-.375-.325-.859-1.938-.859c-1.828 0-2.015.422-2.015.86c0 .32.82 2.109 2.015 2.109Z"/><path fill="#B4ACBC" d="M12 26.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5Zm8.5-.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5Zm-.814 1.036a.5.5 0 1 0-.372.928l5 2a.5.5 0 1 0 .372-.928l-5-2Zm-7.372 0a.5.5 0 1 1 .372.928l-5 2a.5.5 0 1 1-.372-.928l5-2Z"/></g>
            </Character>
        </svg>
        <table class="table-fixed border-collapse border border-green-600">
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
                <option value="cat" selected>Cat</option>
                <option value="bird" selected>Bird</option>
                <option value="mouse" selected>Mouse</option>
            </select>
        </div>

        <section class="flex flex-wrap gap-2 w-full items-center justify-center text-center">
            <div class="grow w-full">
                <button class="w-40 bg-white text-black px-4 py-2" on:click={() => game.move(charid).up()}>Move Up</button>
            </div>
            <button class="w-40 bg-white text-black px-4 py-2" on:click={() => game.move(charid).left()}>Move Left</button>
            <button class="w-40 bg-white text-black px-4 py-2" on:click={() => game.move(charid).down()}>Move Down</button>
            <button class="w-40 bg-white text-black px-4 py-2" on:click={() => game.move(charid).right()}>Move Right</button>
        </section>
    </section>
</main>