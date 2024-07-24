import { getServerSession } from "#auth";
import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const email = getRouterParam(event, "email");

  const session = await getServerSession(event);
  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  const group = await prisma.group.findMany({
    where: {
      members: {
        some: {
          profile: {
            email,
          },
        },
      },
    },
    include: {
      messages: true,
    },
    orderBy: {
      updateAt: "asc",
    },
  });

  // Sort messages within each group by createdAt in descending order
  const sortedGroup = group.map((group) => ({
    ...group,
    messages: group.messages.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    ),
  }));

  return sortedGroup;
});
