import { spring, tweened, type Spring, type Tweened } from 'svelte/motion';
import { get, type Writable } from 'svelte/store';

const defineBaseAnimation = (x = 0, y = 0) => ({
	opacity: tweened(0, { duration: 100 }),
	position: spring({ x, y }, { stiffness: 0.2, damping: 0.5 })
});

export type BaseAnimation = {
	opacity: Tweened<number>;
	position: Spring<{ x: number; y: number }>;
};

export function useCharacterAnimation(
	character: Writable<App.Chara>,
	tileSize = 48,
	charSize = 34
) {
	const sprite = defineBaseAnimation();
	const weapon = defineBaseAnimation();

	function _calcPosition(destination: number) {
		return destination + tileSize / 2 - charSize / 2;
	}

	function syncPosition(tiles: Writable<App.Tile[][]>) {
		character.subscribe((chara) => {
			if (chara.onBoardArea === true) {
				if (chara.visible) sprite.opacity.set(1);
				else sprite.opacity.set(0);
				weapon.opacity.set(0);
			}

			const _tiles = get(tiles);
			const tile = _tiles[chara.xtile][chara.ytile];
			const x = _calcPosition(tile.xPos);
			const y = _calcPosition(tile.yPos);
			sprite.position.set({ x, y });

			if (chara.onAttactState === 'UP') {
				weapon.position.set({ x, y: y - tileSize });
				weapon.opacity.set(1);
			} else if (chara.onAttactState === 'DOWN') {
				weapon.position.set({ x, y: y + tileSize });
				weapon.opacity.set(1);
			} else if (chara.onAttactState === 'LEFT') {
				weapon.position.set({ x: x - tileSize, y });
				weapon.opacity.set(1);
			} else if (chara.onAttactState === 'RIGHT') {
				weapon.position.set({ x: x + tileSize, y });
				weapon.opacity.set(1);
			} else {
				weapon.position.set({ x, y });
				weapon.opacity.set(0);
			}
		});
	}

	return {
		syncPosition,
		...sprite,
		weapon
	};
}
