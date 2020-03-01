import React, { useEffect } from 'react';

import SpeechRecognition from 'react-speech-recognition';

import {
  RecognitionContainer,
  TranscriptContainer,
  MicrophoneOn,
  MicrophoneOff,
  RemoveButton
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
        {finalTranscript ? finalTranscript : transcript}
      </TranscriptContainer>
      {finalTranscript && <RemoveButton onClick={resetTranscript} />}
    </RecognitionContainer>
  );
};

export default SpeechRecognition(options)(RecognitionInput);
