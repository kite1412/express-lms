-- CreateTable
CREATE TABLE `materials` (
    `material_id` INTEGER NOT NULL AUTO_INCREMENT,
    `fk_materials_course_id` INTEGER NOT NULL,
    `fk_materials_teacher_id` INTEGER NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `file_url` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,

    INDEX `fk_materials_course_idx`(`fk_materials_course_id`),
    INDEX `fk_teacher_id_idx`(`fk_materials_teacher_id`),
    PRIMARY KEY (`material_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `materials` ADD CONSTRAINT `fk_materials_course_id` FOREIGN KEY (`fk_materials_course_id`) REFERENCES `courses`(`course_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `materials` ADD CONSTRAINT `fk_materials_teacher_id` FOREIGN KEY (`fk_materials_teacher_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
