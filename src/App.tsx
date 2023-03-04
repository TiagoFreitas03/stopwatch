import { useState, useEffect } from 'react'

import { formatMs } from './utils/format-ms'
import './styles/app.css'

export function App() {
	const [time, setTime] = useState(0)
	const [lastLap, setLastLap] = useState(0)
	const [running, setRunning] = useState(false)
	const [laps, setLaps] = useState<number[]>([])

	useEffect(() => {
		let intervalId: any

		if (running)
			intervalId = setInterval(() => { setTime(state => state + 10) }, 10)
		else
			clearInterval(intervalId)

		return () => clearInterval(intervalId)
	}, [running])

	const toggleStopwatch = () => setRunning(!running)

	function addLap() {
		const current = time - lastLap
		setLastLap(time)
		setLaps([current, ...laps])
	}

	function restart() {
		setTime(0)
		setRunning(false)
		setLaps([])
		setLastLap(0)
	}

	return (
		<div className="container">
			<h1>Cronômetro</h1>

			<span id="time">{formatMs(time)}</span>

			{
				laps.length > 0 &&
				<div className="laps-container">
					<span id="current-lap">{formatMs(time - lastLap)}</span>

					<table>
						<thead>
							<tr>
								<th>Volta</th>
								<th>Tempo</th>
							</tr>
						</thead>

						<tbody>
							{
								laps.map((lap, index) => {
									return (
										<tr key={index}>
											<td>{laps.length - index}</td>
											<td>{formatMs(lap)}</td>
										</tr>
									)
								})
							}
						</tbody>
					</table>
				</div>
			}

			<div className="buttons-container">
				<button onClick={toggleStopwatch}>
					{running ? 'Pausar' : laps.length === 0 ? 'Iniciar' : 'Continuar'}
				</button>

				<button onClick={running ? addLap : restart}>
					{running ? 'Volta' : 'Reiniciar'}
				</button>
			</div>
		</div>
	)
}
