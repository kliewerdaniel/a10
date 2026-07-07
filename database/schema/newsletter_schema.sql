-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  source TEXT DEFAULT 'manual',
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Email sequences table
CREATE TABLE IF NOT EXISTS email_sequences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  subscriber_id UUID REFERENCES newsletter_subscribers(id) ON DELETE CASCADE,
  sequence_name TEXT NOT NULL,
  step_number INTEGER NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  opened_at TIMESTAMP WITH TIME ZONE,
  clicked_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(subscriber_id, sequence_name, step_number)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribed_at ON newsletter_subscribers(subscribed_at);
CREATE INDEX IF NOT EXISTS idx_sequences_subscriber ON email_sequences(subscriber_id, sequence_name, step_number);

-- Enable RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_sequences ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Allow public read access" ON newsletter_subscribers
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON newsletter_subscribers
  FOR UPDATE USING (true);

CREATE POLICY "Allow authenticated select sequences" ON email_sequences
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert sequences" ON email_sequences
  FOR INSERT WITH CHECK (true);
