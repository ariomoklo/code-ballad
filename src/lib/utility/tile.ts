export type TileMap = { x: number; y: number };
export const tileToString = (tile: TileMap) => `${tile.x}.${tile.y}`;
export function generateTileMapArray(areaSize: number): TileMap[] {
	const tilemap: { x: number; y: number }[] = [];
	for (let x = 0; x < areaSize; x++) {
		for (let y = 0; y < areaSize; y++) {
			tilemap.push({ x, y });
		}
	}
	return tilemap;
}
