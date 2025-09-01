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
    <Card className="p-6 space-y-6 shadow-elegant bg-gradient-to-br from-card to-card/80 border-0">
      {/* Overall Score */}
      <div className="text-center space-y-4">
        <div className="relative inline-flex items-center justify-center">
          <div className={cn(
            "w-24 h-24 rounded-full bg-gradient-to-br flex items-center justify-center shadow-lg",
            getScoreGradient(analysis.overallScore)
          )}>
            <span className="text-2xl font-bold text-white">
              {analysis.overallScore}
            </span>
          </div>
          <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-fashion-gold animate-pulse" />
        </div>
        
        <div>
          <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Outfit Analysis
          </h3>
          <p className="text-muted-foreground">Overall Style Score</p>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <MetricCard
          label="Color Harmony"
          score={analysis.colorHarmony}
          icon={<Heart className="w-4 h-4" />}
        />
        <MetricCard
          label="Style Coherence"
          score={analysis.styleCoherence}
          icon={<Star className="w-4 h-4" />}
        />
        <MetricCard
          label="Fit Quality"
          score={analysis.fitQuality}
          icon={<TrendingUp className="w-4 h-4" />}
        />
        <MetricCard
          label="Trendiness"
          score={analysis.trendiness}
          icon={<Sparkles className="w-4 h-4" />}
        />
      </div>

      {/* Style Tags */}
      <div className="space-y-2">
        <h4 className="font-semibold">Style Tags</h4>
        <div className="flex flex-wrap gap-2">
          {analysis.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="bg-gradient-primary text-white border-0">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Strengths & Improvements */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <h4 className="font-semibold text-rating-excellent flex items-center gap-2">
            <Star className="w-4 h-4" />
            Strengths
          </h4>
          <ul className="space-y-1">
            {analysis.strengths.map((strength, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-rating-excellent rounded-full mt-2 flex-shrink-0"></span>
                {strength}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-semibold text-fashion-purple flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Improvements
          </h4>
          <ul className="space-y-1">
            {analysis.improvements.map((improvement, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-fashion-purple rounded-full mt-2 flex-shrink-0"></span>
                {improvement}
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
    <div className="p-3 bg-muted/50 rounded-lg space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium flex items-center gap-1">
          {icon}
          {label}
        </span>
        <span className="text-sm font-bold" style={{ color: getScoreColor(score) }}>
          {score}%
        </span>
      </div>
      <Progress value={score} className="h-2" />
    </div>
  );
};