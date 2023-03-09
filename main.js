import './style.css';

// Set ID elements
const slider = document.getElementById('lengthSelector');
const length = document.getElementById('length');
const output = document.getElementById('output');
const generate = document.getElementById('generate');
const copyClipboard = document.getElementById('clipboard');

// Checkbox ID elements
const uppercase = document.getElementById('uppercase');
const lowercase = document.getElementById('lowercase');
const numbers = document.getElementById('numbers');
const specials = document.getElementById('specials');

// Slider control

length.innerHTML = slider.value;

slider.oninput = function () {
	length.innerHTML = this.value;
};

// Password default output

output.innerHTML = 'Click generate!';

//  Copy to clipboard

copyClipboard.addEventListener('click', () => {
	navigator.clipboard.writeText(output.innerText);
	alert('Password copied to clipboard!');
});

// Generate button

generate.addEventListener('click', generatePassword);

function generatePassword() {
	const passwordLength = Number(length.innerText);

	const checked = {
		upper: uppercase.checked,
		lower: lowercase.checked,
		numbers: numbers.checked,
		special: specials.checked,
	};

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

	charArrayGroup = charArrayGroup.concat(
		getCharArray(97, 122),
		getCharArray(65, 90),
		getCharArray(48, 57)
	);

	if (checked.special) {
		charArrayGroup = charArrayGroup.concat(['?', '!', '%', '$']);
	}

	for (let i = 0; i < length; i++) {
		newPassword += charArrayGroup[getRandInt(charArrayGroup.length - 1)];
	}

	return newPassword;
}
