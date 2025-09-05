-- Add analysis column to store outfit analysis data
ALTER TABLE public."Email" 
ADD COLUMN analysis JSONB;