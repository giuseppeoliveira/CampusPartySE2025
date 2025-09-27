import { useState } from 'react';
import { Mic, Send, Trash2, Download, Share, ArrowLeft, ExternalLink, CheckCircle, Book } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { FAQService, FAQItem } from './FAQSystem';
import { FAQCategories } from './FAQCategories';

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
      text: "Olá! Sou seu Companheiro Digital especializado em sites governamentais brasileiros. Posso ajudá-lo com dúvidas sobre gov.br, INSS, Receita Federal, SUS, e muito mais. Como posso auxiliá-lo hoje?",
      type: "assistant",
      timestamp: new Date(),
      hasAudio: true
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showFAQCategories, setShowFAQCategories] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const govSuggestions = [
    "Como acessar o Meu INSS?",
    "Como fazer o CPF online?",
    "Como consultar benefícios sociais?",
    "Como fazer o Cartão Nacional de Saúde SUS?",
    "Como tirar certidão de nascimento online?"
  ];

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

  const renderFAQResponse = (faqItem: FAQItem) => {
    return (
      <div className="space-y-3">
        <p className="break-words">{faqItem.answer}</p>
        
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
                  <span className="text-blue-800">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
        
        {faqItem.relatedLinks && faqItem.relatedLinks.length > 0 && (
          <div className="border-t pt-2">
            <p className="text-sm font-medium text-gray-700 mb-1">Links úteis:</p>
            <div className="space-y-1">
              {faqItem.relatedLinks.map((link, index) => (
                <div key={index} className="flex items-center text-sm">
                  <ExternalLink className="h-3 w-3 mr-1 text-blue-600" />
                  <span className="text-blue-600">{link.text}</span>
                  <span className="text-gray-500 ml-1">({link.url})</span>
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
      text: "Olá! Sou seu Companheiro Digital especializado em sites governamentais brasileiros. Posso ajudá-lo com dúvidas sobre gov.br, INSS, Receita Federal, SUS, e muito mais. Como posso auxiliá-lo hoje?",
      type: "assistant",
      timestamp: new Date(),
      hasAudio: true
    }]);
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      console.log('Iniciando gravação...');
    } else {
      console.log('Finalizando gravação...');
    }
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

  const handleFAQQuestionSelect = (question: string) => {
    if (!isProcessing) {
      setInputText(question);
      setShowFAQCategories(false);
      // Auto-enviar a pergunta
      setTimeout(() => {
        setInputText(question);
        setTimeout(() => handleSendMessage(), 100);
      }, 50);
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

      {/* Sugestões rápidas ou FAQ Categorias */}
      {showFAQCategories ? (
        <FAQCategories onQuestionSelect={handleFAQQuestionSelect} />
      ) : messages.length === 1 ? (
        <div className="p-4 bg-blue-50">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-blue-800">Perguntas frequentes:</p>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowFAQCategories(true)}
              className="text-blue-700 hover:bg-blue-200 h-6 px-2"
            >
              <Book className="h-3 w-3 mr-1" />
              Ver todas
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {govSuggestions.map((suggestion, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="cursor-pointer hover:bg-blue-200 text-xs"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </Badge>
            ))}
          </div>
        </div>
      ) : null}

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
                <p className="break-words">{message.text}</p>
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

      {/* Input Area */}
      <div className="p-4 border-t bg-card">
        <div className="flex gap-2 items-center">
          <div className="flex-1 relative">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Pergunte sobre serviços públicos..."
              className="pr-12"
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
          
          <Button
            size="lg"
            variant={isRecording ? "destructive" : "secondary"}
            onClick={handleVoiceRecord}
            disabled={isProcessing}
            className="h-12 w-12 rounded-full p-0"
          >
            <Mic className={`h-5 w-5 ${isRecording ? 'animate-pulse' : ''}`} />
          </Button>
        </div>

        {isRecording && (
          <div className="mt-2 text-center">
            <span className="text-sm text-muted-foreground animate-pulse">
              🔴 Gravando... Toque novamente para parar
            </span>
          </div>
        )}
      </div>
    </div>
  );
}