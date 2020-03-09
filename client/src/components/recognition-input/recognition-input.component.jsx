import React, { useEffect, useCallback } from 'react';

import SpeechRecognition from 'react-speech-recognition';

import { translate } from '../../dictionary/dictionary.translate';

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
  recognition,
  updateHardware
}) => {
  const memoizedUpdateHardware = useCallback(() => {
    const data = translate(finalTranscript);

    if (data === null) return;
    updateHardware(data);
    resetTranscript();
  }, [finalTranscript, updateHardware, resetTranscript]);

  useEffect(() => {
    if (finalTranscript) memoizedUpdateHardware();
    if (recognition) recognition['lang'] = 'sk-SK';
  }, [recognition, finalTranscript, memoizedUpdateHardware]);

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

export default SpeechRecognition(options)(React.memo(RecognitionInput));
