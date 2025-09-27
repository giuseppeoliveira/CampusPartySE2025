/**
 * Application constants following clean code principles
 * Centralized configuration for maintainable code
 */

// Government service suggestions
export const GOV_SUGGESTIONS = [
  "Como acessar o Meu INSS?",
  "Como fazer o CPF online?",
  "Como consultar benefícios sociais?",
  "Como fazer o Cartão Nacional de Saúde SUS?",
  "Como tirar certidão de nascimento online?"
] as const;

// Phone numbers for government services
export const GOVERNMENT_PHONE_NUMBERS = {
  GOV_BR: '111',
  RECEITA_FEDERAL: '146',
  INSS: '135',
  SUS: '136'
} as const;

// External links and domains
export const EXTERNAL_LINKS = {
  GOV_BR: 'gov.br',
  RECEITA_FEDERAL: 'gov.br/receitafederal',
  ACESSO_GOV_BR: 'acesso.gov.br',
  CONECTE_SUS: 'conectesus.saude.gov.br',
  PORTAL_CARTORIO: 'gov.br/cartorio'
} as const;

// URL validation patterns
export const URL_PATTERNS = {
  URL_REGEX: /(https?:\/\/[^\s]+|www\.[^\s]+|(?:[a-zA-Z0-9-]+\.)+(?:gov\.br|com|br|org|net|edu|mil)(?:\/[^\s]*)?)/gi,
  GOV_DOMAINS: ['gov.br', 'com.br', 'org.br', 'edu.br', 'mil.br'] as const
} as const;

// AI interpretation constants
export const AI_INTERPRETATION = {
  MIN_WORD_LENGTH: 2,
  HIGH_CONFIDENCE_THRESHOLD: 0.7,
  MAX_SUGGESTIONS: 3,
  MIN_KEYWORD_LENGTH: 3
} as const;

// Animation and timing constants
export const ANIMATION_DELAYS = {
  PROCESSING_DELAY: 800,
  AUTO_SEND_DELAY: 50,
  SEND_MESSAGE_DELAY: 100
} as const;

// FAQ search scoring
export const FAQ_SCORING = {
  EXACT_MATCH_BONUS: 100,
  KEYWORD_WEIGHT_MULTIPLIER: 1,
  MIN_SCORE_THRESHOLD: 0
} as const;

// Component sizing constants
export const UI_CONSTANTS = {
  CHAT_MAX_WIDTH: '85%',
  AVATAR_SIZE: {
    SMALL: 'h-3 w-3',
    MEDIUM: 'h-4 w-4',
    LARGE: 'h-5 w-5'
  },
  ANIMATION_BOUNCE_DELAYS: ['0.1s', '0.2s']
} as const;

// Message types and categories
export const MESSAGE_CATEGORIES = {
  OFFICIAL_FAQ: 'Resposta oficial do FAQ',
  AI_GENERATED: 'Resposta gerada por IA',
  USER_INPUT: 'Mensagem do usuário'
} as const;

// App metadata
export const APP_METADATA = {
  NAME: 'Companheiro Digital',
  DESCRIPTION: 'Especialista em gov.br',
  VERSION: '1.0.0',
  INITIAL_MESSAGE: "Olá! Sou seu Companheiro Digital especializado em sites governamentais brasileiros. Posso ajudá-lo com dúvidas sobre gov.br, INSS, Receita Federal, SUS, e muito mais. Como posso auxiliá-lo hoje?"
} as const;