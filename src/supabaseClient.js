import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://bklmlrrvomypcwmsjpil.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrbG1scnJ2b215cGN3bXNqcGlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTI5NTYzNjcsImV4cCI6MTk2ODUzMjM2N30.bCbDxPSAWDTHJsqW66etxPB6Q6Q4cHXjC4WJ1PT5U0U"
);
