import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SigninForm } from "@/features/auth/components/signin-form";
import Link from "next/link";

export default async function LoginPage() {
  return (
    <div className="container pb-4 pt-12">
      <div className="flex items-center justify-center">
        <Card className="w-full border-0 shadow-none sm:max-w-[380px] sm:border sm:shadow-sm">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <SigninForm />
          </CardContent>
          <CardFooter>
            <div className="text-sm">
              Don&apos;t have an account? Click{" "}
              <Button size="sm" variant="link" className="px-0" asChild>
                <Link href="/register">here</Link>
              </Button>{" "}
              to sign up.
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
