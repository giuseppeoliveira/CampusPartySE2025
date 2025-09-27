import { useState, useCallback, useRef, useEffect } from 'react';

// Declarações de tipos para Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export interface VoiceSettings {
  rate: number;        // Velocidade da fala (0.1 - 10)
  pitch: number;       // Tom da voz (0 - 2)
  volume: number;      // Volume (0 - 1)
  voice: SpeechSynthesisVoice | null;
}

export interface UseVoiceInteractionReturn {
  // Text-to-Speech
  speak: (text: string) => void;
  stopSpeaking: () => void;
  pauseSpeaking: () => void;
  resumeSpeaking: () => void;
  isSpeaking: boolean;
  isPaused: boolean;
  
  // Speech-to-Text
  startListening: () => void;
  stopListening: () => void;
  isListening: boolean;
  transcript: string;
  clearTranscript: () => void;
  
  // Configurações
  voiceSettings: VoiceSettings;
  updateVoiceSettings: (settings: Partial<VoiceSettings>) => void;
  availableVoices: SpeechSynthesisVoice[];
  
  // Estados e controles
  isSupported: {
    tts: boolean;
    stt: boolean;
  };
  error: string | null;
  clearError: () => void;
}

export const useVoiceInteraction = (): UseVoiceInteractionReturn => {
  // Estados TTS
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  // Estados STT
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  
  // Configurações
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({
    rate: 1,
    pitch: 1,
    volume: 0.8,
    voice: null
  });
  
  // Estados gerais
  const [error, setError] = useState<string | null>(null);
  
  // Refs
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const recognitionRef = useRef<any>(null);
  
  // Verificar suporte
  const isSupported = {
    tts: 'speechSynthesis' in window,
    stt: 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
  };
  
  // Carregar vozes disponíveis
  useEffect(() => {
    if (!isSupported.tts) return;
    
    const loadVoices = () => {
      const voices = speechSynthesis.getVoices();
      setAvailableVoices(voices);
      
      // Selecionar voz em português como padrão
      if (!voiceSettings.voice && voices.length > 0) {
        const portugueseVoice = voices.find(voice => 
          voice.lang.startsWith('pt') || voice.lang.startsWith('pt-BR')
        ) || voices[0];
        
        setVoiceSettings(prev => ({
          ...prev,
          voice: portugueseVoice
        }));
      }
    };
    
    loadVoices();
    speechSynthesis.addEventListener('voiceschanged', loadVoices);
    
    return () => {
      speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, [isSupported.tts, voiceSettings.voice]);
  
  // Configurar reconhecimento de voz
  useEffect(() => {
    if (!isSupported.stt) return;
    
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'pt-BR';
    recognition.maxAlternatives = 1;
    
    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };
    
    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      let interimTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }
      
      setTranscript(finalTranscript || interimTranscript);
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.onerror = (event: any) => {
      let errorMessage = '';
      
      switch (event.error) {
        case 'not-allowed':
          errorMessage = '🎤 Permissão negada. Clique no ícone do cadeado/microfone na barra de endereços e permita o acesso.';
          break;
        case 'no-speech':
          errorMessage = '🔇 Nenhuma fala detectada. Tente falar mais próximo do microfone.';
          break;
        case 'audio-capture':
          errorMessage = '🎤 Erro no microfone. Verifique se está conectado e funcionando.';
          break;
        case 'network':
          errorMessage = '🌐 Erro de conexão. Verifique sua internet.';
          break;
        case 'service-not-allowed':
          errorMessage = '❌ Serviço de reconhecimento não permitido neste site.';
          break;
        default:
          errorMessage = `Erro no reconhecimento de voz: ${event.error}`;
      }
      
      setError(errorMessage);
      setIsListening(false);
    };
    
    recognitionRef.current = recognition;
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [isSupported.stt]);
  
  // Funções TTS
  const speak = useCallback((text: string) => {
    if (!isSupported.tts || !text.trim()) return;
    
    // Parar qualquer fala anterior e limpar erros
    speechSynthesis.cancel();
    setError(null);
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = voiceSettings.rate;
    utterance.pitch = voiceSettings.pitch;
    utterance.volume = voiceSettings.volume;
    
    if (voiceSettings.voice) {
      utterance.voice = voiceSettings.voice;
    }
    
    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
      setError(null);
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    
    utterance.onerror = (event) => {
      // Não mostrar erro quando a fala é interrompida manualmente
      if (event.error !== 'interrupted' && event.error !== 'canceled') {
        setError(`Erro na síntese de voz: ${event.error}`);
      }
      setIsSpeaking(false);
      setIsPaused(false);
    };
    
    utterance.onpause = () => {
      setIsPaused(true);
    };
    
    utterance.onresume = () => {
      setIsPaused(false);
    };
    
    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
  }, [isSupported.tts, voiceSettings]);
  
  const stopSpeaking = useCallback(() => {
    if (isSupported.tts) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
      setError(null); // Limpar qualquer erro quando paramos manualmente
    }
  }, [isSupported.tts]);
  
  const pauseSpeaking = useCallback(() => {
    if (isSupported.tts && isSpeaking) {
      speechSynthesis.pause();
      setIsPaused(true);
    }
  }, [isSupported.tts, isSpeaking]);
  
  const resumeSpeaking = useCallback(() => {
    if (isSupported.tts && isPaused) {
      speechSynthesis.resume();
      setIsPaused(false);
    }
  }, [isSupported.tts, isPaused]);
  
  // Funções STT
  const startListening = useCallback(async () => {
    if (!isSupported.stt || !recognitionRef.current || isListening) return;
    
    // Verificar se há permissão de microfone
    try {
      if (navigator.permissions) {
        const permission = await navigator.permissions.query({ name: 'microphone' as PermissionName });
        if (permission.state === 'denied') {
          setError('🎤 Acesso ao microfone negado. Vá nas configurações do navegador e permita o acesso ao microfone para este site.');
          return;
        }
      }
    } catch (permissionError) {
      console.log('Não foi possível verificar permissões', permissionError);
    }
    
    setTranscript('');
    setError(null);
    
    try {
      recognitionRef.current.start();
    } catch (error) {
      setError('🎤 Erro ao iniciar reconhecimento de voz. Tente novamente em alguns segundos.');
    }
  }, [isSupported.stt, isListening]);
  
  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  }, [isListening]);
  
  // Funções de configuração
  const updateVoiceSettings = useCallback((newSettings: Partial<VoiceSettings>) => {
    setVoiceSettings(prev => ({ ...prev, ...newSettings }));
  }, []);
  
  const clearError = useCallback(() => {
    setError(null);
  }, []);
  
  const clearTranscript = useCallback(() => {
    setTranscript('');
  }, []);
  
  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      if (isSupported.tts) {
        speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [isSupported.tts]);
  
  return {
    // TTS
    speak,
    stopSpeaking,
    pauseSpeaking,
    resumeSpeaking,
    isSpeaking,
    isPaused,
    
    // STT
    startListening,
    stopListening,
    isListening,
    transcript,
    clearTranscript,
    
    // Configurações
    voiceSettings,
    updateVoiceSettings,
    availableVoices,
    
    // Estado
    isSupported,
    error,
    clearError
  };
};