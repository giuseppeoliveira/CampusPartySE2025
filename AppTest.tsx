/**
 * App Test - Testing Clean Architecture
 * Simple version to test improvements
 */

import { useState, useCallback, useMemo } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ChatScreen } from './components/ChatScreen';

export default function AppTest() {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'chat'>('welcome');

  // Clean Code: Memoized handlers to prevent unnecessary re-renders
  const handleStartChat = useCallback(() => {
    setCurrentScreen('chat');
  }, []);

  const handleBackToWelcome = useCallback(() => {
    setCurrentScreen('welcome');
  }, []);

  // Clean Code: Conditional rendering optimized
  const currentComponent = useMemo(() => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onStartChat={handleStartChat} />;
      case 'chat':
        return <ChatScreen onBackToWelcome={handleBackToWelcome} />;
      default:
        return <WelcomeScreen onStartChat={handleStartChat} />;
    }
  }, [currentScreen, handleStartChat, handleBackToWelcome]);

  return currentComponent;
}