/**
 * Suggestions Panel Component
 * Shows government service suggestions and FAQ categories toggle
 */

import { memo } from 'react';
import { Book } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { GOV_SUGGESTIONS } from '../../constants';

interface SuggestionsPanelProps {
  readonly showFAQCategories: boolean;
  readonly onToggleFAQ: () => void;
  readonly onSuggestionClick: (suggestion: string) => void;
  readonly messagesCount: number;
}

export const SuggestionsPanel = memo<SuggestionsPanelProps>(({
  showFAQCategories,
  onToggleFAQ,
  onSuggestionClick,
  messagesCount
}) => {
  // Only show suggestions on initial screen (when only welcome message exists)
  if (showFAQCategories || messagesCount > 1) {
    return null;
  }

  return (
    <div className="p-4 bg-blue-50">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-blue-800">Perguntas frequentes:</p>
        <Button
          size="sm"
          variant="ghost"
          onClick={onToggleFAQ}
          className="text-blue-700 hover:bg-blue-200 h-6 px-2"
          aria-label="Ver todas as perguntas frequentes"
        >
          <Book className="h-3 w-3 mr-1" />
          Ver todas
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {GOV_SUGGESTIONS.map((suggestion, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="cursor-pointer hover:bg-blue-200 text-xs"
            onClick={() => onSuggestionClick(suggestion)}
          >
            {suggestion}
          </Badge>
        ))}
      </div>
    </div>
  );
});

SuggestionsPanel.displayName = 'SuggestionsPanel';