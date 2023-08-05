// place files you want to import through the `$lib` alias in this folder.

import { error } from '@sveltejs/kit';
import { get, writable, type Writable } from 'svelte/store';

type TileMap = { x: number; y: number };
const tileToString = (tile: TileMap) => `${tile.x}.${tile.y}`;
function generateTileMapArray(areaSize: number): TileMap[] {
	const tilemap: { x: number; y: number }[] = [];
	for (let x = 0; x < areaSize; x++) {
		for (let y = 0; y < areaSize; y++) {
			tilemap.push({ x, y });
		}
	}
	return tilemap;
}

type Movement = (space?: number) => void;
type CharacterMovement = { up: Movement; down: Movement; left: Movement; right: Movement };
function moveCharacter(
	areaSize: number,
	character: Writable<App.Chara>,
	blockedTiles: Writable<string[]>
): CharacterMovement {
	const blocked = get(blockedTiles);
	const char = get(character);
	const size = areaSize - 1;

	function movement(space = 1, axis: 'xtile' | 'ytile', direction: -1 | 1) {
		const currentTile = char[axis];
		const moveLimit = char.moveLimit;

		// character is on 0 already, can't move up or left anymore
		if (currentTile === 0 && direction === -1) return;

		// character is on end of areasize already, can't move down or right anymore
		if (currentTile === size && direction === 1) return;

		// set space to movelimit if player to eager to move character
		if (moveLimit > space) space = moveLimit;

		// destination must not exceeding area limit
		const areaLimit = direction < 0 ? 0 : size;
		let destination = currentTile + space * direction;
		if (direction < 0 && destination < areaLimit) destination = areaLimit;
		if (direction > 0 && destination > areaLimit) destination = areaLimit;

		// setup destinationTile for use
		const destinationTile = { x: char.xtile, y: char.ytile };
		if (axis === 'xtile') destinationTile.x = destination;
		else destinationTile.y = destination;

		// find if destination tile is used or blocked
		if (blocked.includes(tileToString(destinationTile))) return;

		// update character position in blocked tiles
		const charDepartureTileIndex = blocked.findIndex(
			(p) => p === tileToString({ x: char.xtile, y: char.ytile })
		);
		blocked.splice(charDepartureTileIndex, 1, tileToString(destinationTile));

		// update character position
		character.update((char) => {
			char[axis] = destination;
			return char;
		});
	}

	return {
		up: (space = 1) => movement(space, 'ytile', -1),
		down: (space = 1) => movement(space, 'ytile', 1),
		left: (space = 1) => movement(space, 'xtile', -1),
		right: (space = 1) => movement(space, 'xtile', 1)
	};
}

function generateSpawnPoints(areaSize: number, total: number) {
	if (total > areaSize * areaSize) throw error(500, 'Total spawn point is greater than area size');
	const tilemap = generateTileMapArray(areaSize);
	return Array(total)
		.fill(true)
		.map(() => {
			return shuffle(tilemap).shift() as { x: number; y: number };
		});
}

export function useGameUtility(areaSize = 3) {
	const characters = new Map<string, Writable<App.Chara>>();
	const blockedTiles = writable<string[]>([]);
	const tiles = writable<App.Tile[][]>(
		Array(areaSize)
			.fill(true)
			.map((_1, y) => {
				const arr = Array(areaSize)
					.fill(true)
					.map((_2, x) => {
						const tile: App.Tile = { x, y, xPos: 0, yPos: 0 };
						return tile;
					});
				return arr;
			})
	);

	function createCharacter(id: string) {
		const store = writable<App.Chara>({
			attackRange: 1,
			moveLimit: 1,
			visibility: false,
			xtile: 0,
			ytile: 0
		});

		characters.set(id, store);
		return store;
	}

	return {
		tiles,
		createCharacter,
		spawn() {
			const spawnPoints = generateSpawnPoints(areaSize, characters.size);
			blockedTiles.set(spawnPoints.map((p) => tileToString(p)));

			characters.forEach((char) => {
				const point = spawnPoints.shift();
				if (!point) return;

				char.update((c) => {
					c.visibility = false;
					c.xtile = point.x;
					c.ytile = point.y;
					return c;
				});

				setTimeout(() => {
					char.update((c) => {
						c.visibility = true;
						return c;
					});
				}, 500);
			});
		},
		move(characterID: string): CharacterMovement {
			const chara = characters.get(characterID);
			if (chara) return moveCharacter(areaSize, chara, blockedTiles);
			function dummy(space = 1) {
				return;
			}
			return { up: dummy, down: dummy, left: dummy, right: dummy };
		}
	};
}

/**
 * shuffle array
 * @param collection array object
 * @returns shuffled array
 */
export function shuffle<T = any>(collection: T[]) {
	let n = collection.length,
		t,
		i;

	// while there is element need to shuffled
	while (n) {
		i = Math.floor(Math.random() * n--);
		t = collection[n];
		collection[n] = collection[i];
		collection[i] = t;
	}

	return collection;
}