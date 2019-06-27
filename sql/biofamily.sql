DROP TABLE IF EXISTS biofamily;

CREATE TABLE biofamily (
    id SERIAL PRIMARY KEY,
    bioimg_id INTEGER NOT NULL REFERENCES users(id),
    description TEXT,
    url VARCHAR(300),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
