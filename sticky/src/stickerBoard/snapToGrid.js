export function softSnap(x, y, threshold = 5, gridSize = 16) {
	const snappedX = Math.round(x / gridSize) * gridSize;
	const snappedY = Math.round(y / gridSize) * gridSize;
	if (Math.abs(x - snappedX) < threshold) x = snappedX;
	if (Math.abs(y - snappedY) < threshold) y = snappedY;
	return [x, y];
}
