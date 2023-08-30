

CREATE TABLE conversations (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  participants INTEGER[] NOT NULL,
  black_list BOOLEAN[] NOT NULL,
  favorite_list BOOLEAN[] NOT NULL
);


CREATE TABLE catalogs (
  id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES "Users"(id),
  catalog_name VARCHAR(255) NOT NULL
);

CREATE TABLE catalog_chats (
  id SERIAL PRIMARY KEY,
  catalog_id INTEGER REFERENCES catalogs(id),
  conversation_id INTEGER REFERENCES conversations(id)
);


SELECT role, COUNT(*) AS quantity
FROM "Users"
GROUP BY role;