import { type Writable, get } from 'svelte/store';
import { tileToString } from '../tile';

export type Movement = (space?: number) => void;
export type CharacterMovement = { up: Movement; down: Movement; left: Movement; right: Movement };
export function moveCharacter(
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

		if (char.isDead === true) return;

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
