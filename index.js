// variables

const encryptButton = document.querySelector('#encrypt-btn');
const decryptButton = document.querySelector('#decrypt-btn');
const copyButton = document.querySelector('#copy-btn')
const userInputBox = document.querySelector('#input');
const outputBox = document.querySelector('#output');
const originalNotFound = outputBox.innerHTML;

const dictionary = {
    'a': 'ai',
    'e': 'enter',
    'i': 'imes',
    'o': 'ober',
    'u': 'ufat'
};

// events

encryptButton.addEventListener('click', function(){
    if (userInputBox.value) {
        updateOutput(encrypt, userInputBox.value);
        showCopyButton();
    } else {
        outputBox.innerHTML = originalNotFound;
        hideCopyButton();
    }
});

decryptButton.addEventListener('click', function(){
    if (userInputBox.value) {
        updateOutput(decrypt, userInputBox.value);
        showCopyButton();
    } else {
        outputBox.innerHTML = originalNotFound;
        hideCopyButton();
    }
});

copyButton.addEventListener('click', function(){
    copy(outputBox.innerHTML).then(setTimeout(function() {
        document.querySelector('#copy-btn-text').innerHTML = 'COPIAR';
    }, 1000));
});

// functions

function updateOutput(func, text) {
    let value = func(text);
    outputBox.innerHTML = value;
}

function encrypt(text) {
    let letters = text.split('');
    let result = letters.map(letter => {
        return dictionary.hasOwnProperty(letter) ? dictionary[letter] : letter;
    });
    return result.join('');
}

function decrypt(text) {
    for (let key in dictionary) {
        let encrypted = dictionary[key];
        let regex = new RegExp(encrypted, "g");
        text = text.replaceAll(regex, key);
    }
    return text;
}

async function copy(text) {
    if (outputBox.innerHTML !== originalNotFound) {
        try {
            await navigator.clipboard.writeText(text);
            let btnText = document.querySelector('#copy-btn-text');
            btnText.innerHTML = 'COPIADO';
        } catch (error) {
            console.log(error);
        }
    }
}

function showCopyButton() {
    copyButton.setAttribute('class', 'btn red-btn');
}

function hideCopyButton() {
    copyButton.setAttribute('class', 'btn red-btn hidden');
}

function rejectKeys(input) {
    input.value = input.value.replace(/[^a-z]\s*/gi, ''); 
}