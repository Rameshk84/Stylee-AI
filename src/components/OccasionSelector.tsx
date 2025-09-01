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
    <Card className="p-6 space-y-4 shadow-card">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold bg-gradient-primary bg-clip-text text-transparent">
          What's the Occasion?
        </h3>
        <p className="text-muted-foreground text-sm">
          Select the event type for personalized style advice
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {occasions.map((occasion) => (
          <Button
            key={occasion.id}
            variant="outline"
            className={cn(
              "h-auto p-4 flex flex-col items-center gap-2 transition-all duration-300",
              "hover:shadow-lg hover:scale-105",
              selectedOccasion === occasion.id && "ring-2 ring-primary shadow-elegant"
            )}
            onClick={() => onSelect(occasion.id)}
          >
            <div className={cn(
              "w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center text-white",
              occasion.gradient
            )}>
              {occasion.icon}
            </div>
            <div className="text-center">
              <div className="font-medium text-xs">{occasion.label}</div>
              <div className="text-[10px] text-muted-foreground leading-tight mt-1">
                {occasion.description}
              </div>
            </div>
          </Button>
        ))}
      </div>
    </Card>
  );
};