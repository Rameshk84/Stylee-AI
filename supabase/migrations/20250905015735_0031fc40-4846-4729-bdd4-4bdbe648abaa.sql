-- Create RLS policy to allow anonymous users to insert emails
CREATE POLICY "Allow anonymous email insertion" 
ON public.Email 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Create RLS policy to allow authenticated users to insert emails  
CREATE POLICY "Allow authenticated email insertion" 
ON public.Email 
FOR INSERT 
TO authenticated 
WITH CHECK (true);