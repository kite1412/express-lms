-- CreateTable
CREATE TABLE `assignments` (
    `assignment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `fk_assignments_course_id` INTEGER NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `deadline` DATETIME(0) NOT NULL,
    `file_url` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,

    INDEX `fk_course_id_idx`(`fk_assignments_course_id`),
    PRIMARY KEY (`assignment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attendance` (
    `attendance_id` INTEGER NOT NULL AUTO_INCREMENT,
    `fk_attendances_course_id` INTEGER NOT NULL,
    `fk_attendances_student_id` INTEGER NOT NULL,
    `status` ENUM('present', 'permission', 'alpha') NOT NULL,
    `date` DATE NOT NULL,
    `deleted_at` TIMESTAMP(0) NULL,

    INDEX `course_id_idx`(`fk_attendances_course_id`),
    INDEX `student_id_idx`(`fk_attendances_student_id`),
    PRIMARY KEY (`attendance_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `course_members` (
    `member_id` INTEGER NOT NULL AUTO_INCREMENT,
    `fk_course_members_course_id` INTEGER NOT NULL,
    `fk_course_members_user_id` INTEGER NOT NULL,
    `role` ENUM('teacher', 'student') NOT NULL,
    `joined_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `course_id_idx`(`fk_course_members_course_id`),
    INDEX `user_id_idx`(`fk_course_members_user_id`),
    PRIMARY KEY (`member_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `courses` (
    `course_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `description` TEXT NULL,
    `code` VARCHAR(7) NOT NULL,
    `fk_courses_teacher_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `course_img` VARCHAR(255) NULL,
    `deleted_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `code_UNIQUE`(`code`),
    INDEX `teacher_id_idx`(`fk_courses_teacher_id`),
    PRIMARY KEY (`course_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grades` (
    `grades_id` INTEGER NOT NULL AUTO_INCREMENT,
    `fk_grades_submission_id` INTEGER NULL,
    `fk_grades_teacher_id` INTEGER NULL,
    `score` DECIMAL(10, 0) NULL,
    `feedback` TEXT NULL,
    `graded_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `submission_id_idx`(`fk_grades_submission_id`),
    INDEX `teacher_id_idx`(`fk_grades_teacher_id`),
    PRIMARY KEY (`grades_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `submissions` (
    `submission_id` INTEGER NOT NULL AUTO_INCREMENT,
    `fk_submissions_assignment_id` INTEGER NOT NULL,
    `fk_submissions_student_id` INTEGER NULL,
    `file_url` VARCHAR(255) NOT NULL,
    `submitted_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `assignment_id_idx`(`fk_submissions_assignment_id`),
    INDEX `student_id_idx`(`fk_submissions_student_id`),
    PRIMARY KEY (`submission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('admin', 'teacher', 'student') NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `profile_picture` VARCHAR(255) NULL,
    `deleted_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `email_UNIQUE`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `assignments` ADD CONSTRAINT `fk_assignments_course_id` FOREIGN KEY (`fk_assignments_course_id`) REFERENCES `courses`(`course_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `attendance` ADD CONSTRAINT `fk_attendances_id` FOREIGN KEY (`fk_attendances_course_id`) REFERENCES `courses`(`course_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance` ADD CONSTRAINT `fk_attendances_student_id` FOREIGN KEY (`fk_attendances_student_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `course_members` ADD CONSTRAINT `fk_course_members_course_id` FOREIGN KEY (`fk_course_members_course_id`) REFERENCES `courses`(`course_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `course_members` ADD CONSTRAINT `fk_course_members_user_id` FOREIGN KEY (`fk_course_members_user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `courses` ADD CONSTRAINT `fk_courses_teacher_id` FOREIGN KEY (`fk_courses_teacher_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `grades` ADD CONSTRAINT `fk_grades_submission_id` FOREIGN KEY (`fk_grades_submission_id`) REFERENCES `submissions`(`submission_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `grades` ADD CONSTRAINT `fk_grades_teacher_id` FOREIGN KEY (`fk_grades_teacher_id`) REFERENCES `users`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `submissions` ADD CONSTRAINT `fk_submissions_assignment_id` FOREIGN KEY (`fk_submissions_assignment_id`) REFERENCES `assignments`(`assignment_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `submissions` ADD CONSTRAINT `fk_submissions_student_id` FOREIGN KEY (`fk_submissions_student_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
