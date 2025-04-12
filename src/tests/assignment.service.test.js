import { expect, test } from "vitest";
import { createAssignmentService, getAssignmentsByCourseIdService } from "../services/assignment.service";

// attempt on empty assignments in db.
test("get assignments by course id, expect empty", async () => {
  const res = await getAssignmentsByCourseIdService(1);

  expect(res.length).toBe(0);
});

test("create assignment", async () => {
  const res = await createAssignmentService({
    courseId: 1,
    title: "OOP Basic",
    description: "Do this assignment, onegai",
    deadline: new Date("2025-04-12T10:00:00Z")
  });

  expect(res).toBeDefined();
});