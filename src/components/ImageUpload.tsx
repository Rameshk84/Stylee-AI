import { useState, useRef } from 'react';
import { Upload, Camera, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  selectedImage: string | null;
  onClear: () => void;
}

export const ImageUpload = ({ onImageSelect, selectedImage, onClear }: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (selectedImage) {
    return (
      <Card className="relative overflow-hidden bg-gradient-primary shadow-elegant border-0">
        <div className="relative aspect-square max-w-sm mx-auto">
          <img
            src={selectedImage}
            alt="Selected outfit"
            className="w-full h-full object-cover rounded-lg"
          />
          <Button
            onClick={onClear}
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2 rounded-full w-8 h-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "border-2 border-dashed transition-all duration-300 cursor-pointer shadow-card",
        "hover:shadow-elegant hover:border-primary/50",
        isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={triggerFileInput}
    >
      <div className="p-8 text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
          <Upload className="w-8 h-8 text-white" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Upload Your Outfit Photo</h3>
          <p className="text-muted-foreground">
            Drop an image here or click to select
          </p>
        </div>
        
        <div className="flex justify-center gap-3">
          <Button variant="outline" className="gap-2">
            <Upload className="w-4 h-4" />
            Choose File
          </Button>
          <Button variant="outline" className="gap-2">
            <Camera className="w-4 h-4" />
            Camera
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground">
          Supports JPG, PNG, WEBP up to 10MB
        </p>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />
    </Card>
  );
};