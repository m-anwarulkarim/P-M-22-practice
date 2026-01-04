import { configs } from "../config";
import { prisma } from "./prisma";

const seedAdmin = async () => {
  const adminData = {
    name: configs.ADMIN_NAME,
    email: configs.ADMIN_EMAIL,
    password: configs.ADMIN_PASS,
  };

  const admin = await prisma.user.findUnique({
    where: {
      email: adminData.email!,
    },
  });

  if (admin) {
  }
};
