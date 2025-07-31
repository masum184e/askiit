-- ================================
-- askiit: FINAL MySQL 8.x DDL
-- Includes many-to-many membership
-- for SPL, paper, and achievement
-- (no role, no joined_at)
-- ================================

CREATE DATABASE IF NOT EXISTS askiit
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_0900_ai_ci;
USE askiit;

SET sql_mode = 'STRICT_ALL_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- ======================
-- Table: student
-- ======================
CREATE TABLE IF NOT EXISTS student (
  student_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(200) NOT NULL,
  email VARCHAR(320) NOT NULL, -- validate RFC in app layer
  whatsapp VARCHAR(32) NULL,   -- store E.164: +8801...
  session VARCHAR(32) NULL,    -- e.g., "2024-25" or "Spring 2025"
  address TEXT NULL,
  internship_company VARCHAR(200) NULL,
  internship_technology VARCHAR(200) NULL,

  created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  deleted_at DATETIME(6) NULL,

  PRIMARY KEY (student_id),
  UNIQUE KEY ux_student_email (email),
  UNIQUE KEY ux_student_whatsapp (whatsapp),

  CONSTRAINT chk_whatsapp_format CHECK (
    whatsapp IS NULL OR whatsapp REGEXP '^[+][0-9]{7,15}$'
  ),
  CONSTRAINT chk_session_format CHECK (
    session IS NULL OR
    session REGEXP '^[0-9]{4}[-/][0-9]{4}$' OR
    session REGEXP '^[A-Za-z]+[[:space:]]?[0-9]{4}$'
  )
) ENGINE=InnoDB;

CREATE INDEX ix_student_session ON student (session);

-- ======================
-- Table: spl (Student Project / Lab)
-- NOTE: no student_id here; membership via spl_member
-- ======================
CREATE TABLE IF NOT EXISTS spl (
  spl_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(200) NOT NULL,
  github VARCHAR(512) NULL,
  live VARCHAR(512) NULL,
  mentor VARCHAR(200) NULL,
  overview TEXT NULL,
  banner VARCHAR(512) NULL,

  created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  deleted_at DATETIME(6) NULL,

  PRIMARY KEY (spl_id),
  KEY ix_spl_name (name),
  KEY ix_spl_mentor (mentor)
) ENGINE=InnoDB;

-- ======================
-- Table: achievement
-- NOTE: no student_id here; membership via achievement_member
-- ======================
CREATE TABLE IF NOT EXISTS achievement (
  achievement_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  competition_name VARCHAR(200) NOT NULL,
  position VARCHAR(50) NULL,     -- e.g., "Winner" or "1"
  overview TEXT NULL,

  created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  deleted_at DATETIME(6) NULL,

  PRIMARY KEY (achievement_id),
  KEY ix_ach_competition (competition_name),
  KEY ix_ach_position (position)
) ENGINE=InnoDB;

-- ======================
-- Table: paper
-- NOTE: no student_id here; membership via paper_member
-- Keep 'author' for non-student/external author text if needed
-- ======================
CREATE TABLE IF NOT EXISTS paper (
  paper_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(250) NOT NULL,     -- paper title
  publisher VARCHAR(200) NULL,
  author VARCHAR(200) NULL,       -- optional free-text author string (e.g., external co-authors)

  created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  deleted_at DATETIME(6) NULL,

  PRIMARY KEY (paper_id),
  KEY ix_paper_name (name),
  KEY ix_paper_publisher (publisher),
  KEY ix_paper_author (author)
) ENGINE=InnoDB;

-- ======================
-- Topics lookup (unique, deduplicated)
-- ======================
CREATE TABLE IF NOT EXISTS topic (
  topic_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,             -- e.g., 'machine learning'
  slug VARCHAR(120) GENERATED ALWAYS AS (
    REPLACE(LOWER(name), ' ', '-')
  ) VIRTUAL,
  created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (topic_id),
  UNIQUE KEY ux_topic_name (name),
  KEY ix_topic_slug (slug)
) ENGINE=InnoDB;

-- ======================
-- Junctions: membership tables (no role/joined_at)
-- Prevent duplicates with composite PKs
-- ======================

-- SPL membership: many students per SPL; many SPLs per student
CREATE TABLE IF NOT EXISTS spl_member (
  spl_id     BIGINT UNSIGNED NOT NULL,
  student_id BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (spl_id, student_id),
  KEY ix_spl_member_student (student_id),
  CONSTRAINT fk_spl_member_spl
    FOREIGN KEY (spl_id) REFERENCES spl(spl_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_spl_member_student
    FOREIGN KEY (student_id) REFERENCES student(student_id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Achievement membership: team winners, etc.
CREATE TABLE IF NOT EXISTS achievement_member (
  achievement_id BIGINT UNSIGNED NOT NULL,
  student_id     BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (achievement_id, student_id),
  KEY ix_achievement_member_student (student_id),
  CONSTRAINT fk_achievement_member_achievement
    FOREIGN KEY (achievement_id) REFERENCES achievement(achievement_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_achievement_member_student
    FOREIGN KEY (student_id) REFERENCES student(student_id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Paper membership: multiple student authors per paper
CREATE TABLE IF NOT EXISTS paper_member (
  paper_id   BIGINT UNSIGNED NOT NULL,
  student_id BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (paper_id, student_id),
  KEY ix_paper_member_student (student_id),
  CONSTRAINT fk_paper_member_paper
    FOREIGN KEY (paper_id) REFERENCES paper(paper_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_paper_member_student
    FOREIGN KEY (student_id) REFERENCES student(student_id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;


-- ======================
-- Student ↔ Topic membership
-- (no extra columns; prevents duplicates with composite PK)
-- ======================
CREATE TABLE IF NOT EXISTS student_interest (
  student_id BIGINT UNSIGNED NOT NULL,
  topic_id   BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (student_id, topic_id),
  KEY ix_student_interest_topic (topic_id),
  CONSTRAINT fk_student_interest_student
    FOREIGN KEY (student_id) REFERENCES student(student_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_student_interest_topic
    FOREIGN KEY (topic_id) REFERENCES topic(topic_id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;
