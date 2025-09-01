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
    <Card className="p-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">
          What's the Occasion?
        </h3>
        <p className="text-muted-foreground text-sm">
          Choose your event type
        </p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {occasions.map((occasion) => (
          <Button
            key={occasion.id}
            variant={selectedOccasion === occasion.id ? "default" : "outline"}
            className={cn(
              "h-auto p-3 flex flex-col items-center gap-2 transition-all duration-200",
              selectedOccasion === occasion.id && "bg-gradient-primary text-white"
            )}
            onClick={() => onSelect(occasion.id)}
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center",
              selectedOccasion === occasion.id 
                ? "bg-white/20" 
                : cn("bg-gradient-to-br text-white", occasion.gradient)
            )}>
              {occasion.icon}
            </div>
            <div className="text-center">
              <div className="font-medium text-xs">{occasion.label}</div>
            </div>
          </Button>
        ))}
      </div>
    </Card>
  );
};