import { PersonType } from "../models";

export const seedPersonTypes = async () => {
  await PersonType.bulkCreate(
    [
      { name: "bride" },
      { name: "groom" },
      { name: "bride's father" },
      { name: "bride's mother" },
      { name: "groom's father" },
      { name: "groom's mother" },
    ],
    {
      ignoreDuplicates: true,
    }
  );
};
