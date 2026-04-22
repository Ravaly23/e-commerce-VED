-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: vedcommerce
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',3,'add_permission'),(6,'Can change permission',3,'change_permission'),(7,'Can delete permission',3,'delete_permission'),(8,'Can view permission',3,'view_permission'),(9,'Can add group',2,'add_group'),(10,'Can change group',2,'change_group'),(11,'Can delete group',2,'delete_group'),(12,'Can view group',2,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add article',7,'add_article'),(26,'Can change article',7,'change_article'),(27,'Can delete article',7,'delete_article'),(28,'Can view article',7,'view_article'),(29,'Can add facture',11,'add_facture'),(30,'Can change facture',11,'change_facture'),(31,'Can delete facture',11,'delete_facture'),(32,'Can view facture',11,'view_facture'),(33,'Can add client',8,'add_client'),(34,'Can change client',8,'change_client'),(35,'Can delete client',8,'delete_client'),(36,'Can view client',8,'view_client'),(37,'Can add commande',9,'add_commande'),(38,'Can change commande',9,'change_commande'),(39,'Can delete commande',9,'delete_commande'),(40,'Can view commande',9,'view_commande'),(41,'Can add commentaire',10,'add_commentaire'),(42,'Can change commentaire',10,'change_commentaire'),(43,'Can delete commentaire',10,'delete_commentaire'),(44,'Can view commentaire',10,'view_commentaire'),(45,'Can add fichier',12,'add_fichier'),(46,'Can change fichier',12,'change_fichier'),(47,'Can delete fichier',12,'delete_fichier'),(48,'Can view fichier',12,'view_fichier'),(49,'Can add vendeur',13,'add_vendeur'),(50,'Can change vendeur',13,'change_vendeur'),(51,'Can delete vendeur',13,'delete_vendeur'),(52,'Can view vendeur',13,'view_vendeur');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$1200000$uQU6zV7nKxIRxELMx1GSpS$cQZ1+4Ifei5DGxChK5a7CaeppaxgUT2P1cYN7vMVs80=',NULL,0,'jean_dupont','','','jean.dupont@email.com',0,1,'2026-04-16 11:09:34.251907'),(2,'pbkdf2_sha256$1200000$FSaFUwJ6M9br2MJKbg9G0x$RoV8h6a0AcJHwUXzc/hCDgZ71YDPqDxyAWDClLzz6iE=',NULL,0,'Frederic Eizrah','','','eren@email.com',0,1,'2026-04-16 11:10:24.257429'),(3,'pbkdf2_sha256$1200000$TVAxICXf1RJvHxpq5XG8Jg$0zUpAYrS3EMNELVF6LZ84I2qdLWrtxCAEwv7nhnXsbA=',NULL,0,'FredericEizrah','','','eren@email.com',0,1,'2026-04-16 11:10:40.596342');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(2,'auth','group'),(3,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(6,'sessions','session'),(7,'VedBackend','article'),(8,'VedBackend','client'),(9,'VedBackend','commande'),(10,'VedBackend','commentaire'),(11,'VedBackend','facture'),(12,'VedBackend','fichier'),(13,'VedBackend','vendeur');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2026-04-16 07:54:45.205249'),(2,'auth','0001_initial','2026-04-16 07:54:45.833698'),(3,'VedBackend','0001_initial','2026-04-16 07:54:46.587341'),(4,'admin','0001_initial','2026-04-16 07:54:46.764225'),(5,'admin','0002_logentry_remove_auto_add','2026-04-16 07:54:46.774867'),(6,'admin','0003_logentry_add_action_flag_choices','2026-04-16 07:54:46.785441'),(7,'contenttypes','0002_remove_content_type_name','2026-04-16 07:54:46.912464'),(8,'auth','0002_alter_permission_name_max_length','2026-04-16 07:54:46.996042'),(9,'auth','0003_alter_user_email_max_length','2026-04-16 07:54:47.041306'),(10,'auth','0004_alter_user_username_opts','2026-04-16 07:54:47.053333'),(11,'auth','0005_alter_user_last_login_null','2026-04-16 07:54:47.135126'),(12,'auth','0006_require_contenttypes_0002','2026-04-16 07:54:47.137637'),(13,'auth','0007_alter_validators_add_error_messages','2026-04-16 07:54:47.149004'),(14,'auth','0008_alter_user_username_max_length','2026-04-16 07:54:47.234069'),(15,'auth','0009_alter_user_last_name_max_length','2026-04-16 07:54:47.332312'),(16,'auth','0010_alter_group_name_max_length','2026-04-16 07:54:47.382200'),(17,'auth','0011_update_proxy_permissions','2026-04-16 07:54:47.398828'),(18,'auth','0012_alter_user_first_name_max_length','2026-04-16 07:54:47.486866'),(19,'sessions','0001_initial','2026-04-16 07:54:47.531408');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vedbackend_article`
--

DROP TABLE IF EXISTS `vedbackend_article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vedbackend_article` (
  `id_article` varchar(100) NOT NULL,
  `nom` varchar(200) NOT NULL,
  `description` longtext,
  `prix` decimal(10,2) NOT NULL,
  `note` double NOT NULL,
  `id_vendeur_id` varchar(100) NOT NULL,
  PRIMARY KEY (`id_article`),
  KEY `VedBackend_article_id_vendeur_id_8cfda760_fk_VedBacken` (`id_vendeur_id`),
  CONSTRAINT `VedBackend_article_id_vendeur_id_8cfda760_fk_VedBacken` FOREIGN KEY (`id_vendeur_id`) REFERENCES `vedbackend_vendeur` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vedbackend_article`
