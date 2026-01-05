export const UserRoleSchema = {
  type: "string",
  enum: ["admin", "manager", "customer"],
  example: "customer",
};
