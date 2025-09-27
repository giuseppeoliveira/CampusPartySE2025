/**
 * Application configuration
 * Centralized configuration following clean code principles
 */

export const APP_CONFIG = {
  // Application metadata
  app: {
    name: 'Companheiro Digital',
    version: '1.0.0',
    description: 'Especialista em gov.br',
    author: 'Campus PArt Team'
  },

  // API and external services
  services: {
    whatsapp: {
      baseUrl: 'https://wa.me/',
      messagePrefix: '🇧🇷 Companheiro Digital Gov.br\n\n'
    },
    government: {
      baseUrl: 'https://gov.br',
      receita: 'https://gov.br/receitafederal',
      inss: 'https://gov.br/inss',
      sus: 'https://conectesus.saude.gov.br'
    }
  },

  // UI configuration
  ui: {
    theme: {
      primary: 'blue',
      secondary: 'green',
      maxChatWidth: '85%'
    },
    animations: {
      processingDelay: 800,
      bounceDelays: ['0.1s', '0.2s']
    },
    limits: {
      maxSuggestions: 3,
      truncateLength: 200
    }
  },

  // Storage configuration
  storage: {
    keys: {
      messages: 'chat_messages',
      preferences: 'user_preferences',
      faqCache: 'faq_cache'
    }
  },

  // Development flags
  dev: {
    enableDebugLogs: process.env.NODE_ENV === 'development',
    enableMockServices: process.env.NODE_ENV === 'development',
    showPerformanceMetrics: process.env.NODE_ENV === 'development'
  }
} as const;