import { getServerSession } from "#auth";
import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const groupId = getRouterParam(event, "groupId");

  const session = await getServerSession(event);
  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  const group = await prisma.group.findUnique({
    where: {
      id: groupId,
    },
    include: {
      members: true,
      medias: true,
      files: true,
    },
  });

  return group;
});
