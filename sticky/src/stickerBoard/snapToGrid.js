// export function snapToGrid(x, y) {
//   const snappedX = Math.round(x / 16) * 16;
//   const snappedY = Math.round(y / 16) * 16;
//   return [snappedX, snappedY];
// }


export function softSnap(x, y, threshold = 5, gridSize = 16) {
	const snappedX = Math.round(x / gridSize) * gridSize;
	const snappedY = Math.round(y / gridSize) * gridSize;
	// Применяем только если близко к сетке
	if (Math.abs(x - snappedX) < threshold) x = snappedX;
	if (Math.abs(y - snappedY) < threshold) y = snappedY;
	return [x, y];
}
