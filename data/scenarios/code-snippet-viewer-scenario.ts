"use client"

export const codeSnippetViewerScenario = {
  tool: "renderComponent",
  payload: {
    componentType: "codesnippetviewer",
    props: {
      title: "Authentication Example",
      description: "How to implement user authentication",
      language: "typescript",
      code: `
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function AuthButtons() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <span>Signed in as {session.user.email}</span>
        <Button onClick={() => signOut()}>Sign out</Button>
      </div>
    );
  }
  return (
    <Button onClick={() => signIn()}>
      Sign in
    </Button>
  );
}`,
      showLineNumbers: true,
      copyable: true,
      theme: "dark",
    },
  },
}
