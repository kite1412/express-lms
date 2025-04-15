import { body, param, validationResult } from "express-validator";
import _ from "lodash";

export const validateCreateCourse = [
  body("name")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("description")
    .optional({ nullable: true })
    .isString()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters if provided"),
  // body("teacher_id").isInt().withMessage("Teacher ID must be a number"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    req.body = _.pick(req.body, ["name", "description", "teacher_id"]);

    next();
  },
];

export const validateUpdateCourse = [
  body("name")
    .optional()
    .isString()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters if provided"),

  body("description")
    .optional({ nullable: true })
    .isString()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters if provided"),

  body("course_img")
    .optional({ nullable: true })
    .isURL()
    .withMessage("Course image must be a valid URL if provided"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    req.body = _.pick(req.body, ["name", "description", "course_img"]);

    next();
  },
];

export const validateJoinCourse = [
  param("code")
    .isString()
    .isLength({ min: 7, max: 7 })
    .withMessage("Course code must be 7 characters"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];

export const validateLoginUser = [
  body("email").isEmail().withMessage("Email must be a valid email address"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    req.body = _.pick(req.body, ["email", "password"]);

    next();
  },
];

export const validateCreateGrade = [
  body("submission_id").isInt().withMessage("Submission ID must be a number"),

  body("score")
    .isInt({ min: 0, max: 100 })
    .withMessage("Score must be a number between 0 and 100"),

  body("feedback")
    .optional({ nullable: true })
    .isString()
    .isLength({ min: 3 })
    .withMessage("Feedback must be at least 3 characters if provided"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    req.body = _.pick(req.body, [
      "teacher_id",
      "submission_id",
      "score",
      "feedback",
    ]);

    next();
  },
];

export const validateUpdateGrade = [
  param("gradeId").isInt().withMessage("Grade ID must be a number"),

  body("score")
    .isInt({ min: 0, max: 100 })
    .withMessage("Score must be a number between 0 and 100"),

  body("feedback")
    .optional({ nullable: true })
    .isString()
    .isLength({ min: 3 })
    .withMessage("Feedback must be at least 3 characters if provided"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    req.body = _.pick(req.body, ["teacher_id", "score", "feedback"]);
    next();
  },
];
