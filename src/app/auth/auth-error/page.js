import Link from "next/link";

export default function AuthError() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Authentication Error
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            There was a problem authenticating your account. This could be because:
          </p>
          <ul className="mt-4 list-disc text-left text-sm text-gray-600">
            <li className="ml-4">The authentication link has expired</li>
            <li className="ml-4">The link has already been used</li>
            <li className="ml-4">There was a technical problem with the authentication service</li>
          </ul>
        </div>

        <div className="mt-8 space-y-4">
          <Link
            href="/auth/login"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Return to Login
          </Link>
          <Link
            href="/"
            className="flex w-full justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
} 