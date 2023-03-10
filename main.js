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

// Strength boxes
const strengthBoxes = document.getElementsByClassName('strength-box');

// Options control

// Slider control

length.innerHTML = slider.value;

slider.oninput = function () {
	length.innerHTML = this.value;
};

// Password default output

output.innerHTML = 'Click generate!';

//  Copy to clipboard

copyClipboard.addEventListener('click', () => {
	let copyText = document.getElementById('output');
	let copiedText = document.getElementById('copied');

	if (copyText.innerText === 'Click generate!') {
		copiedText.innerHTML = 'No options selected!';
		copiedText.style.visibility = 'visible';
		setTimeout(() => (copiedText.style.visibility = 'hidden'), 3000);
	} else {
		// Can't copy to clipboard without input tag so using
		// hidden input tag to store the text
		let hiddenField = document.getElementById('copyText');
		hiddenField.value = copyText.innerHTML;

		// Select the text field in the hidden input element
		hiddenField.select();
		hiddenField.setSelectionRange(0, 99999); // For mobile devices

		// Copy the text inside the text field
		navigator.clipboard.writeText(hiddenField.value);

		// Show temporary div
		copiedText.innerHTML = 'Password copied!';
		copiedText.style.visibility = 'visible';
		setTimeout(() => (copiedText.style.visibility = 'hidden'), 5000);
	}
});

// Generate button

generate.addEventListener('click', generatePassword);

function generatePassword() {
	const passwordLength = Number(length.innerText);

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
			chars: ['?', '!', '%', '$'],
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

	// TODO: set up score system for strength boxes
	// let passwordScore = 0;

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
