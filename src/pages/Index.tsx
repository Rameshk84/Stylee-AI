import { useState } from 'react';
import { Sparkles, Shirt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ImageUpload } from '@/components/ImageUpload';
import { OccasionSelector } from '@/components/OccasionSelector';
import { OutfitAnalysis } from '@/components/OutfitAnalysis';
import { StyleSuggestions } from '@/components/StyleSuggestions';
import { EmailSignupDialog } from '@/components/EmailSignupDialog';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/assets/hero-fashion.jpg';

// Mock data for demo purposes
const mockAnalysis = {
  overallScore: 78,
  colorHarmony: 85,
  styleCoherence: 72,
  fitQuality: 80,
  trendiness: 75,
  occasion: 'office',
  strengths: [
    'Excellent color coordination',
    'Professional and polished look',
    'Well-fitted silhouette'
  ],
  improvements: [
    'Consider adding a statement accessory',
    'Experiment with different textures',
    'Try a more modern cut'
  ],
  tags: ['Professional', 'Classic', 'Sophisticated', 'Timeless']
};

const mockSuggestions = [
  {
    id: '1',
    category: 'accessories',
    title: 'Add a Statement Watch',
    description: 'A sleek metal watch would complement your professional look and add a touch of sophistication to your outfit.',
    priority: 'high' as const,
    tags: ['accessories', 'professional', 'metal']
  },
  {
    id: '2',
    category: 'color',
    title: 'Incorporate Accent Colors',
    description: 'Consider adding a pop of burgundy or navy through a pocket square or tie to enhance your color palette.',
    priority: 'medium' as const,
    tags: ['color', 'burgundy', 'navy', 'accent']
  },
  {
    id: '3',
    category: 'fit',
    title: 'Consider Tailoring',
    description: 'Your jacket could benefit from slight tailoring at the waist for a more fitted, modern silhouette.',
    priority: 'low' as const,
    tags: ['tailoring', 'fit', 'modern']
  }
];

const Index = () => {
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showEmailSignup, setShowEmailSignup] = useState(false);

  const handleImageSelect = (file: File) => {
    const url = URL.createObjectURL(file);
    setSelectedImage(url);
    toast({
      title: "Image uploaded successfully!",
      description: "Your outfit photo is ready for analysis.",
    });
  };

  const handleAnalyze = async () => {
    if (!selectedImage || !selectedOccasion) {
      toast({
        title: "Missing information",
        description: "Please upload an image and select an occasion.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
      toast({
        title: "Analysis complete!",
        description: "Your outfit has been analyzed. Check out the results below.",
      });
      // Show email signup popup after analysis completes
      setShowEmailSignup(true);
    }, 3000);
  };

  const clearImage = () => {
    setSelectedImage(null);
    setAnalysis(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-primary text-white py-16 px-4">
        <div className="container mx-auto text-center max-w-2xl">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8" />
            <h1 className="text-3xl md:text-4xl font-bold">StyleAI</h1>
          </div>
          
          <p className="text-lg opacity-90 mb-6">
            AI-powered outfit analysis for any occasion
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Upload Section */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Upload Your Outfit Photo
            </h2>
            <ImageUpload
              onImageSelect={handleImageSelect}
              selectedImage={selectedImage}
              onClear={clearImage}
            />
          </Card>

          {/* Occasion Selection */}
          {selectedImage && (
            <OccasionSelector
              selectedOccasion={selectedOccasion}
              onSelect={setSelectedOccasion}
            />
          )}

          {/* Analyze Button */}
          {selectedImage && selectedOccasion && (
            <div className="text-center">
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="bg-gradient-primary hover:shadow-card transition-all duration-300 px-8 py-3"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Analyze My Outfit
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Results */}
          <OutfitAnalysis analysis={analysis} isLoading={isAnalyzing} />
          
          {analysis && selectedOccasion && (
            <StyleSuggestions 
              suggestions={mockSuggestions} 
              occasion={selectedOccasion}
            />
          )}
        </div>
      </section>

      {/* Email Signup Dialog */}
      <EmailSignupDialog 
        open={showEmailSignup} 
        onOpenChange={setShowEmailSignup} 
      />
    </div>
  );
};

export default Index;