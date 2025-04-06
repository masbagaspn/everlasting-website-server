import { Role } from "../models";

export const seedRoles = async () => {
  await Role.bulkCreate([{ name: "admin" }, { name: "user" }], {
    ignoreDuplicates: true,
  });
};
