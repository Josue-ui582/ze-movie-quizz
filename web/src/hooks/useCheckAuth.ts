import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export function useCheckAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function check() {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setAuthenticated(true);
        } else {
          router.replace("/register");
        }
      } else {
        router.replace("/register");
      }
      setLoading(false);
    }
    check();
  }, [router]);

  return { loading, authenticated };
}