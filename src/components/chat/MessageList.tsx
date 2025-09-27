/**
 * Message List Component
 * Renders list of chat messages with processing indicator
 */

import { memo } from 'react';
import { Card } from '../../../components/ui/card';
import { Message } from '../../types';
import { MessageItem } from './MessageItem';

interface MessageListProps {
  readonly messages: readonly Message[];
  readonly isProcessing: boolean;
  readonly onSuggestionClick: (suggestion: string) => void;
  readonly onDownloadAudio: (messageId: number) => void;
}

export const MessageList = memo<MessageListProps>(({
  messages,
  isProcessing,
  onSuggestionClick,
  onDownloadAudio
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          onSuggestionClick={onSuggestionClick}
          onDownloadAudio={onDownloadAudio}
        />
      ))}
      
      {/* Processing Indicator */}
      {isProcessing && (
        <ProcessingIndicator />
      )}
    </div>
  );
});

/**
 * Processing Indicator Component
 */
const ProcessingIndicator = memo(() => {
  return (
    <div className="flex justify-start">
      <Card className="max-w-[85%] p-3 bg-gray-50 border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div 
              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" 
              style={{ animationDelay: '0.1s' }}
            ></div>
            <div 
              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" 
              style={{ animationDelay: '0.2s' }}
            ></div>
          </div>
          <span className="text-sm text-gray-600">Companheiro Digital está pensando...</span>
        </div>
      </Card>
    </div>
  );
});

ProcessingIndicator.displayName = 'ProcessingIndicator';
MessageList.displayName = 'MessageList';