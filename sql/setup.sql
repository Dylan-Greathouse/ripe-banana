DROP TABLE IF EXISTS studios;
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

--   title: <title of film RS>,
--   studio: <studio id RI>,
--   released: <4-digit year RN>

CREATE TABLE films (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    studio_id INTEGER REFERENCES studios(id) ,
    released BIGINT VARCHAR(4) NOT NULL

)
-- (released between 0 and 9999) limits integer method