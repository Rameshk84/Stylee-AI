import { useState, useRef, useCallback } from 'react';
import { Upload, Camera, X, RotateCcw } from 'lucide-react';
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
  const [isCameraMode, setIsCameraMode] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
    }
  };

  const startCamera = useCallback(async () => {
    try {
      setCameraError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Use back camera by default
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      setCameraError('Camera access denied. Please allow camera permissions.');
      console.error('Camera error:', error);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraMode(false);
    setCameraError(null);
  }, [stream]);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw video frame to canvas
    ctx.drawImage(video, 0, 0);
    
    // Convert canvas to blob and create file
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'camera-photo.jpg', { type: 'image/jpeg' });
        handleFileSelect(file);
        stopCamera();
      }
    }, 'image/jpeg', 0.8);
  }, [stopCamera]);

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

  const toggleCameraMode = () => {
    if (isCameraMode) {
      stopCamera();
    } else {
      setIsCameraMode(true);
      startCamera();
    }
  };

  // Camera interface
  if (isCameraMode) {
    return (
      <div className="space-y-4">
        <div className="relative bg-black rounded-lg overflow-hidden">
          {cameraError ? (
            <div className="p-8 text-center text-destructive">
              <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">{cameraError}</p>
            </div>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-64 object-cover"
            />
          )}
        </div>
        
        <div className="flex gap-2 justify-center">
          <Button
            onClick={capturePhoto}
            disabled={!stream || !!cameraError}
            className="bg-gradient-primary hover:shadow-card transition-all"
          >
            <Camera className="w-4 h-4 mr-2" />
            Capture
          </Button>
          <Button
            onClick={stopCamera}
            variant="outline"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
        
        <canvas ref={canvasRef} className="hidden" />
      </div>
    );
  }

  // Selected image display
  if (selectedImage) {
    return (
      <div className="relative mx-auto max-w-xs group animate-scale-in">
        <div className="relative overflow-hidden rounded-2xl shadow-xl">
          <img
            src={selectedImage}
            alt="Selected outfit"
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <Button
          onClick={onClear}
          variant="outline"
          size="sm"
          className="absolute -top-2 -right-2 w-8 h-8 p-0 bg-background/90 backdrop-blur-sm border-2 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-all duration-300 hover:scale-110"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  // Upload interface
  return (
    <div className="space-y-6">
      <div
        className={cn(
          "border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer group",
          "hover:border-primary/50 hover:shadow-lg hover:bg-accent/20",
          "backdrop-blur-sm bg-gradient-card/50",
          isDragging ? "border-primary bg-primary/10 scale-[1.02] shadow-lg" : "border-muted-foreground/25"
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={triggerFileInput}
      >
        <div className="space-y-6 animate-fade-in">
          <div className={cn(
            "mx-auto w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3",
            isDragging ? "bg-primary scale-110" : "bg-gradient-button"
          )}>
            <Upload className={cn(
              "w-7 h-7 transition-colors duration-300",
              isDragging ? "text-white animate-bounce" : "text-white"
            )} />
          </div>
          
          <div className="space-y-3">
            <p className="font-semibold text-lg">
              {isDragging ? "Drop your photo here" : "Upload outfit photo"}
            </p>
            <p className="text-muted-foreground">
              Tap to select or drag & drop your image
            </p>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <span className="px-2 py-1 bg-muted rounded-full">JPG</span>
            <span className="px-2 py-1 bg-muted rounded-full">PNG</span>
            <span className="px-2 py-1 bg-muted rounded-full">WEBP</span>
            <span className="text-muted-foreground/60">• Max 10MB</span>
          </div>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
        />
      </div>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-muted/50"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-background px-4 text-muted-foreground">or</span>
        </div>
      </div>
      
      <Button
        onClick={toggleCameraMode}
        variant="outline"
        className="w-full h-12 bg-gradient-card border-2 border-muted/50 hover:border-primary/50 hover:bg-accent/20 transition-all duration-300 hover:shadow-md hover:scale-[1.02] group"
      >
        <Camera className="w-5 h-5 mr-3 group-hover:animate-pulse" />
        <span className="font-medium">Take Photo with Camera</span>
      </Button>
    </div>
  );
};