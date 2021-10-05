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
)