/**
 * FAQ Service - Clean architecture implementation
 * Following SOLID principles and clean code practices
 */

import { FAQItem, AIInterpretation, IntentType } from '../types';
import { FAQ_DATA } from '../constants/faq-data';
import { AI_SYNONYMS, AI_INTENT_PATTERNS } from '../constants/ai-patterns';
import { AI_INTERPRETATION, GOVERNMENT_PHONE_NUMBERS } from '../constants';

/**
 * AI Interpretation Service
 * Handles natural language processing for user queries
 */
class AIInterpreterService {
  /**
   * Interprets user question using AI patterns and synonyms
   */
  public interpretQuestion(query: string): AIInterpretation {
    const normalizedQuery = this.normalizeQuery(query);
    const expandedQuery = this.expandQueryWithSynonyms(normalizedQuery);
    
    const { intent, confidence, extractedTerms } = this.detectIntent(normalizedQuery);
    const interpretedQuery = this.generateInterpretedQuery(intent, extractedTerms, expandedQuery);
    const suggestions = this.generateSuggestions(interpretedQuery);
    
    return {
      interpretedQuery,
      suggestions,
      confidence
    };
  }

  /**
   * Normalizes query by converting to lowercase and trimming
   */
  private normalizeQuery(query: string): string {
    return query.toLowerCase().trim();
  }

  /**
   * Expands query with synonyms for better matching
   */
  private expandQueryWithSynonyms(query: string): string {
    let expandedQuery = query;
    
    for (const [key, synonyms] of Object.entries(AI_SYNONYMS)) {
      const hasMatch = synonyms.some(synonym => query.includes(synonym));
      if (hasMatch) {
        expandedQuery += ` ${key}`;
      }
    }
    
    return expandedQuery;
  }

  /**
   * Detects user intent from query patterns
   */
  private detectIntent(query: string): { intent: IntentType; confidence: number; extractedTerms: string[] } {
    for (const pattern of AI_INTENT_PATTERNS) {
      const match = query.match(pattern.pattern);
      if (match) {
        const extractedTerms = match.slice(2).filter(Boolean);
        return {
          intent: pattern.intent,
          confidence: pattern.confidence,
          extractedTerms
        };
      }
    }
    
    return { intent: 'general', confidence: 0.5, extractedTerms: [] };
  }

  /**
   * Generates interpreted query based on detected intent
   */
  private generateInterpretedQuery(
    intent: IntentType, 
    extractedTerms: string[], 
    expandedQuery: string
  ): string {
    const joinedTerms = extractedTerms.join(' ');
    
    switch (intent) {
      case 'how_to_obtain':
        return `como fazer ${joinedTerms} online`;
      case 'how_to_check':
        return `como consultar ${joinedTerms} online`;
      case 'want_to_obtain':
        return `como fazer ${joinedTerms}`;
      case 'where_to_do':
        return `onde fazer ${joinedTerms} online`;
      default:
        return expandedQuery;
    }
  }

  /**
   * Generates contextual suggestions based on query terms
   */
  private generateSuggestions(query: string): string[] {
    const suggestions: string[] = [];
    const lowerQuery = query.toLowerCase();
    
    const suggestionMap: Record<string, string[]> = {
      'cpf': ['Como emitir CPF online?', 'Como consultar situação do CPF?'],
      'inss': ['Como acessar o Meu INSS?', 'Como consultar benefícios do INSS?'],
      'sus': ['Como fazer Cartão Nacional de Saúde SUS?', 'Como marcar consulta pelo SUS?'],
      'certidao': ['Como tirar certidão de nascimento online?', 'Como obter certidão de casamento?'],
      'auxilio': ['Como consultar benefícios sociais?', 'Como solicitar Auxílio Brasil?']
    };

    for (const [key, values] of Object.entries(suggestionMap)) {
      if (lowerQuery.includes(key)) {
        suggestions.push(...values);
      }
    }
    
    return suggestions.slice(0, AI_INTERPRETATION.MAX_SUGGESTIONS);
  }
}

/**
 * FAQ Search Service
 * Handles searching and scoring of FAQ items
 */
class FAQSearchService {
  /**
   * Searches FAQ items using multiple strategies
   */
  public searchFAQ(query: string): FAQItem | null {
    const interpreter = new AIInterpreterService();
    const interpretation = interpreter.interpretQuestion(query);
    
    const searchQueries = [query, interpretation.interpretedQuery];
    
    for (const searchQuery of searchQueries) {
      const result = this.findBestMatch(searchQuery);
      if (result) return result;
    }
    
    return null;
  }

