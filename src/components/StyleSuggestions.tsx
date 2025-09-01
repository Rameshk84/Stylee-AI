import { ShoppingBag, Palette, Scissors, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Suggestion {
  id: string;
  category: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  tags: string[];
}

interface StyleSuggestionsProps {
  suggestions: Suggestion[];
  occasion: string;
}

export const StyleSuggestions = ({ suggestions, occasion }: StyleSuggestionsProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'rating-excellent';
      case 'medium':
        return 'rating-good';
      case 'low':
        return 'rating-average';
      default:
        return 'muted';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'color':
        return <Palette className="w-5 h-5" />;
      case 'fit':
        return <Scissors className="w-5 h-5" />;
      case 'accessories':
        return <ShoppingBag className="w-5 h-5" />;
      default:
        return <Star className="w-5 h-5" />;
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">
          Style Tips
        </h3>
        <p className="text-muted-foreground text-sm">
          For your <span className="font-medium capitalize">{occasion}</span> look
        </p>
      </div>

      <div className="space-y-3">
        {suggestions.map((suggestion) => (
          <div 
            key={suggestion.id} 
            className="p-4 bg-muted/20 rounded-lg"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white">
                  {getCategoryIcon(suggestion.category)}
                </div>
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-medium text-sm">{suggestion.title}</h4>
                  <Badge 
                    variant="outline" 
                    className="text-xs"
                  >
                    {suggestion.priority}
                  </Badge>
                </div>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {suggestion.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};