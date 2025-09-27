/**
 * Refactored App Component
 * Clean architecture main application entry point
 */

import { useState, useCallback, useMemo } from 'react';
import { Screen } from './src/types';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ChatScreenRefactored } from './components/ChatScreenRefactored';

/**
 * Main Application Component
 * Manages top-level navigation between screens
 */
export default function AppRefactored() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');

  // Memoized navigation handlers to prevent unnecessary re-renders
  const handleStartChat = useCallback(() => {
    setCurrentScreen('chat');
  }, []);

  const handleBackToWelcome = useCallback(() => {
    setCurrentScreen('welcome');
  }, []);

  // Memoized screen components for performance optimization
  const welcomeScreen = useMemo(() => (
    <WelcomeScreen onStartChat={handleStartChat} />
  ), [handleStartChat]);

  const chatScreen = useMemo(() => (
    <ChatScreenRefactored onBackToWelcome={handleBackToWelcome} />
  ), [handleBackToWelcome]);

  // Conditional rendering with memoized components
  return currentScreen === 'welcome' ? welcomeScreen : chatScreen;
}