  /**
   * Finds the best matching FAQ item using various strategies
   */
  private findBestMatch(query: string): FAQItem | null {
    const normalizedQuery = query.toLowerCase().trim();
    
    // Strategy 1: Exact question match
    const exactMatch = this.findExactMatch(normalizedQuery);
    if (exactMatch) return exactMatch;
    
    // Strategy 2: Keyword scoring
    const keywordMatch = this.findKeywordMatch(normalizedQuery);
    if (keywordMatch) return keywordMatch;
    
    // Strategy 3: Partial word match
    const partialMatch = this.findPartialMatch(normalizedQuery);
    return partialMatch;
  }

  /**
   * Finds exact match in questions
   */
  private findExactMatch(query: string): FAQItem | null {
    return FAQ_DATA.find(item => 
      item.question.toLowerCase().includes(query) ||
      query.includes(item.question.toLowerCase().slice(0, 10))
    ) || null;
  }

  /**
   * Finds match using keyword scoring
   */
  private findKeywordMatch(query: string): FAQItem | null {
    const scoredMatches = FAQ_DATA
      .map(item => ({
        item,
        score: this.calculateKeywordScore(item, query)
      }))
      .filter(match => match.score > 0)
      .sort((a, b) => b.score - a.score);
    
    return scoredMatches.length > 0 ? scoredMatches[0].item : null;
  }

  /**
   * Calculates keyword matching score
   */
  private calculateKeywordScore(item: FAQItem, query: string): number {
    return item.keywords.reduce((score, keyword) => {
      if (query.includes(keyword.toLowerCase())) {
        return score + keyword.length; // Longer keywords get higher weight
      }
      return score;
    }, 0);
  }

  /**
   * Finds partial word matches
   */
  private findPartialMatch(query: string): FAQItem | null {
    const queryWords = query.split(' ').filter(word => word.length > AI_INTERPRETATION.MIN_KEYWORD_LENGTH);
    
    return FAQ_DATA.find(item => 
      queryWords.some(word => 
        item.keywords.some(keyword => 
          keyword.toLowerCase().includes(word) || 
          word.includes(keyword.toLowerCase())
        )
      )
    ) || null;
  }
}

/**
 * AI Response Generator Service
 * Generates contextual responses when FAQ doesn't have answers
 */
class AIResponseGeneratorService {
  /**
   * Generates AI response for queries not found in FAQ
   */
  public generateAIResponse(query: string): string {
    const interpreter = new AIInterpreterService();
    const interpretation = interpreter.interpretQuestion(query);
    
    let response = this.buildInterpretationHeader(interpretation, query);
    response += this.buildSuggestionsSection(interpretation);
    response += this.buildContextualResponse(query, interpretation.interpretedQuery);
    
    return response;
  }

  /**
   * Builds interpretation header if confidence is high
   */
  private buildInterpretationHeader(interpretation: AIInterpretation, originalQuery: string): string {
    if (interpretation.confidence > AI_INTERPRETATION.HIGH_CONFIDENCE_THRESHOLD && 
        interpretation.interpretedQuery !== originalQuery) {
      return `💡 *Entendi que você quer saber: "${interpretation.interpretedQuery}"*\n\n`;
    }
    return '';
  }

  /**
   * Builds suggestions section
   */
  private buildSuggestionsSection(interpretation: AIInterpretation): string {
    if (interpretation.suggestions.length === 0) return '';
    
    let section = `**Perguntas relacionadas que posso responder:**\n`;
    interpretation.suggestions.forEach((suggestion, index) => {
      section += `${index + 1}. ${suggestion}\n`;
    });
    return section + '\n';
  }

  /**
   * Builds contextual response based on query topics
   */
  private buildContextualResponse(originalQuery: string, interpretedQuery: string): string {
    const searchText = `${originalQuery.toLowerCase()} ${interpretedQuery.toLowerCase()}`;
    
    // Topic-specific responses
    const topicResponses: Record<string, () => string> = {
      multa: () => this.generateTrafficResponse(),
      comprovante_renda: () => this.generateIncomeProofResponse(),
      emprego: () => this.generateJobResponse(),
      imposto: () => this.generateTaxResponse(),
      carteira_trabalho: () => this.generateWorkCardResponse()
    };

    for (const [topic, responseGenerator] of Object.entries(topicResponses)) {
      if (this.matchesTopic(searchText, topic)) {
        return responseGenerator();
      }
    }

    return this.generateDefaultResponse(originalQuery);
  }

  /**
   * Checks if query matches a specific topic
   */
  private matchesTopic(searchText: string, topic: string): boolean {
    const topicPatterns: Record<string, string[]> = {
      multa: ['multa', 'infração', 'pontos carteira'],
      comprovante_renda: ['comprovante', 'renda', 'salario'],
      emprego: ['emprego', 'trabalho', 'vagas'],
      imposto: ['imposto', 'declaração', 'receita'],
      carteira_trabalho: ['carteira', 'trabalho']
    };

    const patterns = topicPatterns[topic] || [];
    return patterns.some(pattern => searchText.includes(pattern));
  }

