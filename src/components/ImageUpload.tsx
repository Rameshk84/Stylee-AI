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

  // Upload interface
  return (
    <div className="space-y-4">
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
      
      <div className="text-center">
        <Button
          onClick={toggleCameraMode}
          variant="outline"
          className="w-full"
        >
          <Camera className="w-4 h-4 mr-2" />
          Take Photo with Camera
        </Button>
      </div>
    </div>
  );
};