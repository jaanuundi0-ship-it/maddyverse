/*
  # Create poems and paragraphs tables

  1. New Tables
    - `poems`: Store poems with title, content, and date
    - `paragraphs`: Store paragraphs with title, content, and date
  2. Security
    - Enable RLS on both tables
    - Add policies for public read access (poems and paras are shared content)
*/

CREATE TABLE IF NOT EXISTS poems (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS paragraphs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE poems ENABLE ROW LEVEL SECURITY;
ALTER TABLE paragraphs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Poems are publicly readable"
  ON poems
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Poems can be inserted"
  ON poems
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Paragraphs are publicly readable"
  ON paragraphs
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Paragraphs can be inserted"
  ON paragraphs
  FOR INSERT
  TO public
  WITH CHECK (true);

INSERT INTO poems (title, content) VALUES
  ('First Heartbeat', 'You came into my world like a melody I didn''t know I was waiting for. In every moment with you, I find a new reason to believe in magic. 💕'),
  ('Endless Summer', 'Even in the coldest season, your warmth surrounds me. You are my perpetual sunshine, my eternal spring. 🌸');

INSERT INTO paragraphs (title, content) VALUES
  ('Why You Matter', 'There are moments in life when someone appears and changes everything. You didn''t just change my world - you became my world. Every laugh, every tear, every silent moment beside you feels like coming home.'),
  ('A Promise', 'I promise to love you on the days when words aren''t enough. I promise to be your adventure, your comfort, your home. With you, forever feels like the perfect amount of time. 💕');
