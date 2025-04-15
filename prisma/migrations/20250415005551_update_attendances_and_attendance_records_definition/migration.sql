/*
  Warnings:

  - Made the column `fk_attendance_records_student_id` on table `attendance_records` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fk_attendance_records_attendances_id` on table `attendance_records` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `notes` to the `attendances` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `attendance_records` DROP FOREIGN KEY `attendance_records_ibfk_1`;

-- DropForeignKey
ALTER TABLE `attendance_records` DROP FOREIGN KEY `attendance_records_ibfk_2`;

-- AlterTable
ALTER TABLE `attendance_records` MODIFY `fk_attendance_records_student_id` INTEGER NOT NULL,
    MODIFY `fk_attendance_records_attendances_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `attendances` ADD COLUMN `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `notes` VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE `attendance_records` ADD CONSTRAINT `attendance_records_ibfk_1` FOREIGN KEY (`fk_attendance_records_student_id`) REFERENCES `users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `attendance_records` ADD CONSTRAINT `attendance_records_ibfk_2` FOREIGN KEY (`fk_attendance_records_attendances_id`) REFERENCES `attendances`(`attendance_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
