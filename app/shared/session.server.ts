import { createCookieSessionStorage } from "@remix-run/node";

export const {
  getSession,
  commitSession,
  destroySession,
} = createCookieSessionStorage({
  cookie: {
    name: "__session",
    secrets: [process.env.SESSION_SECRET as string],
    sameSite: "lax",
  },
});
