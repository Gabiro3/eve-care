import Link from "next/link";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background px-4 py-8">
      <div className="w-full max-w-md">
        <SignIn />
        <footer className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            By signing in, you agree to our{" "}
            <Link
              href="/terms"
              aria-label="Read Terms of Service"
              className="text-emerald-600 hover:underline focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              aria-label="Read Privacy Policy"
              className="text-emerald-600 hover:underline focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </footer>
      </div>
    </main>
  );
}
