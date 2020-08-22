CREATE TABLE `authors` (
  `author_id` int(11) NOT NULL AUTO_INCREMENT,
  `author_name` varchar(45) DEFAULT NULL,
  `author_description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`author_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `books` (
  `book_id` int(11) NOT NULL AUTO_INCREMENT,
  `book_title` varchar(45) NOT NULL,
  `book_author` int(11) NOT NULL,
  `book_description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`book_id`),
  KEY `fk_books_author_idx` (`book_author`),
  CONSTRAINT `fk_books_author` FOREIGN KEY (`book_author`) REFERENCES `authors` (`author_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;


CREATE TABLE `reviews` (
  `review_id` int(11) NOT NULL AUTO_INCREMENT,
  `rating` int(11) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `book_id` int(11) NOT NULL,
  PRIMARY KEY (`review_id`),
  KEY `review_book_fk_idx` (`book_id`),
  CONSTRAINT `review_book_fk` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

