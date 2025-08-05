-- ================================
-- PostgreSQL: FINAL DDL for askiit
-- ================================

-- Create schema (optional)
-- CREATE SCHEMA IF NOT EXISTS askiit;

-- ======================
-- Table: student
-- ======================
CREATE TABLE IF NOT EXISTS student (
  student_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  email VARCHAR(320) NOT NULL,
  whatsapp VARCHAR(32),
  session VARCHAR(32),
  address TEXT,
  internship_company VARCHAR(200),
  internship_technology VARCHAR(200),

  created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  deleted_at TIMESTAMP(6),

  UNIQUE (email),
  UNIQUE (whatsapp),
  
  CONSTRAINT chk_whatsapp_format CHECK (
    whatsapp IS NULL OR whatsapp ~ '^\+[0-9]{7,15}$'
  ),
  CONSTRAINT chk_session_format CHECK (
    session IS NULL OR
    session ~ '^[0-9]{4}[-/][0-9]{4}$' OR
    session ~ '^[A-Za-z]+[[:space:]]?[0-9]{4}$'
  )
);

CREATE INDEX ix_student_session ON student (session);

-- ======================
-- Table: spl
-- ======================
CREATE TABLE IF NOT EXISTS spl (
  spl_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  github VARCHAR(512),
  live VARCHAR(512),
  mentor VARCHAR(200),
  overview TEXT,
  banner VARCHAR(512),

  created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  deleted_at TIMESTAMP(6)
);

CREATE INDEX ix_spl_name ON spl (name);
CREATE INDEX ix_spl_mentor ON spl (mentor);

-- ======================
-- Table: achievement
-- ======================
CREATE TABLE IF NOT EXISTS achievement (
  achievement_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  competition_name VARCHAR(200) NOT NULL,
  position VARCHAR(50),
  overview TEXT,

  created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  deleted_at TIMESTAMP(6)
);

CREATE INDEX ix_ach_competition ON achievement (competition_name);
CREATE INDEX ix_ach_position ON achievement (position);

-- ======================
-- Table: paper
-- ======================
CREATE TABLE IF NOT EXISTS paper (
  paper_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(250) NOT NULL,
  publisher VARCHAR(200),
  author VARCHAR(200),

  created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  deleted_at TIMESTAMP(6)
);

CREATE INDEX ix_paper_name ON paper (name);
CREATE INDEX ix_paper_publisher ON paper (publisher);
CREATE INDEX ix_paper_author ON paper (author);

-- ======================
-- Table: topic
-- ======================
CREATE TABLE IF NOT EXISTS topic (
  topic_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(120) GENERATED ALWAYS AS (replace(lower(name), ' ', '-')) STORED,

  created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

  UNIQUE (name)
);

CREATE INDEX ix_topic_slug ON topic (slug);

-- ======================
-- Table: spl_member
-- ======================
CREATE TABLE IF NOT EXISTS spl_member (
  spl_id BIGINT NOT NULL,
  student_id BIGINT NOT NULL,
  PRIMARY KEY (spl_id, student_id),

  CONSTRAINT fk_spl_member_spl
    FOREIGN KEY (spl_id) REFERENCES spl(spl_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_spl_member_student
    FOREIGN KEY (student_id) REFERENCES student(student_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX ix_spl_member_student ON spl_member (student_id);

-- ======================
-- Table: achievement_member
-- ======================
CREATE TABLE IF NOT EXISTS achievement_member (
  achievement_id BIGINT NOT NULL,
  student_id BIGINT NOT NULL,
  PRIMARY KEY (achievement_id, student_id),

  CONSTRAINT fk_achievement_member_achievement
    FOREIGN KEY (achievement_id) REFERENCES achievement(achievement_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_achievement_member_student
    FOREIGN KEY (student_id) REFERENCES student(student_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX ix_achievement_member_student ON achievement_member (student_id);

-- ======================
-- Table: paper_member
-- ======================
CREATE TABLE IF NOT EXISTS paper_member (
  paper_id BIGINT NOT NULL,
  student_id BIGINT NOT NULL,
  PRIMARY KEY (paper_id, student_id),

  CONSTRAINT fk_paper_member_paper
    FOREIGN KEY (paper_id) REFERENCES paper(paper_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_paper_member_student
    FOREIGN KEY (student_id) REFERENCES student(student_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX ix_paper_member_student ON paper_member (student_id);

-- ======================
-- Table: student_interest
-- ======================
CREATE TABLE IF NOT EXISTS student_interest (
  student_id BIGINT NOT NULL,
  topic_id BIGINT NOT NULL,
  PRIMARY KEY (student_id, topic_id),

  CONSTRAINT fk_student_interest_student
    FOREIGN KEY (student_id) REFERENCES student(student_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_student_interest_topic
    FOREIGN KEY (topic_id) REFERENCES topic(topic_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX ix_student_interest_topic ON student_interest (topic_id);

-- ======================
-- Trigger: auto-update 'updated_at'
-- ======================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP(6);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to tables with 'updated_at'
CREATE TRIGGER trg_student_updated
  BEFORE UPDATE ON student
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_spl_updated
  BEFORE UPDATE ON spl
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_achievement_updated
  BEFORE UPDATE ON achievement
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_paper_updated
  BEFORE UPDATE ON paper
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_topic_updated
  BEFORE UPDATE ON topic
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
