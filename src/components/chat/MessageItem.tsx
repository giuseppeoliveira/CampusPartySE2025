/**
 * Message Item Component
 * Renders individual chat messages with proper formatting
 */

import { memo, useCallback } from 'react';
import { Download, Share, CheckCircle, ExternalLink } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Message, FAQItem } from '../../types';
import { WhatsAppUtils, DateUtils } from '../../utils';
import { TextRenderer, FormattedLine } from '../../utils/text-renderer';

interface MessageItemProps {
  readonly message: Message;
  readonly onSuggestionClick: (suggestion: string) => void;
  readonly onDownloadAudio: (messageId: number) => void;
}

export const MessageItem = memo<MessageItemProps>(({ 
  message, 
  onSuggestionClick, 
  onDownloadAudio 
}) => {
  const handleShareWhatsApp = useCallback(() => {
    WhatsAppUtils.shareMessage(message);
  }, [message]);

  const handleDownloadAudio = useCallback(() => {
    onDownloadAudio(message.id);
  }, [message.id, onDownloadAudio]);

  const isUser = message.type === 'user';
  const isFromFAQ = message.isFromFAQ;

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <Card className={`max-w-[85%] p-3 ${
        isUser 
          ? 'bg-blue-600 text-white' 
          : isFromFAQ
            ? 'bg-green-50 border-green-300'
            : 'bg-white border-gray-200'
      }`}>
        {/* FAQ Badge */}
        {!isUser && isFromFAQ && (
          <div className="flex items-center mb-2 text-green-700">
            <CheckCircle className="h-4 w-4 mr-1" />
            <span className="text-xs font-medium">Resposta oficial do FAQ</span>
          </div>
        )}
        
        {/* AI Interpretation */}
        {!isUser && message.interpretedQuery && (
          <div className="mb-3 p-2 bg-blue-50 rounded-md border-l-4 border-blue-400">
            <p className="text-xs text-blue-700">
              💡 <strong>Entendi que você quer saber:</strong> "{message.interpretedQuery}"
            </p>
          </div>
        )}
        
        {/* Message Content */}
        <div className="break-words">
          {message.faqItem ? (
            <FAQResponse faqItem={message.faqItem} />
          ) : (
            <FormattedTextContent text={message.text} />
          )}
        </div>
        
        {/* AI Suggestions */}
        {!isUser && message.aiSuggestions && message.aiSuggestions.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-600 mb-2">🤖 Perguntas relacionadas:</p>
            <div className="space-y-1">
              {message.aiSuggestions.map((suggestion, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-blue-50 text-xs mr-1 mb-1"
                  onClick={() => onSuggestionClick(suggestion)}
                >
                  {suggestion}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {/* Message Footer */}
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs opacity-70">
            {DateUtils.formatTime(message.timestamp)}
          </span>
          
          {!isUser && message.hasAudio && (
            <div className="flex space-x-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={handleDownloadAudio}
                className="h-6 w-6 p-0 hover:bg-green-100"
                aria-label="Baixar áudio"
              >
                <Download className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleShareWhatsApp}
                className="h-6 w-6 p-0 hover:bg-green-100"
                aria-label="Compartilhar no WhatsApp"
              >
                <Share className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
});

/**
 * FAQ Response Component
 */
const FAQResponse = memo<{ faqItem: FAQItem }>(({ faqItem }) => {
  return (
    <div className="space-y-3">
      <div className="break-words">
        <ClickableLinksText text={faqItem.answer} />
      </div>
      
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
                <div className="text-blue-800">
                  <ClickableLinksText text={step} />
                </div>
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
});

/**
 * Formatted Text Content Component
 */
const FormattedTextContent = memo<{ text: string }>(({ text }) => {
  const lines = TextRenderer.parseFormattedLines(text);
  
  return (
    <div className="space-y-2">
      {lines.map((line, index) => (
        <FormattedLineComponent key={index} line={line} />
      ))}
    </div>
  );
});

/**
 * Formatted Line Component
 */
const FormattedLineComponent = memo<{ line: FormattedLine }>(({ line }) => {
  switch (line.type) {
    case 'empty':
      return <div className="h-1" />;
      
    case 'bold-title':
      return <BoldTitleComponent content={line.content} />;
      
    case 'list-item':
      return <ListItemComponent content={line.content} />;
      
    case 'sub-item':
      return <SubItemComponent content={line.content} />;
      
    default:
      return (
        <div className="leading-relaxed">
          <ClickableLinksText text={line.content} />
        </div>
      );
  }
});

/**
 * Bold Title Component
 */
const BoldTitleComponent = memo<{ content: string }>(({ content }) => {
  const { beforeBold, boldText, afterBold } = TextRenderer.parseBoldTitle(content);
  
  return (
    <div className="font-semibold text-gray-800 mt-3 mb-2">
      {beforeBold && <ClickableLinksText text={beforeBold} />}
      <span className="font-bold">{boldText}</span>
      {afterBold && <ClickableLinksText text={afterBold} />}
    </div>
  );
});

/**
 * List Item Component
 */
const ListItemComponent = memo<{ content: string }>(({ content }) => {
  const { bullet, content: itemContent } = TextRenderer.parseListItem(content);
  
  return (
    <div className="flex items-start space-x-2 ml-2">
      <span className="text-blue-600 font-medium flex-shrink-0">
        {bullet}
      </span>
      <span className="flex-1">
        <ClickableLinksText text={itemContent} />
      </span>
    </div>
  );
});

/**
 * Sub Item Component
 */
const SubItemComponent = memo<{ content: string }>(({ content }) => {
  const parsedContent = TextRenderer.parseSubItem(content);
  
  return (
    <div className="flex items-start space-x-2 ml-6">
      <span className="text-gray-600">•</span>
      <span>
        <ClickableLinksText text={parsedContent} />
      </span>
    </div>
  );
});

/**
 * Clickable Links Text Component
 */
const ClickableLinksText = memo<{ text: string }>(({ text }) => {
  const parts = TextRenderer.parseTextWithLinks(text);
  
  return (
    <span>
      {parts.map((part, index) => 
        part.isLink ? (
          <a
            key={index}
            href={part.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline font-medium transition-colors cursor-pointer inline-flex items-center"
            onClick={(e) => {
              e.preventDefault();
              if (part.url) {
                window.open(part.url, '_blank', 'noopener,noreferrer');
              }
            }}
            title={`Abrir ${part.text} em nova aba`}
          >
            {part.text}
            <ExternalLink className="h-3 w-3 ml-1 inline" />
          </a>
        ) : (
          <span key={index}>{part.text}</span>
        )
      )}
    </span>
  );
});

// Display names for debugging
FAQResponse.displayName = 'FAQResponse';
FormattedTextContent.displayName = 'FormattedTextContent';
FormattedLineComponent.displayName = 'FormattedLineComponent';
BoldTitleComponent.displayName = 'BoldTitleComponent';
ListItemComponent.displayName = 'ListItemComponent';
SubItemComponent.displayName = 'SubItemComponent';
ClickableLinksText.displayName = 'ClickableLinksText';
MessageItem.displayName = 'MessageItem';