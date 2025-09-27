import { describe, it, expect } from 'vitest'
import { FAQService } from '../../../components/FAQSystem'

describe('FAQService', () => {
  describe('interpretQuestion', () => {
    it('deve interpretar perguntas sobre CPF corretamente', () => {
      const result = FAQService.interpretQuestion('quero tirar meu cpf')
      
      expect(result.interpretedQuery).toContain('cpf')
      expect(result.confidence).toBeGreaterThan(0.5)
      expect(result.suggestions).toContain('Como emitir CPF online?')
    })

    it('deve interpretar perguntas sobre INSS corretamente', () => {
      const result = FAQService.interpretQuestion('preciso consultar meu inss')
      
      expect(result.interpretedQuery).toContain('inss')
      expect(result.confidence).toBeGreaterThan(0.5)
      expect(result.suggestions).toContain('Como acessar o Meu INSS?')
    })

    it('deve detectar intenções de fazer/obter documentos', () => {
      const result = FAQService.interpretQuestion('como fazer meu documento')
      
      expect(result.confidence).toBeGreaterThan(0.7)
      expect(result.interpretedQuery).toContain('como fazer')
    })
  })

  describe('searchFAQ', () => {
    it('deve encontrar FAQ sobre CPF', () => {
      const result = FAQService.searchFAQ('como fazer cpf online')
      
      expect(result).toBeTruthy()
      expect(result?.id).toBe('cpf-emitir')
      expect(result?.question).toContain('CPF')
    })

    it('deve encontrar FAQ sobre INSS', () => {
      const result = FAQService.searchFAQ('como acessar meu inss')
      
      expect(result).toBeTruthy()
      expect(result?.id).toBe('inss-consultar')
      expect(result?.question).toContain('INSS')
    })

    it('deve retornar null para perguntas não relacionadas', () => {
      const result = FAQService.searchFAQ('qual é a capital da França?')
      
      expect(result).toBeNull()
    })
  })

  describe('generateAIResponse', () => {
    it('deve gerar resposta formatada para perguntas não encontradas', () => {
      const response = FAQService.generateAIResponse('pergunta aleatória')
      
      expect(response).toContain('Não encontrei essa informação específica no FAQ')
      expect(response).toContain('gov.br')
      expect(response).toContain('Continue perguntando!')
    })
  })
})