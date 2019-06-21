DROP TABLE IF EXISTS calendar;

CREATE TABLE calendar (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    hood VARCHAR,
    title VARCHAR NOT NULL CHECK (title <> ''),
    event_start VARCHAR NOT NULL CHECK (event_start <> ''),
    event_end VARCHAR NOT NULL CHECK (event_end <> ''),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
