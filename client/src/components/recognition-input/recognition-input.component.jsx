// Importovanie potrebnych packages
import React, { useEffect, useCallback } from 'react';
import SpeechRecognition from 'react-speech-recognition';

// Importovanie funkcionalit rozpoznania hlasovych prikazov
import { translate } from '../../dictionary/dictionary.translate';

// Importovanie potrebnych styles
import {
  RecognitionContainer,
  TranscriptContainer,
  MicrophoneOn,
  MicrophoneOff,
  RemoveButton,
  BouncingDot,
} from './recognition-input.styles';

// Nastavenie rozponavia hlasu
const options = {
  autoStart: false,
  continuous: false,
};

const RecognitionInput = ({
  transcript,
  finalTranscript,
  listening,
  startListening,
  stopListening,
  resetTranscript,
  browserSupportsSpeechRecognition,
  recognition,
  hardwareType,
  updateHardware,
}) => {
  // Funkcia pre vykonanie aktualizacie hardverovej sucasti
  const memoizedUpdateHardware = useCallback(() => {
    // Objekt dat, ktory bol vrateny funkciou: `translate` v pripade najdenia hlasoveho prikazu
    const data = translate(hardwareType, finalTranscript);
    // Overenie existencie objektu
    if (data === null) return;
    // Aktualizacia dat hardverovej sucasti
    updateHardware(data);
    // Resetovanie transcriptu na prazdny String
    resetTranscript();
  }, [finalTranscript, hardwareType, updateHardware, resetTranscript]);

  useEffect(() => {
    // V pripade uspesneho zadania hlasoveho vstupu, spusti funkciu: `memoizedUpdateHardware`
    if (finalTranscript) memoizedUpdateHardware();
    // V pripade dostupnosti rozpoznavania reci Mozilla Speech API v klientskom prehliadaci nastav jazyk na slovencinu
    if (recognition) recognition['lang'] = 'sk-SK';
  }, [recognition, finalTranscript, memoizedUpdateHardware]);

  // V pripade, ze klientsky prehliadac nepodporuje Mozilla Web Speech API, nezobraz na stranke moznost zadavania hlasovych povelov
  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <RecognitionContainer>
      {/* Podla aktualneho diktovania vstupu zobraz mikrofon */}
      {listening & !finalTranscript ? (
        <MicrophoneOn onClick={stopListening} />
      ) : (
        <MicrophoneOff onClick={startListening} />
      )}
      <TranscriptContainer>
        {/* Ak bol vstup uspesne zaznamenany, vypis ho ako text */}
        {finalTranscript
          ? finalTranscript
          : transcript || (
              <React.Fragment>
                Žačni ovládať domácnosť hlasom
                <BouncingDot>.</BouncingDot>
                <BouncingDot delay={0.4}>.</BouncingDot>
                <BouncingDot delay={1.2}>.</BouncingDot>
              </React.Fragment>
            )}
      </TranscriptContainer>
      {/* Ak bol vstup uspesne zaznamenany, umozni ho pouzivatelovi resetovat manualne klknutim na tlacidlo */}
      {finalTranscript && <RemoveButton onClick={resetTranscript} />}
    </RecognitionContainer>
  );
};

export default SpeechRecognition(options)(React.memo(RecognitionInput));
