/*
  Warnings:

  - You are about to drop the column `created_by` on the `assignments` table. All the data in the column will be lost.
  - You are about to drop the `attendance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `assignments` DROP FOREIGN KEY `fk_assignments_user_id`;

-- DropForeignKey
ALTER TABLE `attendance` DROP FOREIGN KEY `fk_attendances_id`;

-- DropForeignKey
ALTER TABLE `attendance` DROP FOREIGN KEY `fk_attendances_student_id`;

-- DropIndex
DROP INDEX `fk_assignments_user_id_idx` ON `assignments`;

-- AlterTable
ALTER TABLE `assignments` DROP COLUMN `created_by`;

-- DropTable
DROP TABLE `attendance`;

-- CreateTable
CREATE TABLE `attendance_records` (
    `attendance_record_id` INTEGER NOT NULL AUTO_INCREMENT,
    `fk_attendance_records_student_id` INTEGER NULL,
    `fk_attendance_records_attendances_id` INTEGER NULL,
    `status` ENUM('absent', 'present', 'excused', 'late') NOT NULL,
    `fill_date` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_attendance_records_attendances_id`(`fk_attendance_records_attendances_id`),
    INDEX `fk_attendance_records_student_id`(`fk_attendance_records_student_id`),
    PRIMARY KEY (`attendance_record_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attendances` (
    `attendance_id` INTEGER NOT NULL AUTO_INCREMENT,
    `fk_attendances_course_id` INTEGER NOT NULL,
    `deleted_at` TIMESTAMP(0) NULL,
    `deadline` DATE NULL,

    INDEX `course_id_idx`(`fk_attendances_course_id`),
    PRIMARY KEY (`attendance_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `attendance_records` ADD CONSTRAINT `attendance_records_ibfk_1` FOREIGN KEY (`fk_attendance_records_student_id`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `attendance_records` ADD CONSTRAINT `attendance_records_ibfk_2` FOREIGN KEY (`fk_attendance_records_attendances_id`) REFERENCES `attendances`(`attendance_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `attendances` ADD CONSTRAINT `fk_attendances_id` FOREIGN KEY (`fk_attendances_course_id`) REFERENCES `courses`(`course_id`) ON DELETE CASCADE ON UPDATE CASCADE;
