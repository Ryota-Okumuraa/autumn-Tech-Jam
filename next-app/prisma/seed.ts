import prisma from "../lib/db";

async function main() {
  const languages = [
    "English",
    "한국어",
    "简体中文",
    "繁體中文",
    "日本語",
  ];

  for (const lang of languages) {
    await prisma.language.create({
      data : {
        name : lang,
      }
    })
  }
}
main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  })