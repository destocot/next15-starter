import { redirect } from "next/navigation";

import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignoutButton } from "@/features/auth/components/signout-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { generateDisplayName } from "@/lib/utils";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="flex flex-grow items-center justify-center">
      <Card className="w-full max-w-[375px]">
        <CardHeader>
          <div className="flex items-center gap-x-4">
            <Avatar>
              <AvatarImage
                src={String(session.user?.image)}
                alt={String(session.user?.name)}
              />
              <AvatarFallback className="uppercase">
                {generateDisplayName(session.user)[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>
                <strong>name</strong>: {String(session.user?.name)}
              </CardTitle>
              <CardDescription>
                <strong>email</strong>: {session.user?.email}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex items-center justify-center">
          <SignoutButton />
        </CardContent>

        <CardFooter className="text-sm text-foreground/50">
          <strong>id</strong>: {session.user?.id}
        </CardFooter>
      </Card>
    </div>
  );
}
