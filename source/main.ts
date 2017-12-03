import { World, PreLevel } from './scenario/scenario.namespace'

window.onload = () => {
	
	const loader = document.getElementsByClassName('loader')[0]
	const lines = document.getElementById('lines').querySelectorAll('line')
	const pins = document.getElementById('pins').querySelectorAll('circle')
	const avatar = document.getElementById('avatar')
	const preLevelList = new Array<PreLevel>(
		new PreLevel(0, [1]),
		new PreLevel(1, [0, 2]),
		new PreLevel(2, [1, 3, 5, 6]),
		new PreLevel(3, [2, 4]),
		new PreLevel(4, [3]),
		new PreLevel(5, [2]),
		new PreLevel(6, [2, 7, 8]),
		new PreLevel(7, [6]),
		new PreLevel(8, [6]),
	)

	new World(preLevelList, lines, pins, avatar, loader)

}