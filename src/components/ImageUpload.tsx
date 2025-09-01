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
      <div className="relative mx-auto max-w-xs">
        <img
          src={selectedImage}
          alt="Selected outfit"
          className="w-full h-48 object-cover rounded-lg"
        />
        <Button
          onClick={onClear}
          variant="outline"
          size="sm"
          className="absolute top-2 right-2 w-8 h-8 p-0 bg-background"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 cursor-pointer",
        "hover:border-primary/50",
        isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={triggerFileInput}
    >
      <div className="space-y-4">
        <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
          <Upload className="w-6 h-6 text-white" />
        </div>
        
        <div className="space-y-2">
          <p className="font-medium">
            {isDragging ? "Drop your photo here" : "Upload outfit photo"}
          </p>
          <p className="text-sm text-muted-foreground">
            Tap to select or drag & drop
          </p>
        </div>
        
        <p className="text-xs text-muted-foreground">
          JPG, PNG, WEBP • Max 10MB
        </p>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  );
};