import { useState } from 'react';
import { Sparkles, Shirt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ImageUpload } from '@/components/ImageUpload';
import { OccasionSelector } from '@/components/OccasionSelector';
import { OutfitAnalysis } from '@/components/OutfitAnalysis';
import { StyleSuggestions } from '@/components/StyleSuggestions';
import { EmailSignupDialog } from '@/components/EmailSignupDialog';
import Footer from '@/components/Footer';
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
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showEmailSignup, setShowEmailSignup] = useState(false);

  const handleImageSelect = (file: File) => {
    const url = URL.createObjectURL(file);
    setSelectedImage(url);
    setSelectedImageFile(file);
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
    setSelectedImageFile(null);
    setAnalysis(null);
  };

  return (
    <div className="min-h-screen bg-gradient-mesh">
      {/* Hero Section with Apple-style design */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-50"></div>
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <div className="animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-6 animate-scale-in">
              <div className="relative">
                <Sparkles className="w-12 h-12 text-primary animate-glow" />
                <div className="absolute inset-0 w-12 h-12 text-primary/20 animate-pulse"></div>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
                StyleAI
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-light max-w-2xl mx-auto animate-fade-in-up">
              Transform your style with AI-powered outfit analysis
            </p>
            
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground animate-slide-in-left">
              <Shirt className="w-4 h-4" />
              <span>Personalized • Intelligent • Instant</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Glass Morphism */}
      <section className="container mx-auto px-4 pb-16 max-w-5xl">
        <div className="space-y-12">
          {/* Upload Section */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Card className="bg-gradient-card backdrop-blur-glass border-0 shadow-glass p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
                  Upload Your Outfit
                </h2>
                <p className="text-muted-foreground">
                  Let our AI analyze your style and provide personalized recommendations
                </p>
              </div>
              <ImageUpload
                onImageSelect={handleImageSelect}
                selectedImage={selectedImage}
                onClear={clearImage}
              />
            </Card>
          </div>

          {/* Occasion Selection with Animation */}
          {selectedImage && (
            <div className="animate-slide-in-right">
              <OccasionSelector
                selectedOccasion={selectedOccasion}
                onSelect={setSelectedOccasion}
              />
            </div>
          )}

          {/* Analyze Button with Glassmorphism */}
          {selectedImage && selectedOccasion && (
            <div className="text-center animate-scale-in">
              <div className="relative inline-block">
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="relative bg-gradient-button hover:shadow-xl transition-all duration-300 px-12 py-4 text-lg font-semibold border-0 hover:scale-105 active:scale-95 overflow-hidden group"
                  size="lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center">
                    {isAnalyzing ? (
                      <>
                        <Sparkles className="w-5 h-5 mr-3 animate-spin" />
                        Analyzing Your Style...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-3 animate-float" />
                        Analyze My Outfit
                      </>
                    )}
                  </div>
                  {/* Shimmer effect */}
                  {!isAnalyzing && (
                    <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></div>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Results with Staggered Animation */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <OutfitAnalysis analysis={analysis} isLoading={isAnalyzing} />
          </div>
          
          {analysis && selectedOccasion && (
            <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <StyleSuggestions 
                suggestions={mockSuggestions} 
                occasion={selectedOccasion}
              />
            </div>
          )}
        </div>
      </section>

      {/* Email Signup Dialog */}
      <EmailSignupDialog 
        open={showEmailSignup} 
        onOpenChange={setShowEmailSignup}
        imageFile={selectedImageFile}
        analysis={analysis}
        occasion={selectedOccasion}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;