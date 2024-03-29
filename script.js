function generateMorseCode() {
	const code = {};
	const letters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,?\'!/()&:;=+-_"$@ ';

	const morseValues =
		[
			'.-', '-...', '-.-.', '-..', '.', '..-.',
			'--.', '....', '..', '.---',
			'-.-', '.-..', '--', '-.', '---',
			'.--.', '--.-', '.-.', '...', '-',
			'..-', '...-', '.--', '-..-', '-.--',
			'--..', '-----', '.----', '..---',
			'...--', '....-', '.....', '-....',
			'--...', '---..', '----.', '.-.-.-',
			'--..--', '..--..', '.----.', '-.-.--',
			'-..-.', '-.--.', '-.--.-',
			'.-...', '---...', '-.-.-.', '-...-',
			'.-.-.', '-....-', '..--.-',
			'.-..-.', '...-..-', '.--.-.'
		];

	for (let i = 0; i < letters.length; i++) {
		code[letters[i]] = morseValues[i];
	}

	return code;
}

const morseCode = generateMorseCode();

const reverseMorseCode = {};
for (const key in morseCode) {
	if (morseCode.hasOwnProperty(key)) {
		const value = morseCode[key];
		reverseMorseCode[value] = key;
	}
}

const translateTextToMorse = (text) => {
	const words = text.split(' ');
	const translatedWords =
		words.map((word) => {
			const chars = word.split('');
			const morseChars = chars.map((char) => {
				return morseCode[char] || char;
			});
			return morseChars.join(' ');
		});
	return translatedWords.join('/');
};

const translateMorseToText = (morseText) => {
	const morseWords = morseText.split('/');
	const translatedWords =
		morseWords.map((morseWord) => {
			const morseChars = morseWord.split(' ');
			return morseChars
				.map((morseChar) => {
					return reverseMorseCode[morseChar]
						|| morseChar;
				})
				.join('');
		});
	return translatedWords.join(' ');
};

// Function, translation from Morse code to text handle karne ke liye
const handleMorseToTextTranslate = () => {
	const morseToText =
		document.getElementById('morseToText')
			.value.trim().toUpperCase();

	if (morseToText === '') {
		document.getElementById('morseToTextOutput')
			.textContent = 'No Input Provided';
		return;
	}

	const translatedText =
		translateMorseToText(morseToText);
	document.getElementById('morseToTextOutput')
		.textContent = translatedText;
};

// Function, translation from text to Morse code handle karne ke liye
const handleTextToMorseTranslate = () => {
	const textToMorse =
		document.getElementById('textToMorse')
			.value.trim().toUpperCase();

	if (textToMorse === '') {
		document.getElementById('textToMorseOutput')
			.textContent = 'No Input Provided';
		return;
	}

	const translatedMorse =
		translateTextToMorse(textToMorse);
	document.getElementById('textToMorseOutput')
		.textContent = translatedMorse;
};


const showSuccessMessage =
	(elementId, message) => {
		const successMessage =
			document.getElementById(elementId);
		successMessage.textContent = message;
		setTimeout(() => {
			successMessage.textContent = '';
		}, 2000); 
	};

const copyMorseToTextOutput = () => {
	const morseToTextOutput =
		document.getElementById('morseToTextOutput');
	const text =
		morseToTextOutput.textContent;
	copyTextToClipboard(text);
	showSuccessMessage('morseToTextSuccessMessage',
		'Copied to Clipboard!!');
};

const copyTextToMorseOutput = () => {
	const textToMorseOutput =
		document.getElementById('textToMorseOutput');
	const text =
		textToMorseOutput.textContent;
	copyTextToClipboard(text);
	showSuccessMessage('textToMorseSuccessMessage',
		'Copied to Clipboard!!');
};

const copyTextToClipboard = (text) => {
	const textArea =
		document.createElement("textarea");
	textArea.value = text;
	document.body.appendChild(textArea);
	textArea.select();
	document.execCommand('copy');
	document.body.removeChild(textArea);
};