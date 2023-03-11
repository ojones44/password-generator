import './style.css';

// Set option elements
const slider = document.getElementById('lengthSelector');
const uppercase = document.getElementById('uppercase');
const lowercase = document.getElementById('lowercase');
const numbers = document.getElementById('numbers');
const specials = document.getElementById('specials');
const resetButton = document.getElementById('reset');

// Set data elements
const length = document.getElementById('length');
const output = document.getElementById('output');
const generate = document.getElementById('generate');
const copyClipboard = document.getElementById('clipboard');
const copyText = document.getElementById('output');
const copiedText = document.getElementById('copied');
const footerText = document.getElementById('footer');

// Strength boxes
const strengthBoxes = document.getElementsByClassName('strength-box');

// Function for updating strength

function setTransparent(index) {
	for (let i = index; i < strengthBoxes.length; i++) {
		strengthBoxes[i].style.backgroundColor = 'transparent';
	}
}

function updateStrength() {
	resetButton.style.display = 'block';
	resetButton.style.visibility = 'visible';

	let passwordScore = 0;

	if (selections() === 0) {
		passwordScore = 0;
	} else if (selections() === 1) {
		passwordScore = 10;
	} else if (selections() === 2) {
		passwordScore = 20;
	} else if (selections() === 3) {
		passwordScore = 30;
	} else if (selections() === 4) {
		passwordScore = 40;
	}

	if (Number(length.innerText) >= 15) {
		passwordScore += 20;
	} else {
		passwordScore += 10;
	}

	if (passwordScore >= 10) {
		strengthBoxes[0].style.backgroundColor = '#F60707';
		setTransparent(1);
	}
	if (passwordScore >= 20) {
		strengthBoxes[1].style.backgroundColor = '#F67207';
		setTransparent(2);
	}
	if (passwordScore >= 30) {
		strengthBoxes[2].style.backgroundColor = '#F6A707';
		setTransparent(3);
	}
	if (passwordScore >= 40) {
		strengthBoxes[3].style.backgroundColor = '#F6DC07';
		setTransparent(4);
	}
	if (passwordScore >= 50) {
		strengthBoxes[4].style.backgroundColor = '#B1F607';
		setTransparent(5);
	}
	if (passwordScore >= 60) {
		strengthBoxes[5].style.backgroundColor = '#56F607';
		setTransparent(6);
	}
}

// Listeners
const checkboxes = document.querySelectorAll('input[type=checkbox]');

checkboxes.forEach((checkbox) => {
	checkbox.addEventListener('change', function () {
		setDefaultMessage();
		updateStrength();
	});
});

resetButton.addEventListener('click', function () {
	setDefaultMessage();
	resetButton.style.display = 'none';
	resetButton.style.visibility = 'hidden';
	length.innerHTML = '15';
	checkboxes.forEach((checkbox) => {
		checkbox.checked = false;
	});

	slider.value = '15';
	setTransparent(0);
});

// Set footer
function footer() {
	const year = new Date().getFullYear();

	footerText.innerText = `Jonesy Creations 😎 ${year}`;
}

footer();

// Messages
const messages = {
	default: 'Click generate!',
	noOptions: 'No options selected!',
	copied: 'Password copied!',
};

// Slider control

length.innerHTML = slider.value;

slider.oninput = function () {
	length.innerHTML = this.value;
	updateStrength();
};

// Password default output

function setDefaultMessage() {
	output.innerHTML = messages.default;
}

setDefaultMessage();

// Validation

function selections() {
	return (
		uppercase.checked + lowercase.checked + numbers.checked + specials.checked
	);
}

// Alert function

function reset() {
	copiedText.style.visibility = 'hidden';
	copiedText.style.display = 'none';
}

function alertUser(msg, time) {
	copiedText.innerHTML = msg;
	copiedText.style.visibility = 'visible';
	copiedText.style.display = 'block';
	setTimeout(() => reset(), time);
}

//  Copy to clipboard

copyClipboard.addEventListener('click', () => {
	if (selections() === 0) {
		alertUser(messages.noOptions, 3000);
	} else {
		// Can't copy to clipboard without input tag so using
		// hidden input tag to store the text
		let hiddenField = document.getElementById('copyText');
		hiddenField.value = copyText.innerHTML;

		// Select the text field in the hidden input element
		hiddenField.select();
		// For mobiles
		hiddenField.setSelectionRange(0, 99999);

		// Copy the text inside the text field
		navigator.clipboard.writeText(hiddenField.value);

		// Show temporary div
		alertUser(messages.copied, 5000);
	}
});

// Generate button

generate.addEventListener('click', generatePassword);

function generatePassword() {
	const passwordLength = Number(length.innerText);

	if (selections() === 0) {
		alertUser(messages.noOptions, 3000);
		return;
	}

	const checked = [
		{
			type: 'uppercase',
			checked: uppercase.checked,
			chars: [65, 90],
		},
		{
			type: 'lowercase',
			checked: lowercase.checked,
			chars: [97, 122],
		},
		{
			type: 'number',
			checked: numbers.checked,
			chars: [48, 57],
		},
		{
			type: 'special',
			checked: specials.checked,
			chars: ['?', '!', '%', '$', '@', '(', ')'],
		},
	];

	output.innerText = getPassword(passwordLength, checked);
}

function range(start, end, step = 1) {
	let range = [];
	for (
		let i = start;
		start > end ? i > end - 1 : i < end + 1;
		start > end ? (i -= step) : (i += step)
	) {
		range.push(i);
	}

	return range;
}

function getCharArray(x, y) {
	return range(x, y).map((number) => String.fromCharCode(number));
}

function getRandInt(x) {
	return Math.floor(Math.random() * x);
}

function getPassword(length, checked) {
	let newPassword = '';
	let charArrayGroup = [];

	// TODO: change logic so it always includes checked items

	checked.forEach((item) => {
		if (item.checked) {
			if (item.type === 'special') {
				charArrayGroup = charArrayGroup.concat(item.chars);
			} else {
				charArrayGroup = charArrayGroup.concat(
					getCharArray(item.chars[0], item.chars[1])
				);
			}
		}
	});

	for (let i = 0; i < length; i++) {
		newPassword += charArrayGroup[getRandInt(charArrayGroup.length - 1)];
	}

	return newPassword;
}
