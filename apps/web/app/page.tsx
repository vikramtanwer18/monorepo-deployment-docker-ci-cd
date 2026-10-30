import { db } from "@repo/db/client";

// Rendered once at build time (static). The query below runs during
// `next build`, so DATABASE_URL must be available to the build.
export const dynamic = "force-static";

export default async function Home() {
  const users = await db.orm.public.User.all();

  return (
    <div>
      <h1>Users</h1>
      {users.length === 0 ? (
        <p>No users yet.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.username ?? "(no username)"} ({user.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
