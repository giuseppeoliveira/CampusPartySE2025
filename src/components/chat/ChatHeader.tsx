/**
 * Chat Header Component
 * Displays app title, back button, and action buttons
 */

import { memo } from 'react';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { APP_METADATA } from '../../constants';

interface ChatHeaderProps {
  readonly onBackToWelcome: () => void;
  readonly onToggleFAQ: () => void;
  readonly onClearConversation: () => void;
}

export const ChatHeader = memo<ChatHeaderProps>(({ 
  onBackToWelcome, 
  onToggleFAQ, 
  onClearConversation 
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBackToWelcome}
          className="text-white hover:bg-white/20 p-1"
          aria-label="Voltar para tela inicial"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="font-medium">{APP_METADATA.NAME}</h1>
          <p className="text-xs opacity-90">{APP_METADATA.DESCRIPTION}</p>
        </div>
      </div>
      
      <div className="flex space-x-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleFAQ}
          className="text-white hover:bg-white/20 px-3"
          aria-label="Ver perguntas frequentes"
        >
          <span className="font-medium text-sm">FAQ</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearConversation}
          className="text-white hover:bg-white/20"
          aria-label="Limpar conversa"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
});

ChatHeader.displayName = 'ChatHeader';