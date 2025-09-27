/**
 * Message Input Component
 * Handles message input, voice recording, and sending
 */

import { memo, useCallback, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { VoiceControls } from '../voice/VoiceControls';

interface MessageInputProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly onSend: () => void;
  readonly isProcessing: boolean;
  readonly placeholder?: string;
}

export const MessageInput = memo<MessageInputProps>(({
  value,
  onChange,
  onSend,
  isProcessing,
  placeholder = "Pergunte sobre serviços públicos..."
}) => {
  const handleKeyPress = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isProcessing) {
      onSend();
    }
  }, [onSend, isProcessing]);

  const handleTranscriptChange = useCallback((transcript: string) => {
    if (transcript.trim()) {
      onChange(transcript);
    }
  }, [onChange]);

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
        
        {/* Voice Controls com STT */}
        <VoiceControls 
          onTranscriptChange={handleTranscriptChange}
          showTTSControls={false}
          showSTTControls={true}
          className="shrink-0"
        />
      </div>
    </div>
  );
});

MessageInput.displayName = 'MessageInput';