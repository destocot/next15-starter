import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignupForm } from "@/features/auth/components/signout-form";
import Link from "next/link";

export default async function LoginPage() {
  return (
    <div className="container pt-12">
      <div className="flex items-center justify-center">
        <Card className="w-full border-0 shadow-none sm:max-w-[380px] sm:border sm:shadow-sm">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <SignupForm />
          </CardContent>
          <CardFooter>
            <div className="text-sm">
              Already have an account? Click{" "}
              <Button size="sm" variant="link" className="px-0" asChild>
                <Link href="/login">here</Link>
              </Button>{" "}
              to sign in.
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
