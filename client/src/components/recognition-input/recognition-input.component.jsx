import React, { useEffect } from 'react';

import SpeechRecognition from 'react-speech-recognition';

import {
  RecognitionContainer,
  TranscriptContainer,
  MicrophoneOn,
  MicrophoneOff,
  RemoveButton,
  BouncingDot
} from './recognition-input.styles';

const options = {
  autoStart: false,
  continuous: false
};

const RecognitionInput = ({
  transcript,
  finalTranscript,
  listening,
  startListening,
  stopListening,
  resetTranscript,
  browserSupportsSpeechRecognition,
  recognition
}) => {
  useEffect(() => {
    recognition.lang = 'sk-SK';
  }, [recognition.lang]);

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <RecognitionContainer>
      {listening & !finalTranscript ? (
        <MicrophoneOn onClick={stopListening} />
      ) : (
        <MicrophoneOff onClick={startListening} />
      )}
      <TranscriptContainer>
        {finalTranscript
          ? finalTranscript
          : transcript || (
              <React.Fragment>
                Žačni domácnosť ovládať hlasom
                <BouncingDot>.</BouncingDot>
                <BouncingDot delay={0.4}>.</BouncingDot>
                <BouncingDot delay={1.2}>.</BouncingDot>
              </React.Fragment>
            )}
      </TranscriptContainer>
      {finalTranscript && <RemoveButton onClick={resetTranscript} />}
    </RecognitionContainer>
  );
};

export default SpeechRecognition(options)(RecognitionInput);
