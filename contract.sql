CREATE TABLE IF NOT EXISTS `tgg-contracts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `buyer` varchar(50) DEFAULT NULL,
  `seller` varchar(50) DEFAULT NULL,
  `vehDescription` longtext DEFAULT NULL,
  `vehPrice` decimal(10,2) DEFAULT NULL,
  `plate` varchar(50) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
