// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}

		type Tile = {
			x: number
			y: number
			xPos: number
			yPos: number
		};

		type Chara = {
			xtile: number
			ytile: number
			visibility: boolean
			moveLimit: number
			attackRange: number
		}
	}
}

export {};
