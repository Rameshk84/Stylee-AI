import { Briefcase, Coffee, Heart, Plane, Calendar, Users, Music, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Occasion {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  gradient: string;
}

const occasions: Occasion[] = [
  {
    id: 'office',
    label: 'Office',
    icon: <Briefcase className="w-5 h-5" />,
    description: 'Professional workplace attire',
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    id: 'casual',
    label: 'Casual',
    icon: <Coffee className="w-5 h-5" />,
    description: 'Everyday comfortable wear',
    gradient: 'from-green-500 to-green-600'
  },
  {
    id: 'date',
    label: 'Date Night',
    icon: <Heart className="w-5 h-5" />,
    description: 'Romantic dinner or evening out',
    gradient: 'from-pink-500 to-pink-600'
  },
  {
    id: 'vacation',
    label: 'Vacation',
    icon: <Plane className="w-5 h-5" />,
    description: 'Travel and leisure activities',
    gradient: 'from-orange-500 to-orange-600'
  },
  {
    id: 'wedding',
    label: 'Wedding',
    icon: <Calendar className="w-5 h-5" />,
    description: 'Formal ceremony attire',
    gradient: 'from-purple-500 to-purple-600'
  },
  {
    id: 'party',
    label: 'Party',
    icon: <Music className="w-5 h-5" />,
    description: 'Social gatherings and celebrations',
    gradient: 'from-indigo-500 to-indigo-600'
  },
  {
    id: 'meeting',
    label: 'Business Meeting',
    icon: <Users className="w-5 h-5" />,
    description: 'Important business presentations',
    gradient: 'from-gray-600 to-gray-700'
  },
  {
    id: 'graduation',
    label: 'Graduation',
    icon: <GraduationCap className="w-5 h-5" />,
    description: 'Academic ceremonies',
    gradient: 'from-yellow-500 to-yellow-600'
  }
];

interface OccasionSelectorProps {
  selectedOccasion: string | null;
  onSelect: (occasion: string) => void;
}

export const OccasionSelector = ({ selectedOccasion, onSelect }: OccasionSelectorProps) => {
  return (
    <Card className="bg-gradient-card backdrop-blur-glass border-0 shadow-glass p-8 hover:shadow-xl transition-all duration-500 animate-fade-in-up">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          What's the Occasion?
        </h3>
        <p className="text-muted-foreground">
          Choose your event type for personalized styling
        </p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {occasions.map((occasion, index) => (
          <Button
            key={occasion.id}
            variant={selectedOccasion === occasion.id ? "default" : "outline"}
            className={cn(
              "h-auto p-4 flex flex-col items-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-xl group animate-slide-in-left border-2",
              selectedOccasion === occasion.id 
                ? "bg-gradient-button text-white border-transparent shadow-lg scale-105" 
                : "bg-gradient-card/50 backdrop-blur-sm border-muted/50 hover:border-primary/50 hover:bg-accent/20"
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => onSelect(occasion.id)}
          >
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:rotate-6",
              selectedOccasion === occasion.id 
                ? "bg-white/20 text-white" 
                : cn("bg-gradient-to-br text-white shadow-md", occasion.gradient)
            )}>
              {occasion.icon}
            </div>
            <div className="text-center space-y-1">
              <div className="font-semibold text-sm">{occasion.label}</div>
              <div className="text-xs opacity-70 leading-tight">{occasion.description}</div>
            </div>
          </Button>
        ))}
      </div>
    </Card>
  );
};