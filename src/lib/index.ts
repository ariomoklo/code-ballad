// place files you want to import through the `$lib` alias in this folder.

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