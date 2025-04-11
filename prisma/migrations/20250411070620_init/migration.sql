/*
  Warnings:

  - The primary key for the `course_members` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `member_id` on the `course_members` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `course_members` DROP PRIMARY KEY,
    DROP COLUMN `member_id`,
    MODIFY `role` ENUM('admin', 'teacher', 'student') NOT NULL,
    ADD PRIMARY KEY (`fk_course_members_course_id`, `fk_course_members_user_id`);
