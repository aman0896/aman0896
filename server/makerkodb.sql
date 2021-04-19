-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: fabhubsdb
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cad_model`
--

DROP TABLE IF EXISTS `cad_model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cad_model` (
  `Model_Name` varchar(100) NOT NULL,
  `Model_Path` varchar(100) NOT NULL,
  `Customer_ID` int NOT NULL,
  PRIMARY KEY (`Model_Name`,`Customer_ID`),
  KEY `Customer_ID_idx` (`Customer_ID`),
  CONSTRAINT `Customer_ID` FOREIGN KEY (`Customer_ID`) REFERENCES `customer` (`Customer_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cad_model`
--

LOCK TABLES `cad_model` WRITE;
/*!40000 ALTER TABLE `cad_model` DISABLE KEYS */;
/*!40000 ALTER TABLE `cad_model` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `Customer_ID` int NOT NULL AUTO_INCREMENT,
  `Email` varchar(100) NOT NULL,
  `First_Name` varchar(60) NOT NULL,
  `Last_Name` varchar(60) NOT NULL,
  `Password` text NOT NULL,
  `Phone_Number` bigint NOT NULL,
  `Ward` int DEFAULT NULL,
  `City` varchar(60) DEFAULT NULL,
  `State` varchar(60) DEFAULT NULL,
  `Country` varchar(60) DEFAULT NULL,
  `Verified` tinyint NOT NULL,
  `Profile_Image` text,
  PRIMARY KEY (`Customer_ID`,`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (38,'ashmita.promech@gmail.com','Ashmita','Gorkhali','$2b$10$OAeRE7fErccwTV6/JXnPMOFosReZwPo8W1YBwoSTf/YBAb/iNODgu',98498260088,NULL,NULL,NULL,NULL,1,'{\"fileName\":\"Picture1.png\",\"filePath\":\"/profileImage/Picture1.png\"}'),(39,'aman.promech@gmail.com','Aman','Sainju','$2b$10$nwpYRuvZuzifJZ0wi8DjheA9dSDitU1Rutegxdn4yDupVG.aAUlqK',9843645385,NULL,NULL,NULL,NULL,1,NULL);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fabrication_services`
--

DROP TABLE IF EXISTS `fabrication_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fabrication_services` (
  `Service_ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  PRIMARY KEY (`Service_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fabrication_services`
--

LOCK TABLES `fabrication_services` WRITE;
/*!40000 ALTER TABLE `fabrication_services` DISABLE KEYS */;
INSERT INTO `fabrication_services` VALUES (1,'3D Printing'),(2,'CNC Carving'),(3,'Laser Cutting');
/*!40000 ALTER TABLE `fabrication_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feature_project`
--

DROP TABLE IF EXISTS `feature_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feature_project` (
  `Project_ID` int NOT NULL AUTO_INCREMENT,
  `Customer_ID` varchar(200) DEFAULT NULL,
  `Email` varchar(100) NOT NULL,
  `Title` varchar(400) NOT NULL,
  `Date` varchar(45) NOT NULL,
  `Fabrication_Process` varchar(45) NOT NULL,
  `Material` varchar(45) NOT NULL,
  `Summary` varchar(500) NOT NULL,
  `Description` varchar(1000) NOT NULL,
  `Files` text NOT NULL,
  `Image` text NOT NULL,
  PRIMARY KEY (`Project_ID`),
  KEY `Customer_ID` (`Customer_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feature_project`
--

LOCK TABLES `feature_project` WRITE;
/*!40000 ALTER TABLE `feature_project` DISABLE KEYS */;
INSERT INTO `feature_project` VALUES (61,'38','ashmita.promech@gmail.com','Reusable Face Shield','2021-4-12','CNC, Injection Molding, Laser cutting, sewing','Polypropylene (PP), PVC, PET, Elastic','<p>Made in Nepal for COVID-19 response:</p><p>•Standard</p>','<p>COVID-19 spreads mainly from person to person through respiratory droplets. Respiratory droplets travel into the air when you cough, sneeze, talk, shout, or sing. These droplets can then land in the mouths or noses of people who are near you or they may breathe these droplets in.</p><p>Masks are a simple barrier to help prevent your respiratory droplets from reaching others. Studies show that masks reduce the spray of droplets when worn over the nose and mouth</p>','[{\"fileName\":\"Picture1.png\",\"filePath\":\"/projectUploads/Picture1.png\"},{\"fileName\":\"Shield.jpg\",\"filePath\":\"/projectUploads/Shield.jpg\"},{\"fileName\":\"faceshield.jpg\",\"filePath\":\"/projectUploads/faceshield.jpg\"}]','{\"fileName\":\"d.png\",\"filePath\":\"/projectMainPhoto/d.png\"}');
/*!40000 ALTER TABLE `feature_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location` (
  `Manufacturer_ID` int NOT NULL,
  `Latitude` varchar(100) NOT NULL,
  `Longitude` varchar(100) NOT NULL,
  PRIMARY KEY (`Manufacturer_ID`),
  KEY `Manufacturer_ID` (`Manufacturer_ID`),
  CONSTRAINT `Manufacturer_idfk` FOREIGN KEY (`Manufacturer_ID`) REFERENCES `manufacturer` (`Manufacturer_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (73,'85.37765209999999','27.673218499999997'),(74,'85.32158869999999','27.685737399999997');
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manufacturer`
--

DROP TABLE IF EXISTS `manufacturer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manufacturer` (
  `Manufacturer_ID` int NOT NULL AUTO_INCREMENT,
  `Email` varchar(100) NOT NULL,
  `Company_Name` varchar(60) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Contact_Person` varchar(60) NOT NULL,
  `Phone_Number` bigint NOT NULL,
  `Document_Path` varchar(100) NOT NULL,
  `Website` varchar(100) DEFAULT NULL,
  `Company_Type` varchar(60) NOT NULL,
  `Ward` int DEFAULT NULL,
  `Address` text,
  `State` varchar(45) DEFAULT NULL,
  `Country` varchar(45) DEFAULT NULL,
  `Logo` text,
  `Brief_Description` text,
  `Other_Services` text,
  `Additional_Details` text,
  PRIMARY KEY (`Manufacturer_ID`,`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manufacturer`
--

LOCK TABLES `manufacturer` WRITE;
/*!40000 ALTER TABLE `manufacturer` DISABLE KEYS */;
INSERT INTO `manufacturer` VALUES (73,'zener@gmail.com','Zener Technologies','$2b$10$/B5RozuumrigArjHClV4/.fCSjAF8vGu9MBbVV8MGwaE7Y1D5vnnq','Ram Chandra Thapa',9815401344,'{\"fileName\":\"Capture.PNG\",\"filePath\":\"/documents/Capture.PNG\"}','https://www.zenertech.com/','Registered Company',NULL,'Kupondole,Lalitpur',NULL,NULL,'{\"fileName\":\"zener.png\",\"filePath\":\"/logo/zener.png\"}','3D Design and Additive manufacturing Tech Company, inspired by the fourth Industrial Revolution.\n\nIt uses the range of 3D printers and desktop manufacturing tools to offer prototyping and Just-in-time (JIT) manufacturing services to the local and international customers.','[{\"serviceName\":\"Vaccum Forming\",\"materials\":[\"Plastic\",\"PLA\"]}]','3D Design and Additive manufacturing Tech Company, inspired by the fourth Industrial Revolution.\n\nIt uses the range of 3D printers and desktop manufacturing tools to offer prototyping and Just-in-time (JIT) manufacturing services to the local and international customers.\n\n3D printing enabled manufacturing increases efficiency and reliability by reducing labour, tools and material cost. It’s a clean production technology capable of making complex objects through additive processes and then taking it to conventional mass manufacturing processes with ease.\n\nEstablished in 2016 Zener Technologies took pioneering steps to commercialize 3D Printers and 3D Printing Services to the public, thus making the boons of additive manufacturing accessible to everyone in Nepal. In 2018, Zener Technologies started the commercial application of 3D Scanning and Reverse Engineering in Nepal. With growing market needs, we are determined to uplift the technology sector of Nepal by introducing new and advanced tools/services.'),(74,'promech@gmail.com','Pro-Mech Minds','$2b$10$VCgwtly8a8zgCUIRKHzfeulcUkkTS8cXw.RK.bkJ9sIHBDuRc9iTS','Nilesh Pradhan',15261170,'{\"fileName\":\"profile.png\",\"filePath\":\"/documents/profile.png\"}','https://www.promechminds.com/','Registered Company',NULL,'Jwagal,Lalitpur',NULL,NULL,'{\"fileName\":\"mech.png\",\"filePath\":\"/logo/mech.png\"}','An example of Deep Learning implementations with very basic explanations for mechanical engineers who are beginners or enthusiasts in the field of data science and artificial intelligence.','','An example of Deep Learning implementations with very basic explanations for mechanical engineers who are beginners or enthusiasts in the field of data science and artificial intelligence.');
/*!40000 ALTER TABLE `manufacturer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materials`
--

DROP TABLE IF EXISTS `materials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materials` (
  `Material_ID` int NOT NULL AUTO_INCREMENT,
  `Material_Name` varchar(100) NOT NULL,
  `Service_ID` int NOT NULL,
  PRIMARY KEY (`Material_ID`,`Service_ID`),
  KEY `Fabrication_Service_idx` (`Service_ID`) /*!80000 INVISIBLE */,
  CONSTRAINT `Fabrication_Service` FOREIGN KEY (`Service_ID`) REFERENCES `fabrication_services` (`Service_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materials`
--

LOCK TABLES `materials` WRITE;
/*!40000 ALTER TABLE `materials` DISABLE KEYS */;
INSERT INTO `materials` VALUES (1,'WPC Board (Wood Plastic Composite)',2),(2,'MDF',2),(3,'Playwood',2),(4,'Styrofoam',2),(5,'APC Board',2),(6,'Thick wood',2),(7,'Nylon sheet',2),(8,'PLA',1),(9,'ABS',1),(10,'PETG',1),(11,'TPU Flexible',1),(12,'Resin SLA: Standard, Tough, Castable',1),(13,'MDF',3),(14,'HDF Harboard',3),(15,'Paper',3),(16,'Forex/PVC Foamboard',3),(17,'Acryllic',3),(18,'Textile/synthetic',3),(19,'Polycarbonate sheet',3),(20,'PET/PVC sheet',3);
/*!40000 ALTER TABLE `materials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_specification`
--

DROP TABLE IF EXISTS `order_specification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_specification` (
  `Order_ID` int NOT NULL AUTO_INCREMENT,
  `Order_Type` varchar(100) NOT NULL,
  `Model_Name` varchar(100) NOT NULL,
  `Fabrication_Service` text NOT NULL,
  `Material` varchar(100) NOT NULL,
  `Thickness` varchar(45) NOT NULL,
  `Quantity` varchar(45) NOT NULL,
  `Model_Path` text NOT NULL,
  `Customer_ID` int NOT NULL,
  `Manufacturer_ID` int NOT NULL,
  `Status` varchar(100) NOT NULL,
  `Amount` int DEFAULT NULL,
  `Date` varchar(45) NOT NULL,
  PRIMARY KEY (`Order_ID`,`Model_Name`,`Customer_ID`),
  KEY `Customer_ID` (`Customer_ID`) /*!80000 INVISIBLE */,
  KEY `Manufacturer_ID_fk_idx` (`Manufacturer_ID`),
  CONSTRAINT `Customer_ID_fk` FOREIGN KEY (`Customer_ID`) REFERENCES `customer` (`Customer_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Manufacturer_ID_fk` FOREIGN KEY (`Manufacturer_ID`) REFERENCES `manufacturer` (`Manufacturer_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_specification`
--

LOCK TABLES `order_specification` WRITE;
/*!40000 ALTER TABLE `order_specification` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_specification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_image`
--

DROP TABLE IF EXISTS `project_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_image` (
  `Image_Name` varchar(100) NOT NULL,
  `Image_Path` varchar(100) NOT NULL,
  `Project_ID` int NOT NULL,
  PRIMARY KEY (`Image_Name`,`Project_ID`),
  KEY `Project_ID_idx` (`Project_ID`),
  CONSTRAINT `Project_ID` FOREIGN KEY (`Project_ID`) REFERENCES `feature_project` (`Project_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_image`
--

LOCK TABLES `project_image` WRITE;
/*!40000 ALTER TABLE `project_image` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `Service_ID` int NOT NULL,
  `Manufacturer_ID` int NOT NULL,
  `Material_Name` text,
  `Cost_Unit` varchar(45) DEFAULT NULL,
  `Unit_Rate` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Service_ID`,`Manufacturer_ID`),
  KEY `fabricationservice_id` (`Service_ID`),
  KEY `company_fabricationservice_ibfk_1` (`Manufacturer_ID`) /*!80000 INVISIBLE */,
  CONSTRAINT `company_fabricationservice_ibfk_1` FOREIGN KEY (`Manufacturer_ID`) REFERENCES `manufacturer` (`Manufacturer_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `company_fabricationservice_ibfk_2` FOREIGN KEY (`Service_ID`) REFERENCES `fabrication_services` (`Service_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,73,'[{\"selectedMaterial\":{\"Material_ID\":8,\"Material_Name\":\"PLA\",\"Service_ID\":1},\"thickness\":{\"value\":1,\"label\":\"5 mm\"},\"costUnit\":{\"value\":1,\"label\":\"Gram\"},\"unitRate\":\"10\"}]','1','1'),(1,74,'[{\"selectedMaterial\":{\"Material_ID\":8,\"Material_Name\":\"PLA\",\"Service_ID\":1},\"thickness\":{\"value\":1,\"label\":\"5 mm\"},\"costUnit\":{\"value\":1,\"label\":\"Gram\"},\"unitRate\":\"10\"},{\"selectedMaterial\":{\"Material_ID\":9,\"Material_Name\":\"ABS\",\"Service_ID\":1},\"thickness\":{\"value\":1,\"label\":\"5 mm\"},\"costUnit\":{\"value\":1,\"label\":\"Gram\"},\"unitRate\":\"10\"}]','1','1'),(2,73,'[{\"selectedMaterial\":{\"Material_ID\":1,\"Material_Name\":\"WPC Board (Wood Plastic Composite)\",\"Service_ID\":2},\"thickness\":{\"value\":1,\"label\":\"5 mm\"},\"costUnit\":{\"value\":1,\"label\":\"Gram\"},\"unitRate\":\"10\"}]','1','1');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'fabhubsdb'
--

--
-- Dumping routines for database 'fabhubsdb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-19 17:35:43
