DROP TABLE IF EXISTS studios CASCADE;
DROP TABLE IF EXISTS films CASCADE;
DROP TABLE IF EXISTS actors CASCADE;
DROP TABLE IF EXISTS reviewers CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;
    -- id;
    -- name;
    -- city;
    -- state;
    -- country;

CREATE TABLE studios (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    country TEXT NOT NULL
);

CREATE TABLE films (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    studio_id BIGINT, 
    FOREIGN KEY(studio_id) REFERENCES studios(id),
    released NUMERIC(4) NOT NULL

);

CREATE TABLE actors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    film_id BIGINT,
    FOREIGN KEY(film_id) REFERENCES films(id),
    dob TEXT NOT NULL,
    pob TEXT NOT NULL
);

CREATE TABLE reviewers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    company TEXT NOT NULL
);

CREATE TABLE reviews (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    rating INTEGER NOT NULL,
    reviewer_id BIGINT,
    FOREIGN KEY(reviewer_id) REFERENCES reviewers(id),
    review TEXT NOT NULL,
    film_id BIGINT,
    FOREIGN KEY(film_id) REFERENCES films(id)
);

