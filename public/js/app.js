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

function nextLevel (actualLevel) {
	if (actualLevel == $levels) {
		console.log('you Win')

	}
	setTimeout(() => alert(`Nivel: ${actualLevel + 1}`), 1000)

	let $i = 0
	/*la tecla actual es como la ronda actual ya que si pasa el primer nivel $i sera 1 y tendra
	que tocar la tecla anterior y la nueva*/
	let $actualKey = $keys[$i]
	//console.log($keys, $actualKey)

	window.addEventListener('keydown', onKeyDown)

	function onKeyDown (event) {
		if (event.keyCode == $actualKey) {
			alert('Correct Key')
			$i++;

			if ($i > actualLevel) {
				window.removeEventListener('keydown', onKeyDown)
				setTimeout(() => 	nextLevel($i), 500)
			}

			$actualKey = $keys[$i]
		}
		else {
			window.removeEventListener('keydown', onKeyDown)
			setTimeout(() => {
				nextLevel(0)
				alert('Wrong key')}, 1000)			
		}
	}
}

function getElementByKeyCode (keyCode) {
	return document.querySelector(`[data-key='${keyCode}']`)
}

function activate (keyCode) {
	let $element = getElementByKeyCode(keyCode)
	$element.classList.add('active')

	setTimeout(() => deactivate($element), 500)
}

function deactivate ($element) {
	$element.classList.remove('active')
}


nextLevel(0)