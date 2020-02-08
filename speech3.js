const Text2Speech = require('text2speech-js')

const tts = new TextToSpeech()
tts.text = "Hello World!"
 
// Speak
tts.speak()