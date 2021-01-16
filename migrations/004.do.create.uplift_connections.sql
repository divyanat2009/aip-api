CREATE TABLE aip_connections(
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    user_id INTEGER REFERENCES aip_users(id) ON DELETE CASCADE NOT NULL,
    followee_id INTEGER REFERENCES aip_users(id) ON DELETE CASCADE NOT NULL
)