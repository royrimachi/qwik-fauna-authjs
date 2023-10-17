import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { useAuthSession, useAuthSignin, useAuthSignout } from "./plugin@auth";

export default component$(() => {
  const session = useAuthSession();
  const signIn = useAuthSignin();
  const signOut = useAuthSignout();

  return (
    <>
      {session.value && session.value.user ? (
        <>
          <h1>Hi 👋</h1>
          <p>
            Can't wait to see what you build with qwik!
            <br />
            Happy coding.
          </p>
          <p>Session expires at {session.value?.expires?.toLocaleString()}</p>
          {session.value.user.image && session.value.user.name ? (
            <img
              src={session.value.user.image}
              alt={session.value.user.name}
              width={96}
              height={96}
            />
          ) : null}
          <p>{session.value?.user?.email}</p>
          <button onClick$={() => signOut.submit({ callbackUrl: "/" })}>
            Sign Out
          </button>
        </>
      ) : (
        <>
          <p>Not Signed in</p>
          <button
            onClick$={() =>
              signIn.submit({
                providerId: "github",
                options: { callbackUrl: "/" },
              })
            }
          >
            Sign In
          </button>
        </>
      )}
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
