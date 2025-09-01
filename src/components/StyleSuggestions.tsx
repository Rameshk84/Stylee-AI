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
    <Card className="p-6 space-y-6 shadow-elegant">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Style Recommendations
        </h3>
        <p className="text-muted-foreground">
          Personalized suggestions for your <span className="font-medium capitalize">{occasion}</span> outfit
        </p>
      </div>

      <div className="space-y-4">
        {suggestions.map((suggestion) => (
          <Card 
            key={suggestion.id} 
            className="p-4 border-0 bg-gradient-to-r from-muted/30 to-muted/10 hover:shadow-card transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white">
                  {getCategoryIcon(suggestion.category)}
                </div>
              </div>
              
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-semibold text-lg">{suggestion.title}</h4>
                  <Badge 
                    variant="outline" 
                    className={`border-${getPriorityColor(suggestion.priority)} text-${getPriorityColor(suggestion.priority)} bg-${getPriorityColor(suggestion.priority)}/10`}
                  >
                    {suggestion.priority} priority
                  </Badge>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  {suggestion.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {suggestion.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="pt-4 border-t">
        <div className="flex flex-wrap gap-3 justify-center">
          <Button variant="outline" className="gap-2">
            <ShoppingBag className="w-4 h-4" />
            Shop Similar Items
          </Button>
          <Button variant="outline" className="gap-2">
            <Star className="w-4 h-4" />
            Save to Favorites
          </Button>
        </div>
      </div>
    </Card>
  );
};