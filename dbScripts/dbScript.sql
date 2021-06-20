CREATE DATABASE `recruitbuddy`;

USE recruitbuddy;

CREATE TABLE `users` (
  `username` varchar(255) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` char(1) NOT NULL DEFAULT 'J',
  `active` int NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `jobs` (
  `jobId` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `desc` mediumtext NOT NULL,
  `company` varchar(255) NOT NULL,
  `companyLogoURL` mediumtext NOT NULL,
  `location` varchar(255) NOT NULL,
  `postedBy` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `active` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`jobId`),
  KEY `postedBy` (`postedBy`),
  CONSTRAINT `jobs_ibfk_1` FOREIGN KEY (`postedBy`) REFERENCES `users` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `applications` (
  `applicationId` varchar(255) NOT NULL,
  `jobId` varchar(255) NOT NULL,
  `appliedBy` varchar(255) NOT NULL,
  `experience` int NOT NULL,
  `noticePeriod` int NOT NULL,
  `resumeLink` mediumtext NOT NULL,
  `status` char(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `postedBy` varchar(255) NOT NULL,
  PRIMARY KEY (`applicationId`),
  KEY `appliedBy` (`appliedBy`),
  KEY `jobId` (`jobId`),
  CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`appliedBy`) REFERENCES `users` (`username`),
  CONSTRAINT `applications_ibfk_2` FOREIGN KEY (`jobId`) REFERENCES `jobs` (`jobId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
