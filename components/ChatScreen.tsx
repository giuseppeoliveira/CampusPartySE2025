import { useState } from 'react';
import { Send, Trash2, Download, Share, ArrowLeft, ExternalLink, CheckCircle, Book } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { FAQService, FAQItem } from './FAQSystem';
import { FAQCategories } from './FAQCategories';
import { VoiceControls } from '../src/components/voice/VoiceControls';
import { ModernLogo } from './ui/ModernLogo';
import { ToastManager } from './ui/Toast';

interface Message {
  id: number;
  text: string;
  type: 'user' | 'assistant';
  timestamp: Date;
  audioUrl?: string;
  hasAudio?: boolean;
  faqItem?: FAQItem;
  isFromFAQ?: boolean;
  aiSuggestions?: string[];
  interpretedQuery?: string;
}

interface ChatScreenProps {
  onBackToWelcome: () => void;
}

export function ChatScreen({ onBackToWelcome }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Olá! Sou seu Companheiro Digital especializado em sites governamentais brasileiros. Posso ajudá-lo com dúvidas sobre gov.br, INSS, Receita Federal, SUS e muito mais. Como posso auxiliá-lo hoje?",
      type: "assistant",
      timestamp: new Date(),
      hasAudio: true
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [showFAQCategories, setShowFAQCategories] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [toasts, setToasts] = useState<Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
  }>>([]);

  const handleSendMessage = async () => {
    if (inputText.trim() && !isProcessing) {
      setIsProcessing(true);
      
      const newUserMessage: Message = {
        id: Date.now(),
        text: inputText,
        type: 'user',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newUserMessage]);
      setInputText('');
      
      // Simular processamento para melhor UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Primeiro interpreta a pergunta com IA
      const interpretation = FAQService.interpretQuestion(newUserMessage.text);
      
      // Tenta encontrar no FAQ usando a interpretação
      const faqResult = FAQService.searchFAQ(newUserMessage.text);
      
      let assistantResponse: Message;
      
      if (faqResult) {
        // Resposta do FAQ com passos detalhados
        assistantResponse = {
          id: Date.now() + 1,
          text: faqResult.answer,
          type: 'assistant',
          timestamp: new Date(),
          hasAudio: true,
          faqItem: faqResult,
          isFromFAQ: true,
          aiSuggestions: interpretation.suggestions,
          interpretedQuery: interpretation.confidence > 0.7 ? interpretation.interpretedQuery : undefined
        };
      } else {
        // Resposta gerada por IA
        assistantResponse = {
          id: Date.now() + 1,
          text: FAQService.generateAIResponse(newUserMessage.text),
          type: 'assistant',
          timestamp: new Date(),
          hasAudio: true,
          isFromFAQ: false,
          aiSuggestions: interpretation.suggestions,
          interpretedQuery: interpretation.confidence > 0.7 ? interpretation.interpretedQuery : undefined
        };
      }

      setMessages(prev => [...prev, assistantResponse]);
      setIsProcessing(false);
    }
  };

  // Função para renderizar texto com links clicáveis
  const renderTextWithClickableLinks = (text: string) => {
    // Regex melhorada para detectar URLs incluindo gov.br, sites sem www, etc.
    const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|(?:[a-zA-Z0-9-]+\.)+(?:gov\.br|com|br|org|net|edu|mil)(?:\/[^\s]*)?)/gi;
    const parts = text.split(urlRegex);
    
    return (
      <>
        {parts.map((part, index) => {
          if (part.match(urlRegex)) {
            let url = part;
            // Adiciona https:// se necessário
            if (!url.startsWith('http')) {
              url = `https://${url}`;
            }
            return (
              <a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline font-medium transition-colors cursor-pointer inline-flex items-center"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(url, '_blank', 'noopener,noreferrer');
                }}
                title={`Abrir ${url} em nova aba`}
              >
                {part}
                <ExternalLink className="h-3 w-3 ml-1 inline" />
              </a>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </>
    );
  };

  // Função para renderizar texto formatado (markdown-like)
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    
    return (
      <div className="space-y-2">
        {lines.map((line, index) => {
          // Linha vazia
          if (!line.trim()) {
            return <div key={index} className="h-1" />;
          }
          
          // Títulos com **texto**
          if (line.includes('**') && line.includes(':**')) {
            const boldMatch = line.match(/\*\*(.*?)\*\*/);
            if (boldMatch) {
              const beforeBold = line.substring(0, line.indexOf('**'));
              const boldText = boldMatch[1];
              const afterBold = line.substring(line.indexOf('**') + boldMatch[0].length);
              
              return (
                <div key={index} className="font-semibold text-gray-800 mt-3 mb-2">
                  {beforeBold && renderTextWithClickableLinks(beforeBold)}
                  <span className="font-bold">{boldText}</span>
                  {afterBold && renderTextWithClickableLinks(afterBold)}
                </div>
              );
            }
          }
          
          // Listas com • ou números
          if (line.trim().startsWith('•') || line.trim().startsWith('1️⃣') || line.trim().startsWith('2️⃣') || line.trim().startsWith('3️⃣') || line.trim().startsWith('4️⃣')) {
            return (
              <div key={index} className="flex items-start space-x-2 ml-2">
                <span className="text-blue-600 font-medium flex-shrink-0">
                  {line.trim().substring(0, line.trim().indexOf(' '))}
                </span>
                <span className="flex-1">
                  {renderTextWithClickableLinks(line.trim().substring(line.trim().indexOf(' ') + 1))}
                </span>
              </div>
            );
          }
          
          // Sub-itens com espaçamento (começam com espaços)
          if (line.startsWith('   •') || line.startsWith('  •')) {
            return (
              <div key={index} className="flex items-start space-x-2 ml-6">
                <span className="text-gray-600">•</span>
                <span>{renderTextWithClickableLinks(line.trim().substring(1).trim())}</span>
              </div>
            );
          }
          
          // Texto normal
          return (
            <div key={index} className="leading-relaxed">
              {renderTextWithClickableLinks(line)}
            </div>
          );
        })}
      </div>
    );
  };

  const renderFAQResponse = (faqItem: FAQItem) => {
    return (
      <div className="space-y-3">
        <div className="break-words">{renderTextWithClickableLinks(faqItem.answer)}</div>
        
        {faqItem.steps && faqItem.steps.length > 0 && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2 flex items-center">
              <CheckCircle className="h-4 w-4 mr-1" />
              Passo a passo:
            </h4>
            <ol className="text-sm space-y-1">
              {faqItem.steps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="font-medium text-blue-700 mr-2 min-w-[20px]">
                    {index + 1}.
                  </span>
                  <div className="text-blue-800">{renderTextWithClickableLinks(step)}</div>
                </li>
              ))}
            </ol>
          </div>
        )}
        
        {faqItem.relatedLinks && faqItem.relatedLinks.length > 0 && (
          <div className="border-t pt-2">
            <p className="text-sm font-medium text-gray-700 mb-1">🔗 Links úteis:</p>
            <div className="space-y-2">
              {faqItem.relatedLinks.map((link, index) => (
                <div key={index} className="p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                  <a
                    href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors cursor-pointer group"
                    onClick={(e) => {
                      e.preventDefault();
                      const url = link.url.startsWith('http') ? link.url : `https://${link.url}`;
                      window.open(url, '_blank', 'noopener,noreferrer');
                    }}
                    title={`Abrir ${link.text} em nova aba`}
                  >
                    <ExternalLink className="h-4 w-4 mr-2 text-blue-600 group-hover:text-blue-800" />
                    <div className="flex-1">
                      <div className="font-medium">{link.text}</div>
                      <div className="text-xs text-gray-500">{link.url}</div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isProcessing) {
      handleSendMessage();
    }
  };

  const handleClearConversation = () => {
    setMessages([{
      id: 1,
      text: "Olá! Sou seu Companheiro Digital especializado em sites governamentais brasileiros. Posso ajudá-lo com dúvidas sobre gov.br, INSS, Receita Federal, SUS e muito mais. Como posso auxiliá-lo hoje?",
      type: "assistant",
      timestamp: new Date(),
      hasAudio: true
    }]);
  };

  const handleVoiceTranscript = (transcript: string) => {
    if (transcript.trim()) {
      const cleanedTranscript = transcript.trim();
      
      // Comandos de voz para limpar
      if (cleanedTranscript.toLowerCase().includes('apagar') || 
          cleanedTranscript.toLowerCase().includes('limpar') || 
          cleanedTranscript.toLowerCase().includes('deletar') ||
          cleanedTranscript.toLowerCase() === 'clear') {
        setInputText('');
        showToast('Texto limpo!', 'success');
        return;
      }
      
      // Atualizar o input com o transcript apenas se estiver vazio ou diferente
      if (!inputText || inputText !== cleanedTranscript) {
        setInputText(cleanedTranscript);
      }
    }
  };

  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    const newToast = {
      id: Date.now().toString(),
      message,
      type,
      duration: type === 'error' ? 6000 : 4000
    };
    setToasts(prev => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const handleVoiceError = (error: string) => {
    // Criar mensagem mais amigável para os erros comuns
    let friendlyMessage = error;
    
    if (error.includes('Permissão negada') || error.includes('not-allowed')) {
      friendlyMessage = '🎤 Permita o acesso ao microfone nas configurações do navegador';
    } else if (error.includes('not-supported')) {
      friendlyMessage = '🎤 Seu navegador não suporta reconhecimento de voz';
    } else if (error.includes('network')) {
      friendlyMessage = '🌐 Verifique sua conexão com a internet';
    } else if (error.includes('no-speech')) {
      friendlyMessage = '🔇 Nenhuma fala detectada. Tente falar mais próximo do microfone';
    }
    
    showToast(friendlyMessage, 'error');
  };

  const handleDownloadAudio = (messageId: number) => {
    // Simular download de áudio
    console.log(`Baixando áudio da mensagem ${messageId}`);
    alert('Funcionalidade de download de áudio será implementada em breve!');
  };

  const handleShareWhatsApp = (message: Message) => {
    let shareText = `🇧🇷 Companheiro Digital Gov.br\n\n`;
    
    if (message.faqItem) {
      shareText += `❓ ${message.faqItem.question}\n\n`;
      shareText += `💡 ${message.faqItem.answer}\n\n`;
      
      if (message.faqItem.steps && message.faqItem.steps.length > 0) {
        shareText += `📋 Passo a passo:\n`;
        message.faqItem.steps.forEach((step, index) => {
          shareText += `${index + 1}. ${step}\n`;
        });
        shareText += `\n`;
      }
      
      if (message.faqItem.relatedLinks && message.faqItem.relatedLinks.length > 0) {
        shareText += `🔗 Links úteis:\n`;
        message.faqItem.relatedLinks.forEach(link => {
          shareText += `• ${link.text}: ${link.url}\n`;
        });
      }
    } else {
      shareText += message.text;
    }
    
    const encodedText = encodeURIComponent(shareText);
    const whatsappUrl = `https://wa.me/?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion);
  };

  const handleFAQQuestionSelect = async (question: string) => {
    if (!isProcessing) {
      setIsProcessing(true);
      setShowFAQCategories(false);
      
      // Criar mensagem do usuário com a pergunta
      const newUserMessage: Message = {
        id: Date.now(),
        text: question,
        type: 'user',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newUserMessage]);
      
      // Simular processamento
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Buscar resposta do FAQ
      const faqResult = FAQService.searchFAQ(question);
      const interpretation = FAQService.interpretQuestion(question);
      
      if (faqResult) {
        const assistantResponse: Message = {
          id: Date.now() + 1,
          text: faqResult.answer,
          type: 'assistant',
          timestamp: new Date(),
          hasAudio: true,
          faqItem: faqResult,
          isFromFAQ: true,
          aiSuggestions: interpretation.suggestions,
          interpretedQuery: interpretation.confidence > 0.7 ? interpretation.interpretedQuery : undefined
        };
        
        setMessages(prev => [...prev, assistantResponse]);
      }
      
      setIsProcessing(false);
    }
  };

  return (
    <div className="h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBackToWelcome}
            className="text-white hover:bg-white/20 p-1"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <ModernLogo size={32} className="shrink-0" />
          <div>
            <h1 className="font-medium">Companheiro Digital</h1>
            <p className="text-xs opacity-90">Especialista em gov.br</p>
          </div>
        </div>
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFAQCategories(!showFAQCategories)}
            className="text-white hover:bg-white/20"
          >
            <Book className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearConversation}
            className="text-white hover:bg-white/20"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* FAQ Categorias (tela cheia) ou Chat Area */}
      {showFAQCategories ? (
        <div className="flex-1 overflow-hidden">
          <FAQCategories 
            onQuestionSelect={handleFAQQuestionSelect}
            onBack={() => setShowFAQCategories(false)}
          />
        </div>
      ) : (
        <>
          {/* Botão FAQ quando primeira mensagem */}
          {/* Barra de Perguntas Frequentes - Sempre visível */}
          <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 sticky top-0 z-10">
            <Button
              onClick={() => setShowFAQCategories(true)}
              className="w-full bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 shadow-sm transition-all duration-200 hover:shadow-md"
              variant="outline"
            >
              <Book className="h-4 w-4 mr-2" />
              FAQ
            </Button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <Card className={`max-w-[85%] p-3 ${
              message.type === 'user' 
                ? 'bg-blue-600 text-white' 
                : message.isFromFAQ
                  ? 'bg-green-50 border-green-300'
                  : 'bg-white border-gray-200'
            }`}>
              {message.type === 'assistant' && message.isFromFAQ && (
                <div className="flex items-center mb-2 text-green-700">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  <span className="text-xs font-medium">Resposta oficial do FAQ</span>
                </div>
              )}
              
              {/* Mostrar interpretação da IA se disponível */}
              {message.type === 'assistant' && message.interpretedQuery && (
                <div className="mb-3 p-2 bg-blue-50 rounded-md border-l-4 border-blue-400">
                  <p className="text-xs text-blue-700">
                    💡 <strong>Entendi que você quer saber:</strong> "{message.interpretedQuery}"
                  </p>
                </div>
              )}
              
              {message.type === 'assistant' && message.faqItem ? 
                renderFAQResponse(message.faqItem) : 
                <div className="break-words">{renderFormattedText(message.text)}</div>
              }
              
              {/* Sugestões de IA */}
              {message.type === 'assistant' && message.aiSuggestions && message.aiSuggestions.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-600 mb-2">🤖 Perguntas relacionadas:</p>
                  <div className="space-y-1">
                    {message.aiSuggestions.map((suggestion, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer hover:bg-blue-50 text-xs mr-1 mb-1"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString('pt-BR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
                
                <div className="flex items-center space-x-2">
                  {/* Voice Controls para mensagens da IA */}
                  {message.type === 'assistant' && (
                    <VoiceControls 
                      text={message.text}
                      onError={handleVoiceError}
                      showTTSControls={true}
                      showSTTControls={false}
                      className="opacity-70 hover:opacity-100 transition-opacity"
                    />
                  )}
                  
                  {message.type === 'assistant' && message.hasAudio && (
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDownloadAudio(message.id)}
                        className="h-6 w-6 p-0 hover:bg-green-100"
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleShareWhatsApp(message)}
                        className="h-6 w-6 p-0 hover:bg-green-100"
                      >
                        <Share className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        ))}
        
        {/* Indicador de processamento */}
        {isProcessing && (
          <div className="flex justify-start">
            <Card className="max-w-[85%] p-3 bg-gray-50 border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm text-gray-600">Companheiro Digital está pensando...</span>
              </div>
            </Card>
          </div>
        )}
          </div>
        </>
      )}

      {/* Input Area - só mostrar quando não está em FAQ */}
      {!showFAQCategories && (
        <div className="p-4 border-t bg-card">
          <div className="flex gap-2 items-center">
            <div className="flex-1 relative">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder=""
              className="pr-12"
              disabled={isProcessing}
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isProcessing}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Voice Controls com STT */}
          <VoiceControls 
            onTranscriptChange={handleVoiceTranscript}
            onError={handleVoiceError}
            showTTSControls={false}
            showSTTControls={true}
            className="shrink-0"
          />
        </div>
      </div>
      )}
      
      {/* Toast Manager */}
      <ToastManager toasts={toasts} onRemoveToast={removeToast} />
    </div>
  );
}