--

LOCK TABLES `vedbackend_article` WRITE;
/*!40000 ALTER TABLE `vedbackend_article` DISABLE KEYS */;
/*!40000 ALTER TABLE `vedbackend_article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vedbackend_client`
--

DROP TABLE IF EXISTS `vedbackend_client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vedbackend_client` (
  `id` varchar(100) NOT NULL,
  `nom_prenom` varchar(100) NOT NULL,
  `numero_telephone` varchar(20) DEFAULT NULL,
  `adresse` longtext,
  `photo` varchar(100) DEFAULT NULL,
  `num_cin` varchar(20) DEFAULT NULL,
  `date_naissance` date NOT NULL,
  `genre` varchar(10) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `VedBackend_client_user_id_ee99579d_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vedbackend_client`
--

LOCK TABLES `vedbackend_client` WRITE;
/*!40000 ALTER TABLE `vedbackend_client` DISABLE KEYS */;
INSERT INTO `vedbackend_client` VALUES ('Cleren yeager00001','eren yeager','0601020304','10 rue de la Paix, Paris','',NULL,'1990-05-15','homme',2),('Cleren yeager00002','eren yeager','0601020304','10 rue de la Paix, Paris','',NULL,'1990-05-15','homme',3),('ClJean Dupont00001','Jean Dupont','0601020304','10 rue de la Paix, Paris','',NULL,'1990-05-15','homme',1);
/*!40000 ALTER TABLE `vedbackend_client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vedbackend_commande`
--

DROP TABLE IF EXISTS `vedbackend_commande`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vedbackend_commande` (
  `id_commande` varchar(100) NOT NULL,
  `date_commande` datetime(6) NOT NULL,
  `quantite` int unsigned NOT NULL,
  `prix_total` decimal(10,2) NOT NULL,
  `id_article_id` varchar(100) NOT NULL,
  `id_client_id` varchar(100) NOT NULL,
  PRIMARY KEY (`id_commande`),
  KEY `VedBackend_commande_id_article_id_3462274d_fk_VedBacken` (`id_article_id`),
  KEY `VedBackend_commande_id_client_id_347f747b_fk_VedBacken` (`id_client_id`),
  CONSTRAINT `VedBackend_commande_id_article_id_3462274d_fk_VedBacken` FOREIGN KEY (`id_article_id`) REFERENCES `vedbackend_article` (`id_article`),
  CONSTRAINT `VedBackend_commande_id_client_id_347f747b_fk_VedBacken` FOREIGN KEY (`id_client_id`) REFERENCES `vedbackend_client` (`id`),
  CONSTRAINT `vedbackend_commande_chk_1` CHECK ((`quantite` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vedbackend_commande`
--

LOCK TABLES `vedbackend_commande` WRITE;
/*!40000 ALTER TABLE `vedbackend_commande` DISABLE KEYS */;
/*!40000 ALTER TABLE `vedbackend_commande` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vedbackend_commentaire`
--

DROP TABLE IF EXISTS `vedbackend_commentaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vedbackend_commentaire` (
  `id_commentaire` varchar(100) NOT NULL,
  `description` longtext,
  `id_article_id` varchar(100) NOT NULL,
  `id_client_id` varchar(100) NOT NULL,
  PRIMARY KEY (`id_commentaire`),
  KEY `VedBackend_commentai_id_article_id_296e40ba_fk_VedBacken` (`id_article_id`),
  KEY `VedBackend_commentai_id_client_id_b78771f6_fk_VedBacken` (`id_client_id`),
  CONSTRAINT `VedBackend_commentai_id_article_id_296e40ba_fk_VedBacken` FOREIGN KEY (`id_article_id`) REFERENCES `vedbackend_article` (`id_article`),
  CONSTRAINT `VedBackend_commentai_id_client_id_b78771f6_fk_VedBacken` FOREIGN KEY (`id_client_id`) REFERENCES `vedbackend_client` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vedbackend_commentaire`
--

LOCK TABLES `vedbackend_commentaire` WRITE;
/*!40000 ALTER TABLE `vedbackend_commentaire` DISABLE KEYS */;
/*!40000 ALTER TABLE `vedbackend_commentaire` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vedbackend_facture`
--

DROP TABLE IF EXISTS `vedbackend_facture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vedbackend_facture` (
  `id_facture` varchar(100) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id_facture`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vedbackend_facture`
--

LOCK TABLES `vedbackend_facture` WRITE;
/*!40000 ALTER TABLE `vedbackend_facture` DISABLE KEYS */;
/*!40000 ALTER TABLE `vedbackend_facture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vedbackend_fichier`
--

DROP TABLE IF EXISTS `vedbackend_fichier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vedbackend_fichier` (
  `id_fichier` varchar(100) NOT NULL,
  `url` varchar(200) NOT NULL,
  `type` varchar(50) NOT NULL,
  `taille` decimal(10,2) NOT NULL,
  `id_article_id` varchar(100) NOT NULL,
  PRIMARY KEY (`id_fichier`),
  KEY `VedBackend_fichier_id_article_id_c4a8943d_fk_VedBacken` (`id_article_id`),
  CONSTRAINT `VedBackend_fichier_id_article_id_c4a8943d_fk_VedBacken` FOREIGN KEY (`id_article_id`) REFERENCES `vedbackend_article` (`id_article`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vedbackend_fichier`
--

LOCK TABLES `vedbackend_fichier` WRITE;
/*!40000 ALTER TABLE `vedbackend_fichier` DISABLE KEYS */;
/*!40000 ALTER TABLE `vedbackend_fichier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vedbackend_vendeur`
--

DROP TABLE IF EXISTS `vedbackend_vendeur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vedbackend_vendeur` (
  `id` varchar(100) NOT NULL,
  `nom_prenom` varchar(100) NOT NULL,
  `numero_telephone` varchar(20) DEFAULT NULL,
  `adresse` longtext,
  `photo` varchar(100) DEFAULT NULL,
  `num_cin` varchar(20) DEFAULT NULL,
  `date_naissance` date NOT NULL,
  `genre` varchar(10) NOT NULL,
  `etat` varchar(50) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `VedBackend_vendeur_user_id_c2a717d5_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vedbackend_vendeur`
--

LOCK TABLES `vedbackend_vendeur` WRITE;
/*!40000 ALTER TABLE `vedbackend_vendeur` DISABLE KEYS */;
/*!40000 ALTER TABLE `vedbackend_vendeur` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-22  9:46:02
