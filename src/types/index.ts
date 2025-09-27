/**
 * Central type definitions for the application
 * Following TypeScript best practices for maintainable code
 */

// Core domain entities
export interface FAQItem {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
  readonly keywords: readonly string[];
  readonly category: string;
  readonly steps?: readonly string[];
  readonly relatedLinks?: readonly RelatedLink[];
}

export interface RelatedLink {
  readonly text: string;
  readonly url: string;
}

export interface Message {
  readonly id: number;
  readonly text: string;
  readonly type: MessageType;
  readonly timestamp: Date;
  readonly audioUrl?: string;
  readonly hasAudio?: boolean;
  readonly faqItem?: FAQItem;
  readonly isFromFAQ?: boolean;
  readonly aiSuggestions?: readonly string[];
  readonly interpretedQuery?: string;
}

// Enums for better type safety
export type MessageType = 'user' | 'assistant';

export type Screen = 'welcome' | 'chat';

export type FAQCategory = 
  | 'Documentos' 
  | 'Previdência' 
  | 'Saúde' 
  | 'Benefícios' 
  | 'Educação' 
  | 'Trabalho' 
  | 'Geral' 
  | 'Acesso';

// AI interpretation types
export interface AIInterpretation {
  readonly interpretedQuery: string;
  readonly suggestions: readonly string[];
  readonly confidence: number;
}

export interface IntentPattern {
  readonly pattern: RegExp;
  readonly intent: IntentType;
  readonly confidence: number;
}

export type IntentType = 
  | 'how_to_obtain' 
  | 'how_to_check' 
  | 'want_to_obtain' 
  | 'where_to_do' 
  | 'digital_service' 
  | 'general';

// Component props interfaces
export interface ChatScreenProps {
  readonly onBackToWelcome: () => void;
}

export interface WelcomeScreenProps {
  readonly onStartChat: () => void;
}

export interface FAQCategoriesProps {
  readonly onQuestionSelect: (question: string) => void;
}

// Search and scoring types
export interface FAQSearchResult {
  readonly item: FAQItem;
  readonly score: number;
}

// Synonym mapping type
export type SynonymMap = Record<string, readonly string[]>;

// Hook return types
export interface UseChatMessages {
  readonly messages: readonly Message[];
  readonly addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  readonly clearMessages: () => void;
  readonly isProcessing: boolean;
  readonly setIsProcessing: (processing: boolean) => void;
}

export interface UseTextRenderer {
  readonly renderTextWithClickableLinks: (text: string) => React.ReactElement;
  readonly renderFormattedText: (text: string) => React.ReactElement;
}

// Utility types
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

// Event handler types
export type MessageHandler = (message: string) => Promise<void> | void;
export type SuggestionHandler = (suggestion: string) => void;
export type LinkClickHandler = (url: string) => void;