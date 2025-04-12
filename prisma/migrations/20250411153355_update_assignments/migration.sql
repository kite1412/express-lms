/*
  Warnings:

  - Added the required column `created_by` to the `assignments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `assignments` ADD COLUMN `created_by` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `fk_assignments_user_id_idx` ON `assignments`(`created_by`);

-- AddForeignKey
ALTER TABLE `assignments` ADD CONSTRAINT `fk_assignments_user_id` FOREIGN KEY (`created_by`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
