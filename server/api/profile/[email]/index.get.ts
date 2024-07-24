import prisma from "~/lib/prisma";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  const email = getRouterParam(event, "email");

  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }
  const profile = await prisma.profile.findUnique({
    where: {
      email,
    },
  });
  return profile;
});
