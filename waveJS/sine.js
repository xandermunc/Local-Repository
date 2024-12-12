// Create an audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to play a sine wave at a given frequency
function playSineWave(frequency, duration) {
    // Create an oscillator node
    const oscillator = audioContext.createOscillator();
    
    // Set the oscillator type to 'sine'
    oscillator.type = 'sine';
    
    // Set the frequency to A1 (approximately 55 Hz)
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    
    // Connect the oscillator to the audio context's destination (speakers)
    oscillator.connect(audioContext.destination);
    
    // Start the oscillator
    oscillator.start();
    
    // Stop the oscillator after the specified duration
    oscillator.stop(audioContext.currentTime + duration);
}

// Play a sine wave tone at A1 for 2 seconds
playSineWave(55, 2);
