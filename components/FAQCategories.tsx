import { useState } from 'react';
import { ChevronDown, ChevronUp, Book, FileText, Heart, GraduationCap, Briefcase, Settings } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { govFAQ, FAQItem } from './FAQSystem';

interface FAQCategoriesProps {
  onQuestionSelect: (question: string) => void;
}

export function FAQCategories({ onQuestionSelect }: FAQCategoriesProps) {
  const [openCategories, setOpenCategories] = useState<string[]>(['Documentos']);

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Documentos': return <FileText className="h-4 w-4" />;
      case 'Previdência': return <Briefcase className="h-4 w-4" />;
      case 'Saúde': return <Heart className="h-4 w-4" />;
      case 'Educação': return <GraduationCap className="h-4 w-4" />;
      case 'Benefícios': return <Settings className="h-4 w-4" />;
      case 'Trabalho': return <Briefcase className="h-4 w-4" />;
      case 'Acesso': return <Settings className="h-4 w-4" />;
      default: return <Book className="h-4 w-4" />;
    }
  };

  // Agrupar FAQ por categoria
  const categorizedFAQ = govFAQ.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, FAQItem[]>);

  return (
    <div className="p-4 bg-blue-50">
      <div className="flex items-center mb-3">
        <Book className="h-4 w-4 text-blue-700 mr-2" />
        <h3 className="font-medium text-blue-900">Explorar FAQ por Categoria</h3>
      </div>
      
      <div className="space-y-2">
        {Object.entries(categorizedFAQ).map(([category, items]) => (
          <Collapsible 
            key={category}
            open={openCategories.includes(category)}
            onOpenChange={() => toggleCategory(category)}
          >
            <Card className="overflow-hidden">
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between p-3 h-auto hover:bg-blue-100"
                >
                  <div className="flex items-center">
                    {getCategoryIcon(category)}
                    <span className="ml-2 font-medium text-blue-900">{category}</span>
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {items.length}
                    </Badge>
                  </div>
                  {openCategories.includes(category) ? 
                    <ChevronUp className="h-4 w-4 text-blue-700" /> : 
                    <ChevronDown className="h-4 w-4 text-blue-700" />
                  }
                </Button>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <div className="px-3 pb-3 space-y-2">
                  {items.map((item) => (
                    <Button
                      key={item.id}
                      variant="ghost"
                      className="w-full justify-start text-left h-auto p-2 hover:bg-blue-50"
                      onClick={() => onQuestionSelect(item.question)}
                    >
                      <span className="text-sm text-blue-800">{item.question}</span>
                    </Button>
                  ))}
                </div>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-white rounded-lg border border-blue-200">
        <p className="text-xs text-blue-700">
          💡 <strong>Dica:</strong> Clique em qualquer pergunta para ver a resposta completa com passo a passo detalhado!
        </p>
      </div>
    </div>
  );
}