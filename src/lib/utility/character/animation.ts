import { spring, tweened } from 'svelte/motion';
import type { Writable } from 'svelte/store';

export function useCharacterAnimation(
	character: Writable<App.Chara>,
	tileSize = 48,
	charSize = 34
) {
	const _opacity = tweened(0, { duration: 100 });
	const _position = spring({ x: 0, y: 0 }, { stiffness: 0.2, damping: 0.5 });

	function _calcPosition(destination: number) {
		return destination + tileSize / 2 - charSize / 2;
	}

	function updatePosition(tile: App.Tile) {
		const x = _calcPosition(tile.xPos);
		const y = _calcPosition(tile.yPos);
		_position.set({ x, y });
	}

	character.subscribe((chara) => {
		if (chara.onBoardArea === true) {
			if (chara.visible) _opacity.set(1);
			else _opacity.set(0);
		}
	});

	return {
		calcPosition: _calcPosition,
		updatePosition,
		opacity: _opacity,
		position: _position
	};
}

// TODO: Add useWeaponAnimation
