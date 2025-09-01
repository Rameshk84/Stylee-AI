import { useState } from 'react';
import { Sparkles, Shirt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ImageUpload } from '@/components/ImageUpload';
import { OccasionSelector } from '@/components/OccasionSelector';
import { OutfitAnalysis } from '@/components/OutfitAnalysis';
import { StyleSuggestions } from '@/components/StyleSuggestions';
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
    }, 3000);
  };

  const clearImage = () => {
    setSelectedImage(null);
    setAnalysis(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-90"></div>
        <img 
          src={heroImage} 
          alt="Fashion styling" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="relative container mx-auto px-4 py-20 text-center text-white">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shirt className="w-12 h-12" />
              <h1 className="text-5xl font-bold">StyleAI</h1>
              <Sparkles className="w-12 h-12 animate-pulse" />
            </div>
            
            <p className="text-xl opacity-90 leading-relaxed">
              Get personalized outfit analysis and style recommendations powered by AI. 
              Perfect your look for any occasion.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center pt-6">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">AI-Powered Analysis</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full">
                <Shirt className="w-4 h-4" />
                <span className="text-sm font-medium">Personalized Suggestions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12 space-y-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <Card className="p-2 bg-gradient-primary border-0">
              <div className="bg-background rounded-lg p-4">
                <h2 className="text-2xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
                  Upload Your Outfit
                </h2>
                <ImageUpload
                  onImageSelect={handleImageSelect}
                  selectedImage={selectedImage}
                  onClear={clearImage}
                />
              </div>
            </Card>

            <OccasionSelector
              selectedOccasion={selectedOccasion}
              onSelect={setSelectedOccasion}
            />

            {selectedImage && selectedOccasion && (
              <div className="text-center">
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="bg-gradient-primary hover:shadow-elegant transition-all duration-300 px-8 py-6 text-lg"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                      Analyzing Your Style...
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
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <OutfitAnalysis analysis={analysis} isLoading={isAnalyzing} />
            
            {analysis && selectedOccasion && (
              <StyleSuggestions 
                suggestions={mockSuggestions} 
                occasion={selectedOccasion}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;