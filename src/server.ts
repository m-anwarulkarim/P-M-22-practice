import app from "./app";
import { prisma } from "./lib/prisma";
const PORT = process.env.PORT || 3000;
const main = async () => {
  try {
    await prisma.$connect();

    console.log("Databse connectd seccesfyll");

    app.listen(PORT, () => {
      console.log(`Server is runing on ${PORT}`);
    });
  } catch (error) {
    console.log(error);

    prisma.$disconnect();

    process.exit(1);
  }
};

main();
