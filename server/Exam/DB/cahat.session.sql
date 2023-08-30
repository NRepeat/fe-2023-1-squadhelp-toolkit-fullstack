

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

INSERT INTO "Contests" (
  "contestType", "fileName", "originalFileName", title, "typeOfName", industry, "focusOfWork",
  "targetCustomer", "styleName", "nameVenture", "typeOfTagline", status, "brandStyle", prize,
  "createdAt", priority, "orderId", "userId"
)
VALUES (
  'name', 'name.png', 'name_original.png', 'Sample Contest', 'Type of Name',
  'Sample Industry', 'Sample Focus of Work', 'Sample Target Customer',
  'Sample Style Name', 'Sample Name Venture', 'Type of Tagline',
  'active', 'Sample Brand Style', 1000.00,
  NOW(), 1, 'ORD123', 1
);


UPDATE "Users" AS u 
SET balance = u.balance + (os.total_prize * 0.1)
FROM (
  SELECT c."userId" AS user_id, SUM(c.prize) AS total_prize
  FROM "Contests" c
  WHERE c."createdAt" >= '2022-12-25' AND c."createdAt" <= '2023-09-14'
  GROUP BY c."userId"
) AS os
WHERE u.id = os.user_id AND u.role = 'customer';


UPDATE "Users" AS u
SET balance = balance + 10
FROM (
  SELECT id
  FROM "Users"
  WHERE role = 'creator'
  ORDER BY rating DESC
  LIMIT 3
) AS top_creative
WHERE u.id = top_creative.id;