import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kepcvbyzqmyygibbyjpu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlcGN2Ynl6cW15eWdpYmJ5anB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0ODc4MDUsImV4cCI6MjA3MzA2MzgwNX0.jHdwwZg32wJ8cV1--Eckw07-xKTkgqlWTNqiXsn0_5U'

export const supabase = createClient(supabaseUrl, supabaseKey)
