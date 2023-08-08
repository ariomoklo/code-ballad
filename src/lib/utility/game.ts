import { shuffle } from '$lib';
import { error } from '@sveltejs/kit';
import { type Writable, writable, get } from 'svelte/store';
import { type CharacterMovement, moveCharacter } from './character/movement';
import { generateTileMapArray, tileToString } from './tile';

function generateSpawnPoints(areaSize: number, total: number) {
	if (total > areaSize * areaSize) throw error(500, 'Total spawn point is greater than area size');
	const tilemap = generateTileMapArray(areaSize);
	return Array(total)
		.fill(true)
		.map(() => {
			return shuffle(tilemap).shift() as { x: number; y: number };
		});
}

function getTileByDirection(
	position: { x: number; y: number },
	direction: App.Direction,
	span = 1
) {
	const target = { x: position.x, y: position.y };
	if (direction === 'UP') target.y -= span;
	if (direction === 'DOWN') target.y += span;
	if (direction === 'LEFT') target.x -= span;
	if (direction === 'RIGHT') target.x += span;

	if (target.x < 0 || target.y < 0) return { outbound: true, tile: target };
	else return { outbound: false, tile: target };
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
			visible: false,
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
					c.xtile = point.x;
					c.ytile = point.y;
					c.onBoardArea = true;
					return c;
				});

				setTimeout(() => {
					char.update((c) => {
						c.visible = true;
						return c;
					});
				}, 100);
			});
		},
		move(characterID: string): CharacterMovement {
			const chara = characters.get(characterID);
			if (chara) return moveCharacter(areaSize, chara, blockedTiles);
			function dummy(space = 1) {
				return;
			}
			return { up: dummy, down: dummy, left: dummy, right: dummy };
		},
		attact(characterID: string, direction: App.Direction) {
			const character = characters.get(characterID);
			if (!character) return;
			character.update((c) => {
				c.onAttactState = direction;

				// check tile in the attact direction
				const { outbound, tile } = getTileByDirection({ x: c.xtile, y: c.ytile }, direction);
				if (!outbound) {
					const enemiesPosition = get(blockedTiles);
					if (enemiesPosition.includes(tileToString(tile))) {
						characters.forEach((chara) => {
							const data = get(chara);
							if (data.xtile === tile.x && data.ytile === tile.y) {
								blockedTiles.set(enemiesPosition.filter((e) => e !== tileToString(tile)));
								chara.update((enemy) => {
									enemy.isDead = true;
									return enemy;
								});
							}
						});
					}
				}

				setTimeout(() => {
					character.update((c) => {
						c.onAttactState = undefined;
						return c;
					});
				}, 200);

				return c;
			});
		}
	};
}
