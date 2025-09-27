/**
 * Message Input Component
 * Handles message input, voice recording, and sending
 */

import { memo, useCallback, KeyboardEvent } from 'react';
import { Mic, Send } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';

interface MessageInputProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly onSend: () => void;
  readonly onToggleRecording: () => void;
  readonly isRecording: boolean;
  readonly isProcessing: boolean;
  readonly placeholder?: string;
}

export const MessageInput = memo<MessageInputProps>(({
  value,
  onChange,
  onSend,
  onToggleRecording,
  isRecording,
  isProcessing,
  placeholder = "Pergunte sobre serviços públicos..."
}) => {
  const handleKeyPress = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isProcessing) {
      onSend();
    }
  }, [onSend, isProcessing]);

  const canSend = value.trim() && !isProcessing;

  return (
    <div className="p-4 border-t bg-card">
      <div className="flex gap-2 items-center">
        <div className="flex-1 relative">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="pr-12"
            disabled={isProcessing}
            aria-label="Digite sua mensagem"
          />
          <Button
            size="sm"
            variant="ghost"
            onClick={onSend}
            disabled={!canSend}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
            aria-label="Enviar mensagem"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        <Button
          size="lg"
          variant={isRecording ? "destructive" : "secondary"}
          onClick={onToggleRecording}
          disabled={isProcessing}
          className="h-12 w-12 rounded-full p-0"
          aria-label={isRecording ? "Parar gravação" : "Iniciar gravação"}
        >
          <Mic className={`h-5 w-5 ${isRecording ? 'animate-pulse' : ''}`} />
        </Button>
      </div>

      {isRecording && (
        <div className="mt-2 text-center">
          <span className="text-sm text-muted-foreground animate-pulse">
            🔴 Gravando... Toque novamente para parar
          </span>
        </div>
      )}
    </div>
  );
});

MessageInput.displayName = 'MessageInput';