  private generateTrafficResponse(): string {
    return `Para consultar multas e pontos na carteira:

1. Acesse o portal do DETRAN do seu estado
2. Entre na seção "Consulta de Multas" ou "CNH"
3. Informe CPF/CNH e dados solicitados
4. Veja multas pendentes e pontos na carteira
5. Para recorrer: siga as instruções no próprio portal

📱 Dica: Use também o app "CDT" (Carteira Digital de Trânsito) para consultas rápidas.`;
  }

  private generateIncomeProofResponse(): string {
    return `Para obter comprovante de renda:

1. **Trabalhador CLT**: Solicite ao RH da empresa
2. **Autônomo**: Acesse gov.br/receitafederal > Declaração de Imposto de Renda
3. **Aposentado/Pensionista**: Use o app "Meu INSS" > Extrato de Pagamento
4. **Servidor Público**: Portal do órgão empregador
5. **MEI**: Portal do Empreendedor > Relatórios

🔗 Links: gov.br/receitafederal | gov.br/inss`;
  }

  private generateJobResponse(): string {
    return `Para buscar emprego através de canais oficiais:

1. Acesse sine.rs.gov.br ou o portal do SINE do seu estado
2. Cadastre-se com seus dados e currículo
3. Busque vagas por área/região
4. Para o auxílio desemprego: use o app "Carteira de Trabalho Digital"
5. Para capacitação: veja cursos gratuitos no SENAI/SENAC

📞 Atendimento: Procure uma agência do trabalhador ou SINE da sua cidade.`;
  }

  private generateTaxResponse(): string {
    return `Para questões relacionadas a impostos:

1. Acesse gov.br/receitafederal
2. **Declaração IR**: Use o programa IRPF ou app "Meu Imposto de Renda"
3. **CPF**: Seção "Cadastros" > "CPF"
4. **Restituição**: Consulte pelo CPF na seção específica
5. **Dúvidas**: Use o chat virtual ou ligue ${GOVERNMENT_PHONE_NUMBERS.RECEITA_FEDERAL}

💡 Prazo da declaração: Geralmente de março a maio de cada ano.`;
  }

  private generateWorkCardResponse(): string {
    return `Para a Carteira de Trabalho Digital:

1. Baixe o app "Carteira de Trabalho Digital"
2. Faça login com conta gov.br (nível prata ou ouro)
3. Consulte contratos, seguro-desemprego e abono salarial
4. Para solicitar seguro-desemprego: use o próprio app
5. Para baixar PDF: vá em "Contratos" > "Gerar PDF"

🆔 Importante: Precisa ter conta gov.br com nível de confiabilidade adequado.`;
  }

  private generateDefaultResponse(query: string): string {
    return `Não encontrei essa informação específica no FAQ, mas posso ajudar:

**Para "${query}":**

1️⃣ Acesse gov.br e use a busca avançada

2️⃣ Procure na seção do órgão responsável:
   • Documentos → Receita Federal, Cartórios
   • Saúde → Ministério da Saúde, SUS  
   • Trabalho → Ministério do Trabalho
   • Educação → MEC, INEP

3️⃣ **Atendimento especializado:**
   • Central gov.br: ${GOVERNMENT_PHONE_NUMBERS.GOV_BR}
   • Receita Federal: ${GOVERNMENT_PHONE_NUMBERS.RECEITA_FEDERAL}
   • INSS: ${GOVERNMENT_PHONE_NUMBERS.INSS}
   • SUS: ${GOVERNMENT_PHONE_NUMBERS.SUS}

4️⃣ Se for serviço estadual/municipal, acesse o portal do seu estado/cidade.

💬 Continue perguntando! Posso ajudar com mais detalhes sobre qualquer serviço específico.`;
  }
}

/**
 * Main FAQ Service
 * Facade pattern to provide a clean interface
 */
export class FAQService {
  private static aiInterpreter = new AIInterpreterService();
  private static searchService = new FAQSearchService();
  private static responseGenerator = new AIResponseGeneratorService();

  /**
   * Interprets user question using AI
   */
  public static interpretQuestion(query: string): AIInterpretation {
    return this.aiInterpreter.interpretQuestion(query);
  }

  /**
   * Searches FAQ for matching items
   */
  public static searchFAQ(query: string): FAQItem | null {
    return this.searchService.searchFAQ(query);
  }

  /**
   * Generates AI response when FAQ doesn't have answer
   */
  public static generateAIResponse(query: string): string {
    return this.responseGenerator.generateAIResponse(query);
  }
}