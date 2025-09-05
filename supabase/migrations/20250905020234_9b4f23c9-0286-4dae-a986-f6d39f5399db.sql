-- Create storage bucket for outfit images
INSERT INTO storage.buckets (id, name, public) VALUES ('outfit-images', 'outfit-images', true);

-- Create storage policies for outfit images
CREATE POLICY "Allow public access to outfit images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'outfit-images');

CREATE POLICY "Allow anonymous upload to outfit images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'outfit-images');

-- Update Email table to include image reference
ALTER TABLE public."Email" 
ADD COLUMN image_url TEXT,
ADD COLUMN image_path TEXT,
ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT now();