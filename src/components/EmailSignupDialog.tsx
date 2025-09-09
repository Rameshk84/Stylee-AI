import { useState } from 'react';
import { Mail, Sparkles, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface EmailSignupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageFile?: File | null;
  analysis?: any;
  occasion?: string | null;
}

export const EmailSignupDialog = ({ 
  open, 
  onOpenChange, 
  imageFile, 
  analysis, 
  occasion 
}: EmailSignupDialogProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      let imageUrl = null;
      let imagePath = null;

      // Upload image to Supabase storage if provided
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        imagePath = `outfit-images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('outfit-images')
          .upload(imagePath, imageFile);

        if (uploadError) {
          console.error('Storage upload error:', uploadError);
          toast({
            title: "Upload Error",
            description: "Failed to upload your outfit image. Please try again.",
            variant: "destructive",
          });
          return;
        }

        // Get the public URL for the uploaded image
        const { data: { publicUrl } } = supabase.storage
          .from('outfit-images')
          .getPublicUrl(imagePath);
        
        imageUrl = publicUrl;
      }

      // Save email, image, and analysis data to database
      const emailData = {
        Email: email,
        image_url: imageUrl,
        image_path: imagePath,
        analysis: analysis ? JSON.stringify(analysis) : null,
        occasion: occasion,
      };

      const { error } = await (supabase as any)
        .from('Email')
        .insert([emailData]);

      if (error) {
        console.error('Database error:', error);
        toast({
          title: "Error",
          description: "Failed to save your information. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Welcome to StyleAI! 🎉",
        description: "Your outfit analysis and email have been saved successfully!",
      });
      
      onOpenChange(false);
      setEmail('');
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-border bg-card">
        <DialogHeader className="text-center space-y-3">
          <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-primary-foreground" />
          </div>
          <DialogTitle className="text-xl text-foreground">Love your analysis?</DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            Sign up to save your outfit insights, get personalized recommendations, and track your style journey!
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">Email address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-background border-border text-foreground"
                disabled={isSubmitting}
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-2 pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="gradient"
              className="w-full"
            >
              {isSubmitting ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Check my Outfit Score
                </>
              )}
            </Button>
          </div>
        </form>
        
        <p className="text-xs text-muted-foreground text-center mt-4">
          By signing up, you agree to our terms of service and privacy policy.
        </p>
      </DialogContent>
    </Dialog>
  );
};