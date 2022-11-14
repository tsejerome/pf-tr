CREATE DATABASE IF NOT EXISTS `test-abc`;
USE `test-abc`;

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `trades`;

CREATE TABLE `trades` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ticker` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `price` decimal(20,2) DEFAULT NULL,
  `amount` decimal(20,2) DEFAULT NULL,
  `executionType` enum("buy","sell") DEFAULT NULL,
  `executionDate` timestamp NULL DEFAULT NULL,
  `UserId` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `users` (`id`, `name`) VALUES
(3, "123-2ac7-40ff-8a23-e3e92d08bc95"),
(4, "421-2ac7-40ff-8a23-e3e92d08bc95");

INSERT INTO `trades` (`id`, `ticker`, `price`, `amount`, `executionType`, `executionDate`, `UserId`) VALUES
(8, "CAD", 12.21, 12.21, "buy", "2022-11-14 11:57:57", 4),
(9, "CAD", 12.21, 12.21, "buy", "2021-11-12 11:57:57", 3);


