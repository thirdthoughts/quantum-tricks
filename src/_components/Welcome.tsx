"use server"
import { currentUser } from "@clerk/nextjs/server";

export default async function Welcome() {
  const user = await currentUser();
  return <div className="flex flex-col items-center p-1">
    Welcome {user?.fullName}!<div className="h-4"></div>{" "}
  </div>;
}
