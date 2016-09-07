-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Sep 07, 2016 at 01:43 PM
-- Server version: 5.5.42
-- PHP Version: 7.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Dratele`
--

-- --------------------------------------------------------

--
-- Table structure for table `about`
--

CREATE TABLE `about` (
  `id` int(11) NOT NULL,
  `text` varchar(10000) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `about`
--

INSERT INTO `about` (`id`, `text`) VALUES
(1, 'Here goes some text about Dratele. Here goes some text about Dratele. Here goes some text about Dratele. Here goes some text about Dratele. Here goes some text about Dratele.');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(2, 'Dratizmai'),
(6, 'Laundry'),
(4, 'People'),
(1, 'Tedium'),
(3, 'Travel'),
(5, 'Vilnius');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `imagePath` varchar(30) NOT NULL,
  `thumbPath` varchar(30) NOT NULL,
  `categoryId` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `title`, `description`, `imagePath`, `thumbPath`, `categoryId`) VALUES
(1, '01', NULL, 'img/01.jpg', 'img/01_thumb.jpg', 2),
(3, '02', NULL, 'img/02.jpg', 'img/02_thumb.jpg', 5),
(4, '03', NULL, 'img/03.jpg', 'img/03_thumb.jpg', 2),
(5, '04', NULL, 'img/04.jpg', 'img/04_thumb.jpg', 2),
(6, '05', NULL, 'img/05.jpg', 'img/05_thumb.jpg', 2),
(7, '06', NULL, 'img/06.jpg', 'img/06_thumb.jpg', 2),
(8, '07', NULL, 'img/07.jpg', 'img/07_thumb.jpg', 4),
(9, '08', NULL, 'img/08.jpg', 'img/08_thumb.jpg', 2),
(10, '09', NULL, 'img/09.jpg', 'img/09_thumb.jpg', 6),
(11, '10', NULL, 'img/10.jpg', 'img/10_thumb.jpg', 2),
(12, '11', NULL, 'img/11.jpg', 'img/11_thumb.jpg', 1),
(13, '12', NULL, 'img/12.jpg', 'img/12_thumb.jpg', 5),
(14, '13', NULL, 'img/13.jpg', 'img/13_thumb.jpg', 5),
(15, '14', NULL, 'img/14.jpg', 'img/14_thumb.jpg', 5),
(16, '15', NULL, 'img/15.jpg', 'img/15_thumb.jpg', 2),
(18, '17', NULL, 'img/17.jpg', 'img/17_thumb.jpg', 1),
(19, '18', NULL, 'img/18.jpg', 'img/18_thumb.jpg', 5),
(20, '19', NULL, 'img/19.jpg', 'img/19_thumb.jpg', 2),
(21, '20', NULL, 'img/20.jpg', 'img/20_thumb.jpg', 3),
(22, '21', NULL, 'img/21.jpg', 'img/21_thumb.jpg', 3),
(23, '22', NULL, 'img/22.jpg', 'img/22_thumb.jpg', 3),
(24, '23', NULL, 'img/23.jpg', 'img/23_thumb.jpg', 2),
(25, '24', NULL, 'img/24.jpg', 'img/24_thumb.jpg', 2),
(26, '25', NULL, 'img/25.jpg', 'img/25_thumb.jpg', 2),
(27, '26', NULL, 'img/26.jpg', 'img/26_thumb.jpg', 2),
(28, '27', NULL, 'img/27.jpg', 'img/27_thumb.jpg', 2),
(29, '28', NULL, 'img/28.jpg', 'img/28_thumb.jpg', 2),
(30, '29', NULL, 'img/29.jpg', 'img/29_thumb.jpg', 1),
(31, '30', NULL, 'img/30.jpg', 'img/30_thumb.jpg', 1),
(32, '31', NULL, 'img/31.jpg', 'img/31_thumb.jpg', 1),
(33, '32', NULL, 'img/32.jpg', 'img/32_thumb.jpg', 3),
(34, '33', NULL, 'img/33.jpg', 'img/33_thumb.jpg', 3),
(35, '34', NULL, 'img/34.jpg', 'img/34_thumb.jpg', 6),
(36, '35', NULL, 'img/35.jpg', 'img/35_thumb.jpg', 5),
(37, '36', NULL, 'img/36.jpg', 'img/36_thumb.jpg', 2),
(38, '37', NULL, 'img/37.jpg', 'img/37_thumb.jpg', 3),
(39, '38', NULL, 'img/38.jpg', 'img/38_thumb.jpg', 4),
(40, '40', NULL, 'img/40.jpg', 'img/40_thumb.jpg', 6),
(41, '41', NULL, 'img/41.jpg', 'img/41_thumb.jpg', 6),
(42, '42', NULL, 'img/42.jpg', 'img/42_thumb.jpg', 6),
(43, '43', NULL, 'img/43.jpg', 'img/43_thumb.jpg', 6),
(44, '44', NULL, 'img/44.jpg', 'img/44_thumb.jpg', 6),
(45, '45', NULL, 'img/45.jpg', 'img/45_thumb.jpg', 4),
(46, '46', NULL, 'img/46.jpg', 'img/46_thumb.jpg', 4),
(47, '47', NULL, 'img/47.jpg', 'img/47_thumb.jpg', 4),
(48, '48', NULL, 'img/48.jpg', 'img/48_thumb.jpg', 4),
(49, '49', NULL, 'img/49.jpg', 'img/49_thumb.jpg', 4),
(50, '50', NULL, 'img/50.jpg', 'img/50_thumb.jpg', 4),
(51, '51', NULL, 'img/51.jpg', 'img/51_thumb.jpg', 4);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(255) COLLATE utf8_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text COLLATE utf8_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('0DI_UGZ_IP6dyNfib2tOXenmvOEF5B_V', 1472673093, '{"cookie":{"originalMaxAge":false,"expires":false,"httpOnly":true,"path":"/"}}'),
('0geZrlfZ8cfdmLOsYtziFMxgHkA34So3', 1472674915, '{"cookie":{"originalMaxAge":false,"expires":false,"httpOnly":true,"path":"/"}}'),
('3D-xUqL3fm1Oweos_mjzCwN7KZXAEGSl', 1472675000, '{"cookie":{"originalMaxAge":false,"expires":false,"httpOnly":true,"path":"/"}}'),
('6DYMrxPx7YmwKEZfo1D06Pm1BGZyi3HJ', 1472674910, '{"cookie":{"originalMaxAge":false,"expires":false,"httpOnly":true,"path":"/"}}'),
('8QY3e9DXQP6t_BBj-cXINv082mVBG9cp', 1472674996, '{"cookie":{"originalMaxAge":false,"expires":false,"httpOnly":true,"path":"/"}}'),
('8T010QoqjAFzyDL33lmrFOFs8Te6PKYd', 1472673104, '{"cookie":{"originalMaxAge":false,"expires":false,"httpOnly":true,"path":"/"},"passport":{"user":1}}'),
('8xI3MIMQWFWTOtA7cckUcV3Agwt4d9UO', 1472674956, '{"cookie":{"originalMaxAge":false,"expires":false,"httpOnly":true,"path":"/"}}'),
('964JuHN-3mcUfAxtc8TXmpt_bzLzw0pk', 1472674957, '{"cookie":{"originalMaxAge":false,"expires":false,"httpOnly":true,"path":"/"}}'),
('Gm9PrseWjT7eB4eG9eK6QEUnU3vI7q1G', 1472674964, '{"cookie":{"originalMaxAge":false,"expires":false,"httpOnly":true,"path":"/"}}'),
('NHM2Xp22mXUf_YztfYNofXOhVPT5ypYb', 1472674883, '{"cookie":{"originalMaxAge":false,"expires":false,"httpOnly":true,"path":"/"}}'),
('OlthZ-mR-_L7-H-8lacaeqqZHXTeCLCE', 1472674994, '{"cookie":{"originalMaxAge":false,"expires":false,"httpOnly":true,"path":"/"}}'),
('S3WX0-LNoaMG_qZ0QhZTHFDPp7el-Ch_', 1472674916, '{"cookie":{"originalMaxAge":false,"expires":false,"httpOnly":true,"path":"/"}}'),
('SuMjkFFWJ_y53ThwSuLgE0AFukDR3J7v', 1472674919, '{"cookie":{"originalMaxAge":false,"expires":false,"httpOnly":true,"path":"/"}}'),
('SypMdh2cgiY2E88qyq94OZBvNav_Hg0v', 1472674894, '{"cookie":{"originalMaxAge":false,"expires":false,"httpOnly":true,"path":"/"}}'),
('WmAWPQBJvP4PlZN3i2sYe9jTgGC_CQC6', 1472674913, '{"cookie":{"originalMaxAge":false,"expires":false,"httpOnly":true,"path":"/"}}'),
('euLsxOzTfCq6HGjw8cs8z9d5F6TiWvOa', 1472674914, '{"cookie":{"originalMaxAge":false,"expires":false,"httpOnly":true,"path":"/"}}'),
('hb96tGodPOPtwfsCiy4rJXrqouvRH6JQ', 1472675001, '{"cookie":{"originalMaxAge":false,"expires":false,"httpOnly":true,"path":"/"}}'),
('sQkUquJcI_sjrRWPuaLM2ACwsQb1W3MV', 1472674881, '{"cookie":{"originalMaxAge":false,"expires":false,"httpOnly":true,"path":"/"}}'),
('xDg1BF-XM46XgWerbx5o3XiRQ9JCgpbw', 1472674961, '{"cookie":{"originalMaxAge":false,"expires":false,"httpOnly":true,"path":"/"}}');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `hash` varchar(300) NOT NULL,
  `salt` varchar(300) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Id`, `username`, `hash`, `salt`) VALUES
(1, 'dratele', '$2a$10$0zR/2P86cGD0Ui65P9I0QuS9sp1yT5oolGtA2RTf.O5D.pmiW8apG', '$2a$10$0zR/2P86cGD0Ui65P9I0Qu');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about`
--
ALTER TABLE `about`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `about`
--
ALTER TABLE `about`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=52;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `Category_Id` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
