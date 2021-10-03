-- DB_SQL 2

SELECT role, COUNT(*)
FROM "Users"
GROUP BY role;


-- DB_SQL 3

UPDATE "Users"
SET balance = balance + (c.prizeSum * 0.1)
FROM ( SELECT SUM(C.prize) AS prizeSum
    FROM "Contests" AS C
    JOIN "Users" AS U ON U.id = C."userId"
    WHERE U.role = 'customer' AND C."createdAt" BETWEEN '2021-09-01' AND '2021-10-02'
    GROUP BY C."userId") AS c(prizeSum)
WHERE id IN (SELECT C."userId"
    FROM "Contests" AS C
    JOIN "Users" AS U ON U.id = C."userId"
    WHERE U.role = 'customer' AND C."createdAt" BETWEEN '2021-09-01' AND '2021-10-02');


-- DB_SQL 4

UPDATE "Users"
SET balance = balance + 10.0
WHERE id IN (SELECT U.id
    FROM "Users" AS U
    WHERE U.role = 'creator'
    ORDER BY U.rating DESC
    LIMIT 3);
