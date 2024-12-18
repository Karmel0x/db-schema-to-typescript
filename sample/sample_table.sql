/*
 SQL Data Transfer
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sample_table
-- ----------------------------
DROP TABLE IF EXISTS `sample_table`;
CREATE TABLE `sample_table`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `sample_column1` int(11) NULL DEFAULT NULL COMMENT 'column comment 1',
  `sample_column2` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT 'default value 1',
  `tinyint_column_1` tinyint(4) NULL DEFAULT NULL,
  `smallint_column_1` smallint(6) NULL DEFAULT NULL,
  `mediumint_column_1` mediumint(9) NULL DEFAULT NULL,
  `int_column_1` int(11) NULL DEFAULT NULL,
  `bigint_column_1` bigint(20) NULL DEFAULT NULL,
  `decimal_column_1` decimal(10, 2) NULL DEFAULT NULL,
  `double_column_1` double NULL DEFAULT NULL,
  `float_column_1` float NULL DEFAULT NULL,
  `tinytext_column_1` tinytext CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL,
  `mediumtext_column_1` mediumtext CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL,
  `text_column_1` text CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL,
  `longtext_column_1` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL,
  `char_column_1` char(1) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL,
  `varchar_column_1` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci NULL DEFAULT NULL,
  `json_column_1` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL CHECK (json_valid(`json_column_1`)),
  `date_column_1` date NULL DEFAULT NULL,
  `datetime_column_1` datetime NULL DEFAULT current_timestamp(),
  `time_column_1` time NULL DEFAULT NULL,
  `timestamp_column_1` timestamp NULL DEFAULT NULL,
  `year_column_1` year NULL DEFAULT NULL,
  `bit_column_1` bit(1) NULL DEFAULT NULL,
  `binary_column_1` binary(1) NULL DEFAULT NULL,
  `tinyblob_column_1` tinyblob NULL DEFAULT NULL,
  `mediumblob_column_1` mediumblob NULL DEFAULT NULL,
  `blob_column_1` blob NULL DEFAULT NULL,
  `longblob_column_1` longblob NULL DEFAULT NULL,
  `point_column_1` point NULL,
  `multipoint_column_1` multipoint NULL,
  `linestring_column_1` linestring NULL,
  `multilinestring_column_1` multilinestring NULL,
  `polygon_column_1` polygon NULL,
  `multipolygon_column_1` multipolygon NULL,
  `geometry_column_1` geometry NULL,
  `geometrycollection_column_1` geometrycollection NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_unicode_ci COMMENT = 'table comment 1' ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
