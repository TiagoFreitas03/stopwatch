export function formatMs(time: number, includeMs: boolean = true) {
	const ms = Math.floor((time % 1000) / 10),
		s = (Math.floor((time / 1000) % 60)),
		m = Math.floor((time / (60000)) % 60)

	const format = (x: number) => x.toString().padStart(2, '0')

	let result = [format(m), format(s)].join(':')

	if (includeMs)
		result += ':' + format(ms)

	return result
}
