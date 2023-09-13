DROP TABLE IF EXISTS `department`;
CREATE TABLE `department` (
    `department_id` INT AUTO_INCREMENT PRIMARY KEY,
    `department_name` VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO `department` (`department_name`) VALUES ('Computer Science'), ('I.T.'), ('E.X.T.C.'), ('Electrical'), ('Mechanical');

DROP TABLE IF EXISTS `students`;
CREATE TABLE `students` (
  `roll_no` VARCHAR(255) PRIMARY KEY,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `semester` INT NOT NULL,
  `department_id` INT NOT NULL,
  `sgpi` JSON NOT NULL,
  `cgpi` JSON NOT NULL,
  FOREIGN KEY (`department_id`) REFERENCES `department`(`department_id`)
);

DROP TABLE IF EXISTS `teachers`;
CREATE TABLE `teachers` (
  `roll_no` VARCHAR(255) PRIMARY KEY,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `department_id` INT NOT NULL,
  FOREIGN KEY (`department_id`) REFERENCES `department`(`department_id`)
);