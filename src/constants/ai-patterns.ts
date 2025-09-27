/**
 * AI interpretation patterns and synonyms
 * Clean separation of AI logic configuration
 */

import { SynonymMap, IntentPattern } from '../types';

export const AI_SYNONYMS: SynonymMap = {
  'cpf': ['cadastro pessoa fisica', 'documento', 'registro pessoa', 'pf'],
  'inss': ['previdencia', 'aposentadoria', 'beneficio inss', 'seguro social'],
  'sus': ['saude publica', 'sistema saude', 'cartao sus', 'sus cartao'],
  'certidao': ['documento civil', 'registro civil', '2 via', 'segunda via'],
  'auxilio': ['beneficio social', 'bolsa familia', 'auxilio brasil', 'ajuda governo'],
  'passaporte': ['documento viagem', 'viajar exterior', 'documento internacional'],
  'conta digital': ['banco digital', 'conta gov', 'conta governamental'],
  'fazer': ['emitir', 'tirar', 'solicitar', 'pedir', 'obter', 'conseguir'],
  'consultar': ['verificar', 'checar', 'ver', 'acompanhar', 'conferir'],
  'online': ['internet', 'digital', 'site', 'app', 'aplicativo']
} as const;

export const AI_INTENT_PATTERNS: readonly IntentPattern[] = [
  {
    pattern: /como\s+(fazer|tirar|emitir|solicitar|pedir)\s+(.+)/i,
    intent: 'how_to_obtain',
    confidence: 0.9
  },
  {
    pattern: /como\s+(consultar|verificar|ver|checar)\s+(.+)/i,
    intent: 'how_to_check',
    confidence: 0.9
  },
  {
    pattern: /(preciso|quero|gostaria)\s+(de\s+)?(fazer|tirar|emitir)\s+(.+)/i,
    intent: 'want_to_obtain',
    confidence: 0.8
  },
  {
    pattern: /(onde|qual\s+site|qual\s+portal)\s+.*(fazer|consultar|tirar)\s+(.+)/i,
    intent: 'where_to_do',
    confidence: 0.8
  },
  {
    pattern: /(.+)\s+(online|digital|internet|app|aplicativo)/i,
    intent: 'digital_service',
    confidence: 0.7
  }
] as const;