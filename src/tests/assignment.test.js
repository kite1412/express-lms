import { expect, test } from "vitest";
import { getAssignmentsByCourseIdService } from "../services/assignment.service";

// attempt on empty assignments in db.
test("get assignments by course id, expect empty", async () => {
  const res = await getAssignmentsByCourseIdService(1);

  expect(res.length).toBe(0);
});