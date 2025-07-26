// lib/auth.ts
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function getOrCreateUser() {
  const clerkUser = await currentUser();

  if (!clerkUser || !clerkUser.emailAddresses?.[0]?.emailAddress) {
    return null;
  }

  const email = clerkUser.emailAddresses[0].emailAddress;

  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        imageUrl: clerkUser.imageUrl,
      },
    });
  }

  return user;
}
