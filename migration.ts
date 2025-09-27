/**
 * Migration Script - Clean Architecture Implementation
 * Simple migration to use refactored components
 */

// Option 1: Use the refactored App component
export { default as App } from './AppRefactored';

// Option 2: Use individual refactored components
export { ChatScreenRefactored as ChatScreen } from './components/ChatScreenRefactored';

// Option 3: Keep both versions available
export { default as AppOriginal } from './App';
export { default as AppRefactored } from './AppRefactored';
export { ChatScreen as ChatScreenOriginal } from './components/ChatScreen';
export { ChatScreenRefactored } from './components/ChatScreenRefactored';