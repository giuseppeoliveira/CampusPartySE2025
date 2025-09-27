/**
 * Chat Messages Hook
 * Manages chat state and message operations following clean code principles
 */

import { useState, useCallback } from 'react';
import { Message, MessageType, UseChatMessages } from '../types';
import { APP_METADATA, ANIMATION_DELAYS } from '../constants';
import { FAQService } from '../services/faq-service';

/**
 * Custom hook for managing chat messages and interactions
 */
export const useChatMessages = (): UseChatMessages => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: APP_METADATA.INITIAL_MESSAGE,
      type: "assistant",
      timestamp: new Date(),
      hasAudio: true
    }
  ]);
  
  const [isProcessing, setIsProcessing] = useState(false);

  /**
   * Adds a new message to the chat
   */
  const addMessage = useCallback((messageData: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...messageData,
      id: Date.now(),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
  }, []);

  /**
   * Clears all messages and resets to initial state
   */
  const clearMessages = useCallback(() => {
    setMessages([{
      id: 1,
      text: APP_METADATA.INITIAL_MESSAGE,
      type: "assistant",
      timestamp: new Date(),
      hasAudio: true
    }]);
  }, []);

  return {
    messages,
    addMessage,
    clearMessages,
    isProcessing,
    setIsProcessing
  };
};

/**
 * Message Processing Hook
 * Handles message sending logic and FAQ integration
 */
export const useMessageProcessing = (
  addMessage: UseChatMessages['addMessage'],
  setIsProcessing: UseChatMessages['setIsProcessing']
) => {
  /**
   * Processes and sends a message
   */
  const processMessage = useCallback(async (text: string): Promise<void> => {
    if (!text.trim()) return;
    
    setIsProcessing(true);
    
    // Add user message
    addMessage({
      text,
      type: 'user' as MessageType
    });
    
    // Simulate processing delay for better UX
    await new Promise(resolve => setTimeout(resolve, ANIMATION_DELAYS.PROCESSING_DELAY));
    
    // Process with AI
    const interpretation = FAQService.interpretQuestion(text);
    const faqResult = FAQService.searchFAQ(text);
    
    // Generate appropriate response
    if (faqResult) {
      addMessage({
        text: faqResult.answer,
        type: 'assistant' as MessageType,
        hasAudio: true,
        faqItem: faqResult,
        isFromFAQ: true,
        aiSuggestions: interpretation.suggestions,
        interpretedQuery: interpretation.confidence > 0.7 ? interpretation.interpretedQuery : undefined
      });
    } else {
      addMessage({
        text: FAQService.generateAIResponse(text),
        type: 'assistant' as MessageType,
        hasAudio: true,
        isFromFAQ: false,
        aiSuggestions: interpretation.suggestions,
        interpretedQuery: interpretation.confidence > 0.7 ? interpretation.interpretedQuery : undefined
      });
    }
    
    setIsProcessing(false);
  }, [addMessage, setIsProcessing]);

  return { processMessage };
};