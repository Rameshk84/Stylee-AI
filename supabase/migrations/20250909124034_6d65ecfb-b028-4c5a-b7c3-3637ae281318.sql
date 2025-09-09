-- Add missing occasion column to Email table
ALTER TABLE public."Email" ADD COLUMN occasion TEXT;