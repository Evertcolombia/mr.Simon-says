const $levels = 15;
const $keys = generateLevels($levels)

function getRandomNum () {
	const min = 65
	const max = 90
	return Math.round(Math.random() * (max - min) + min)
}

//console.log(getRandomNum())

function generateLevels ($levels) {
	/*Si llamamos la funcion sin parentesis estamos pasando el objeto funcion en si mismo, cuando pasamos
	una funcion como argumento, esta se va a ejecutar tan pronto suceda el evento y el sistema
	no se va a bloquer mientras suceda esto*/
	return new Array($levels).fill(0).map(getRandomNum)
}

//console.log(generateLevels($levels))
//console.log($keys)

