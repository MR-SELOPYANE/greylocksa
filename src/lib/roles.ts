import type { UserRole } from "@/lib/types";

/**
 * An analyst must never be able to hand themselves the admin role — promotion
 * is an admin's decision. Kept as a pure predicate so the rule is stated once
 * and can be tested without rendering the console.
 */
export function canGrantRole(from: UserRole, to: UserRole): boolean {
  return !(from === "analyst" && to === "admin");
}
