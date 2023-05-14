"use strict"
//==================================================================================================================================================
//Бэграунд картинок - "Начало"
//==================================================================================================================================================

function ibg(){
	let ibg=document.querySelectorAll(".ibg");
	for (var i = 0; i < ibg.length; i++) {
		if(ibg[i].querySelector('img')){
			ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
		}
	}
}
ibg();
//==================================================================================================================================================
//Бэграунд картинок - "Конец"
//==================================================================================================================================================





//==================================================================================================================================================
//Бэграунд картинок - "Формы"
//==================================================================================================================================================
document.addEventListener("DOMContentLoaded", function () {
    var phoneInputs = document.querySelectorAll('input[data-tel-input]');

    var getInputNumbersValue = function (input) {
        // Return stripped input value — just numbers
        return input.value.replace(/\D/g, '');
    }

    var onPhonePaste = function (e) {
        var input = e.target,
            inputNumbersValue = getInputNumbersValue(input);
        var pasted = e.clipboardData || window.clipboardData;
        if (pasted) {
            var pastedText = pasted.getData('Text');
            if (/\D/g.test(pastedText)) {
                // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
                // formatting will be in onPhoneInput handler
                input.value = inputNumbersValue;
                return;
            }
        }
    }

    var onPhoneInput = function (e) {
        var input = e.target,
            inputNumbersValue = getInputNumbersValue(input),
            selectionStart = input.selectionStart,
            formattedInputValue = "";

        if (!inputNumbersValue) {
            return input.value = "";
        }

        if (input.value.length != selectionStart) {
            // Editing in the middle of input, not last symbol
            if (e.data && /\D/g.test(e.data)) {
                // Attempt to input non-numeric symbol
                input.value = inputNumbersValue;
            }
            return;
        }

        if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
            if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
            var firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
            formattedInputValue = input.value = firstSymbols + " ";
            if (inputNumbersValue.length > 1) {
                formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
            }
        } else {
            formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
        }
        input.value = formattedInputValue;
    }
    var onPhoneKeyDown = function (e) {
        // Clear input after remove last symbol
        var inputValue = e.target.value.replace(/\D/g, '');
        if (e.keyCode == 8 && inputValue.length == 1) {
            e.target.value = "";
        }
    }
    for (var phoneInput of phoneInputs) {
        phoneInput.addEventListener('keydown', onPhoneKeyDown);
        phoneInput.addEventListener('input', onPhoneInput, false);
        phoneInput.addEventListener('paste', onPhonePaste, false);
    }
});



/*============================================*/





document.addEventListener("DOMContentLoaded", function () {
	const form = document.getElementById("form");
	form.addEventListener('submit', formSend);
	let timerForm = 0;

	let formFeqInputs = document.querySelectorAll("._req");

	for (let i = 0; i < formFeqInputs.length; i++) {
		let formFeqInput = formFeqInputs[i];

		formFeqInput.parentElement.addEventListener( 'click', (e) => {
			for (let i = 0; i < formFeqInputs.length; i++) {
				let formFeqInput = formFeqInputs[i];
				if (formFeqInput.classList.contains('_error')) {
					formRemoveError(formFeqInput);
				}
			}
		})
	}

	async function formSend(e) {
		e.preventDefault();
		//form.classList.add('_loading');

		let timerinAniItemWrapper = setTimeout(function tick() {
			let error = formValidate(form);
			//form.classList.remove('_loading');
			timerForm = timerForm - (500);

			if (error === 0) {
				form.submit();
			} else {
				//alert("Заполнете все поля");
			}
		}, timerForm);
	}

	function formValidate(form) {
		let error = 0;
		let formFeq = document.querySelectorAll("._req");

		for (var i = 0; i < formFeq.length; i++) {
			let input = formFeq[i];
			formRemoveError(input);

			if (input.classList.contains('_email')) {
				if (emailTest(input)) {
					formAddError(input);
					error++;
				}
			} else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
				formAddError(input);
				error++;
			} else if (input.getAttribute("type") === "tel" && input.value != '') {
				/*console.log(input.value);
				formAddError(input);
				error++;*/
				if (!nomerTest(input.value)) {
					console.log(input.value);
					formAddError(input);
					error++
				}
			} else if (input.value === '') {
				formAddError(input);
				error++;
			}
		}

		return error;
	}

	function formAddError(input) {
		input.parentElement.classList.add("_error");
		input.classList.add("_error");
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove("_error");
		input.classList.remove("_error");
	}
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}
	function nomerTest(nomer) {
		if (true) {
			if (nomer[0] === "8" && nomer.length == 17) {
				//alert(`${nomer} - ${nomer.length}simvol, ${nomer[0]}, ${nomer[3]} ooo`);
				return true;
			} else if (nomer[0] === "+" && nomerTestSimvol(nomer) === "7" && nomer.length > 17) {
				//alert(`${nomer} - ${nomer.length}simvol, ${nomer[0]}, ${nomer[3]} ooo`);
				return true;
			}
		}
	}
	function nomerTestSimvol(nomer) {
		for (let i = 1; i < nomer.length; i++) {
			let simvol = nomer[i];

			if (+simvol > 0) {
				return simvol;
			}
		}
	}
});

//==================================================================================================================================================
//Бэграунд картинок - "Формы"
//==================================================================================================================================================







//==================================================================================================================================================
//Бэграунд картинок - "Слайдер"
//==================================================================================================================================================

var swiper = new Swiper(".mySwiper", {
	slidesPerView: 3,
	spaceBetween: 30,
	navigation: {
		nextEl: ".slaider-button_right",
		prevEl: ".slaider-button_left",
	},
	pagination: {
		el: ".slaider-paginachion",
		clickable: true,
	},

	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 20,
		},
		767: {
			slidesPerView: 2,
			spaceBetween: 14,
		},
		1064: {
			slidesPerView: 3,
			spaceBetween: 14,
		},
	},
});

//==================================================================================================================================================
//Бэграунд картинок - "Слайдер"
//==================================================================================================================================================