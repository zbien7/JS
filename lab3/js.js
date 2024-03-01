const KeyToSound = {
    'a': document.querySelector('#s1'), // Mapuje klawisz na odpowiedni dźwięk
    's': document.querySelector('#s2'),
    'd': document.querySelector('#s3'),
    'f': document.querySelector('#s4'),
}

const recordingChannels = { // Przechowuje nagrane dźwięki na różnych kanałach
    channel1: [],
    channel2: [],
    channel3: [],
    channel4: [],
}

function onKeyPress(event) {
    const sound = KeyToSound[event.key]; // Pobiera dźwięk dla wciśniętego klawisza
    if (sound) {
        playSound(sound); // Odtwarza dźwięk
        recordSound(sound, activeChannel); // Nagrywa dźwięk na aktywnym kanale
    }
}

let activeChannel = 'channel1'; // Ustawia domyślny aktywny kanał na pierwszy

function setActiveChannel(channel) { // Ustawia aktywny kanał
    activeChannel = channel;
}

function playSound(sound) { // Odtwarza dźwięk
    sound.currentTime = 0; // Ustawia czas dźwięku na początku
    sound.play(); // Odtwarza dźwięk
}

function recordSound(sound, channel) { // Nagrywa dźwięk na danym kanale
    if (recordingChannels[channel]) {
        recordingChannels[channel].push(sound.cloneNode()); // Dodaje kopię dźwięku do kanału
    }
}

function startRecording(channel) { // Rozpoczyna nagrywanie na danym kanale
    recordingChannels[channel] = []; // Czyści kanał przed nagrywaniem
    setActiveChannel(channel); // Ustawia aktywny kanał
}

function stopRecording(channel) { // Zatrzymuje nagrywanie na danym kanale
    recordingChannels[channel] = recordingChannels[channel] || []; // Tworzy pusty kanał jeśli nie istnieje
}

function playChannel(channel) { // Odtwarza dźwięki na danym kanale
    const sounds = recordingChannels[channel]; // Pobiera zarejestrowane dźwięki dla danego kanału
    const delay = 300; // Opóźnienie między odtworzeniami dźwięków
    let currentTime = 0;

    sounds.forEach((sound) => { // Iteruje przez dźwięki i odtwarza je z opóźnieniem
        setTimeout(() => {
            playSound(sound);
        }, currentTime);

        currentTime += delay; // Zwiększa czas odtwarzania dla następnego dźwięku
    });
}

function playAllChannels() { // Odtwarza wszystkie kanały jednocześnie
    for (let channel in recordingChannels) { // Iteruje przez wszystkie kanały
        playChannel(channel); // Odtwarza dźwięki na danym kanale
    }
}

window.addEventListener('beforeunload', () => { // Zapisuje dane do localStorage przed odświeżeniem strony
    localStorage.setItem('recordedData', JSON.stringify(recordingChannels));
});

if (localStorage.getItem('recordedData')) { // Wczytuje zapisane dane z localStorage
    const savedData = JSON.parse(localStorage.getItem('recordedData'));
    Object.assign(recordingChannels, savedData); // Aktualizuje rekordowane kanały
}

document.addEventListener('keypress', onKeyPress); // Nasłuchuje zdarzenia naciśnięcia klawisza
