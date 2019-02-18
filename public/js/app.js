const $levels = 15;
let $keys = generateLevels($levels)

function nextLevel (actualLevel) {
	if (actualLevel == $levels) {
		return swal({
			title: 'You win',
			type: 'success'
		})

	}
	setTimeout(() => swal({
		title: `Level: ${actualLevel + 1}`,
		showConfirmButton: false,
		timer: 1300
	}), 1000)

	for (let i=0; i <= actualLevel; i++) {
		setTimeout(() => activate($keys[i]), 1000 * (i + 1) + 1500)
	}

	let $i = 0
	/*la tecla actual es como la ronda actual ya que si pasa el primer nivel $i sera 1 y tendra
	que tocar la tecla anterior y la nueva*/
	let $actualKey = $keys[$i]
	//console.log($keys, $actualKey)

	window.addEventListener('keydown', onKeyDown)

	function onKeyDown (event) {
		if (event.keyCode == $actualKey) {
			activate(event.keyCode, { success: true })
			$i++

			if ($i > actualLevel) {
				window.removeEventListener('keydown', onKeyDown)
				setTimeout(() => 	nextLevel($i), 1500)
			}

			$actualKey = $keys[$i]
		} else {
			activate(event.keyCode, { fail: true })
			window.removeEventListener('keydown', onKeyDown)
			setTimeout(() => swal({
				title: 'You lose',
				text: 'Play again',
				showCancelButton: true,
				confirmButtonText: 'Yes',
				cancelButtonText: 'Not',
				closeOnConfirm: true 
			
			}, function (ok){
				if (ok) {
					$keys = generateLevels($levels)
					nextLevel(0)
				}
			}), 1000)			
		}
	}
}

nextLevel(0)

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

function getElementByKeyCode (keyCode) {
	return document.querySelector(`[data-key='${keyCode}']`)
}

function activate (keyCode, opts = {}) {
	let $element = getElementByKeyCode(keyCode)
	$element.classList.add('active')

	if (opts.success) {
		$element.classList.add('success')
	}else if (opts.fail) {
		$element.classList.add('fail')
	}

	setTimeout(() => deactivate($element), 500)
}

function deactivate ($element) {
	$element.className ='key'
}
