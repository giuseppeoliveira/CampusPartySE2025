/**
 * Components Index - Clean Architecture Exports
 * Centralized exports following clean code principles
 */

// Main application components
export { default as AppRefactored } from '../AppRefactored';

// Screen components
export { WelcomeScreen } from './WelcomeScreen';
export { ChatScreenRefactored } from './ChatScreenRefactored';

// Chat-specific components
export { ChatHeader } from '../src/components/chat/ChatHeader';
export { MessageList } from '../src/components/chat/MessageList';
export { MessageInput } from '../src/components/chat/MessageInput';
export { MessageItem } from '../src/components/chat/MessageItem';
export { SuggestionsPanel } from '../src/components/chat/SuggestionsPanel';

// Utility components
export { FAQCategories } from './FAQCategories';

// UI Components (re-exported for convenience)
export { Button } from './ui/button';
export { Input } from './ui/input';
export { Card } from './ui/card';
export { Badge } from './ui/badge';