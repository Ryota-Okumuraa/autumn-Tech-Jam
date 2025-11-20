import prisma from "../lib/db";

async function main() {
  const languages = [
    "en-US",
    "ko-KR",
    "zh-CN",
    "zh-TW",
    "ja-JP",
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