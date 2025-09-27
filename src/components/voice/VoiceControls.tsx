import React, { memo, useState } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Play, Pause, Square, Settings } from 'lucide-react';
import { useVoiceInteraction } from '../../hooks/useVoiceInteraction';
import { VoiceSettings } from './VoiceSettings';

interface VoiceControlsProps {
  text?: string;
  onTranscriptChange?: (transcript: string) => void;
  onError?: (error: string) => void;
  showTTSControls?: boolean;
  showSTTControls?: boolean;
  showSettings?: boolean;
  className?: string;
}

export const VoiceControls = memo<VoiceControlsProps>(({
  text = '',
  onTranscriptChange,
  onError,
  showTTSControls = true,
  showSTTControls = true,
  showSettings = false,
  className = ''
}) => {
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  
  const {
    speak,
    stopSpeaking,
    pauseSpeaking,
    resumeSpeaking,
    isSpeaking,
    isPaused,
    startListening,
    stopListening,
    isListening,
    transcript,
    clearTranscript,
    isSupported,
    error,
    clearError
  } = useVoiceInteraction();

  // Notificar mudanças no transcript
  React.useEffect(() => {
    if (transcript && onTranscriptChange) {
      onTranscriptChange(transcript);
      // Limpar transcript após ser usado para evitar duplicação
      setTimeout(() => clearTranscript(), 100);
    }
  }, [transcript, onTranscriptChange, clearTranscript]);

  // Notificar erros via callback
  React.useEffect(() => {
    if (error && onError) {
      onError(error);
      clearError(); // Limpar erro após notificar
    }
  }, [error, onError, clearError]);

  // Controles TTS
  const handleSpeak = () => {
    if (isSpeaking) {
      if (isPaused) {
        resumeSpeaking();
      } else {
        pauseSpeaking();
      }
    } else {
      speak(text);
    }
  };

  const handleStop = () => {
    stopSpeaking();
  };

  // Controles STT
  const handleMicrophoneToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Controles de Text-to-Speech */}
      {showTTSControls && isSupported.tts && text && (
        <div className="flex items-center gap-1">
          <button
            onClick={handleSpeak}
            disabled={!text.trim()}
            className={`
              p-2 rounded-lg transition-all duration-200 flex items-center justify-center
              ${isSpeaking 
                ? 'bg-blue-100 text-blue-600 hover:bg-blue-200' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
              disabled:opacity-50 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
            `}
            title={
              isSpeaking 
                ? (isPaused ? 'Continuar leitura' : 'Pausar leitura') 
                : 'Escutar resposta'
            }
          >
            {isSpeaking ? (
              isPaused ? <Play size={18} /> : <Pause size={18} />
            ) : (
              <Volume2 size={18} />
            )}
          </button>

          {isSpeaking && (
            <button
              onClick={handleStop}
              className="
                p-2 rounded-lg transition-all duration-200 flex items-center justify-center
                bg-red-100 text-red-600 hover:bg-red-200
                focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
              "
              title="Parar leitura"
            >
              <Square size={18} />
            </button>
          )}
        </div>
      )}

      {/* Controles de Speech-to-Text */}
      {showSTTControls && isSupported.stt && (
        <button
          onClick={handleMicrophoneToggle}
          className={`
            p-2 rounded-lg transition-all duration-200 flex items-center justify-center
            ${isListening 
              ? 'bg-red-100 text-red-600 hover:bg-red-200 animate-pulse' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
          `}
          title={isListening ? 'Parar gravação' : 'Iniciar gravação de voz'}
        >
          {isListening ? <MicOff size={18} /> : <Mic size={18} />}
        </button>
      )}

      {/* Controles de configuração */}
      {showSettings && (
        <button
          onClick={() => setShowSettingsModal(true)}
          className="
            p-2 rounded-lg transition-all duration-200 flex items-center justify-center
            bg-gray-100 text-gray-600 hover:bg-gray-200
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
          "
          title="Configurações de voz"
        >
          <Settings size={18} />
        </button>
      )}

      {/* Modal de Configurações */}
      <VoiceSettings 
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />

      {/* Indicador de status */}
      {(isSpeaking || isListening) && (
        <div className="flex items-center gap-1 text-sm text-gray-500">
          {isSpeaking && (
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              {isPaused ? 'Pausado' : 'Falando'}
            </span>
          )}
          {isListening && (
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              Escutando
            </span>
          )}
        </div>
      )}

      {/* Display de transcript em tempo real */}
      {transcript && isListening && (
        <div className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-lg max-w-xs truncate">
          {transcript}
        </div>
      )}

      {/* Indicadores de suporte */}
      {(!isSupported.tts && showTTSControls) && (
        <span className="text-xs text-gray-400" title="Text-to-Speech não suportado">
          <VolumeX size={16} />
        </span>
      )}

      {(!isSupported.stt && showSTTControls) && (
        <span className="text-xs text-gray-400" title="Speech-to-Text não suportado">
          <MicOff size={16} />
        </span>
      )}
    </div>
  );
});

VoiceControls.displayName = 'VoiceControls';