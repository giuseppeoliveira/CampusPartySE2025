/**
 * Refactored ChatScreen Component
 * Clean architecture implementation following SOLID principles
 */

import { useState, useCallback, useMemo } from 'react';
import { ChatScreenProps } from '../src/types';
import { FAQCategories } from './FAQCategories';
import { ChatHeader } from '../src/components/chat/ChatHeader';
import { MessageList } from '../src/components/chat/MessageList';
import { MessageInput } from '../src/components/chat/MessageInput';
import { SuggestionsPanel } from '../src/components/chat/SuggestionsPanel';
import { useChatMessages, useMessageProcessing } from '../src/hooks/useChatMessages';
import { useVoiceInteraction } from '../src/hooks/useVoiceInteraction';
import { ANIMATION_DELAYS } from '../src/constants';

export function ChatScreenRefactored({ onBackToWelcome }: ChatScreenProps) {
  // State management
  const [inputText, setInputText] = useState('');
  const [showFAQCategories, setShowFAQCategories] = useState(false);
  
  // Custom hooks
  const {
    messages,
    addMessage,
    clearMessages,
    isProcessing,
    setIsProcessing
  } = useChatMessages();
  
  const { processMessage } = useMessageProcessing(addMessage, setIsProcessing);
  
  const {
    isRecording,
    toggleRecording,
    downloadAudio
  } = useVoiceInteraction();

  // Memoized handlers for performance optimization
  const handleSendMessage = useCallback(async () => {
    if (inputText.trim() && !isProcessing) {
      const messageText = inputText;
      setInputText('');
      await processMessage(messageText);
    }
  }, [inputText, isProcessing, processMessage]);

  const handleInputChange = useCallback((value: string) => {
    setInputText(value);
  }, []);

  const handleToggleFAQ = useCallback(() => {
    setShowFAQCategories(prev => !prev);
  }, []);

  const handleClearConversation = useCallback(() => {
    clearMessages();
    setShowFAQCategories(false);
  }, [clearMessages]);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setInputText(suggestion);
  }, []);

  const handleFAQQuestionSelect = useCallback((question: string) => {
    if (!isProcessing) {
      setInputText(question);
      setShowFAQCategories(false);
      
      // Auto-send the selected question
      setTimeout(() => {
        setInputText(question);
        setTimeout(() => {
          processMessage(question);
        }, ANIMATION_DELAYS.SEND_MESSAGE_DELAY);
      }, ANIMATION_DELAYS.AUTO_SEND_DELAY);
    }
  }, [isProcessing, processMessage]);

  // Memoized computed values
  const shouldShowSuggestions = useMemo(() => 
    !showFAQCategories && messages.length === 1, 
    [showFAQCategories, messages.length]
  );

  return (
    <div className="h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Header */}
      <ChatHeader
        onBackToWelcome={onBackToWelcome}
        onToggleFAQ={handleToggleFAQ}
        onClearConversation={handleClearConversation}
      />

      {/* FAQ Categories or Suggestions */}
      {showFAQCategories ? (
        <FAQCategories onQuestionSelect={handleFAQQuestionSelect} />
      ) : shouldShowSuggestions ? (
        <SuggestionsPanel
          showFAQCategories={showFAQCategories}
          onToggleFAQ={handleToggleFAQ}
          onSuggestionClick={handleSuggestionClick}
          messagesCount={messages.length}
        />
      ) : null}

      {/* Chat Messages */}
      <MessageList
        messages={messages}
        isProcessing={isProcessing}
        onSuggestionClick={handleSuggestionClick}
        onDownloadAudio={downloadAudio}
      />

      {/* Message Input */}
      <MessageInput
        value={inputText}
        onChange={handleInputChange}
        onSend={handleSendMessage}
        onToggleRecording={toggleRecording}
        isRecording={isRecording}
        isProcessing={isProcessing}
      />
    </div>
  );
}