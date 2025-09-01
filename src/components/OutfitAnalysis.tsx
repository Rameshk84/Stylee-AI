import { Star, Sparkles, Heart, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface AnalysisResult {
  overallScore: number;
  colorHarmony: number;
  styleCoherence: number;
  fitQuality: number;
  trendiness: number;
  occasion: string;
  strengths: string[];
  improvements: string[];
  tags: string[];
}

interface OutfitAnalysisProps {
  analysis: AnalysisResult | null;
  isLoading: boolean;
}

export const OutfitAnalysis = ({ analysis, isLoading }: OutfitAnalysisProps) => {
  if (isLoading) {
    return (
      <Card className="p-6 space-y-4 shadow-card animate-pulse">
        <div className="h-6 bg-muted rounded w-1/3"></div>
        <div className="space-y-3">
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
        </div>
      </Card>
    );
  }

  if (!analysis) return null;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'rating-excellent';
    if (score >= 60) return 'rating-good';
    if (score >= 40) return 'rating-average';
    return 'rating-poor';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-500 to-green-400';
    if (score >= 60) return 'from-yellow-500 to-yellow-400';
    if (score >= 40) return 'from-orange-500 to-orange-400';
    return 'from-red-500 to-red-400';
  };

  return (
    <Card className="p-6 space-y-6">
      {/* Overall Score */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center">
          <div className={cn(
            "w-20 h-20 rounded-full bg-gradient-to-br flex items-center justify-center",
            getScoreGradient(analysis.overallScore)
          )}>
            <span className="text-xl font-bold text-white">
              {analysis.overallScore}
            </span>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-bold">
            Your Style Score
          </h3>
          <p className="text-muted-foreground text-sm">Overall outfit rating</p>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <MetricCard
          label="Colors"
          score={analysis.colorHarmony}
          icon={<Heart className="w-4 h-4" />}
        />
        <MetricCard
          label="Style"
          score={analysis.styleCoherence}
          icon={<Star className="w-4 h-4" />}
        />
        <MetricCard
          label="Fit"
          score={analysis.fitQuality}
          icon={<TrendingUp className="w-4 h-4" />}
        />
        <MetricCard
          label="Trends"
          score={analysis.trendiness}
          icon={<Sparkles className="w-4 h-4" />}
        />
      </div>

      {/* Style Tags */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2 justify-center">
          {analysis.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Key Points */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <Star className="w-4 h-4 text-green-500" />
            What's Working
          </h4>
          <ul className="space-y-1">
            {analysis.strengths.slice(0, 2).map((strength, index) => (
              <li key={index} className="text-sm text-muted-foreground">
                • {strength}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            Quick Improvements
          </h4>
          <ul className="space-y-1">
            {analysis.improvements.slice(0, 2).map((improvement, index) => (
              <li key={index} className="text-sm text-muted-foreground">
                • {improvement}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};

interface MetricCardProps {
  label: string;
  score: number;
  icon: React.ReactNode;
}

const MetricCard = ({ label, score, icon }: MetricCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'hsl(var(--rating-excellent))';
    if (score >= 60) return 'hsl(var(--rating-good))';
    if (score >= 40) return 'hsl(var(--rating-average))';
    return 'hsl(var(--rating-poor))';
  };

  return (
    <div className="p-3 bg-muted/30 rounded-lg space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium flex items-center gap-1">
          {icon}
          {label}
        </span>
        <span className="text-xs font-bold" style={{ color: getScoreColor(score) }}>
          {score}
        </span>
      </div>
      <Progress value={score} className="h-1.5" />
    </div>
  );
};