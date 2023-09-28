/* table creation */

CREATE TABLE ad (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(255) NOT NULL, description TEXT, owner VARCHAR(320) NOT NULL, price INTEGER NOT NULL, createdAt DATE NOT NULL, imageUrl VARCHAR(2048), location VARCHAR(100), category_id INTEGER, FOREIGN KEY (category_id) REFERENCES category(id))
CREATE TABLE category (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(100) NOT NULL)


/* insert category datas in category table */

INSERT INTO category (title) VALUES 
("Vêtements"),("Mobilier"),("High-Tech"),("Autres")

INSERT INTO tag (title) VALUES 
("Neuf"),("Bon état"),("Usagé")

PRAGMA foreign_keys = ON;
INSERT INTO category (title) VALUES ("Boat")

/* insert datas in ad table */

INSERT INTO ad (title, description, owner, price, createdAt, imageUrl, location, categoryId) VALUES 
("Sac à Dos Vintage en Cuir","Un sac à dos en cuir classique au design intemporel. Parfait pour les sorties quotidiennes et les escapades en ville.","john.doe@example.com",149.99,"2023-09-20","https://m.media-amazon.com/images/I/91EXnBnMXyL.jpg","Paris",1),
("Table Basse en Bois Artisanale","Une magnifique table basse artisanale en bois récupéré qui ajoute du charme rustique à votre salon.","marie.martin@example.com",299.99,"2023-09-20","https://mes-decouvertes.com/wp-content/uploads/2020/03/grande-table-bois-pieds-m%C3%A9tal_02.jpeg","Bordeaux",2)

/* ("bike to sell","My bike is blue, working fine. I'm selling it because I've got a new one","bike.seller@gmail.com",30,"2023-09-20","https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000","Lyon",3),  
("bike to sell","My bike is blue, working fine. I'm selling it because I've got a new one","bike.seller@gmail.com",100,"2023-09-20","https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000","Paris",1),
("bike to sell","My bike is blue, working fine. I'm selling it because I've got a new one","bike.seller@gmail.com",100,"2023-09-20","https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000","Bordeaux",2), 
("bike to sell","My bike is blue, working fine. I'm selling it because I've got a new one","bike.seller@gmail.com",70,"2023-09-20","https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000","Lyon",3),  
("bike to sell","My bike is blue, working fine. I'm selling it because I've got a new one","bike.seller@gmail.com",45,"2023-09-20","https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000","Paris",1),
("bike to sell","My bike is blue, working fine. I'm selling it because I've got a new one","bike.seller@gmail.com",100,"2023-09-20","https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000","Bordeaux",2), 
("bike to sell","My bike is blue, working fine. I'm selling it because I've got a new one","bike.seller@gmail.com",20,"2023-09-20","https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000","Lyon",3),  
("bike to sell","My bike is blue, working fine. I'm selling it because I've got a new one","bike.seller@gmail.com",35,"2023-09-20","https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000","Paris",1),
("bike to sell","My bike is blue, working fine. I'm selling it because I've got a new one","bike.seller@gmail.com",100,"2023-09-20","https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000","Bordeaux",2), 
("bike to sell","My bike is blue, working fine. I'm selling it because I've got a new one","bike.seller@gmail.com",25,"2023-09-20","https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000","Lyon",3), 
("bike to sell","My bike is blue, working fine. I'm selling it because I've got a new one","bike.seller@gmail.com",100,"2023-09-20","https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000","Paris",1),
("bike to sell","My bike is blue, working fine. I'm selling it because I've got a new one","bike.seller@gmail.com",60,"2023-09-20","https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000","Bordeaux",2), 
("bike to sell","My bike is blue, working fine. I'm selling it because I've got a new one","bike.seller@gmail.com",10,"2023-09-20","https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000","Lyon",3), 
("bike to sell","My bike is blue, working fine. I'm selling it because I've got a new one","bike.seller@gmail.com",100,"2023-09-20","https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000","Paris",1),
("bike to sell","My bike is blue, working fine. I'm selling it because I've got a new one","bike.seller@gmail.com",100,"2023-09-20","https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000","Bordeaux",2), 
("bike to sell","My bike is blue, working fine. I'm selling it because I've got a new one","bike.seller@gmail.com",80,"2023-09-20","https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000","Lyon",3), 
("bike to sell","My bike is blue, working fine. I'm selling it because I've got a new one","bike.seller@gmail.com",100,"2023-09-20","https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000","Paris",1),
("bike to sell","My bike is blue, working fine. I'm selling it because I've got a new one","bike.seller@gmail.com",100,"2023-09-20","https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000","Bordeaux",2) */

/* display all ads */

SELECT * FROM ad

/* display all ads from Bordeaux */

SELECT * FROM ad WHERE ad.location = "Bordeaux"

/* delete ads if price > 40 */

DELETE FROM ad WHERE ad.price > 40

/* update ads where createdDate = 2023-09-20 */

UPDATE ad SET price = 0 WHERE createdAt = "2023-09-20"

/* display average price of Paris ads */

SELECT AVG(price) FROM ad WHERE location="Paris"

/* display average price of different cities ads */

SELECT location, AVG(price) FROM ad GROUP BY location

/* display all ads related to the "vêtement" category */

SELECT a.id, a.title, a.description, a.owner, a.price, a.createdAt, a.imageUrl, a.location, c.title AS category_name FROM ad AS a INNER JOIN category AS c ON c.id = a.category_id WHERE c.id = 1

/* display all ads related to the "vêtement" or "voitures" categories  */

SELECT a.id, a.title, a.description, a.owner, a.price, a.createdAt, a.imageUrl, a.location, c.title FROM ad AS a INNER JOIN category AS c ON c.id = a.category_id WHERE c.id = 1 OR c.id= 2

/* display average price of ads related to the "autre" category */

SELECT c.title, AVG(a.price) AS average_price FROM ad AS a INNER JOIN category AS c ON c.id = a.category_id WHERE c.id = 3 

/* display average price of ads related to the "autre" category */

SELECT a.id, a.title, a.description, a.owner, a.price, a.createdAt, a.imageUrl, a.location, c.title FROM ad AS a INNER JOIN category AS c ON c.id = a.category_id WHERE c.title LIKE "v%" 
