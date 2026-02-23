"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Wrong password");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="w-full max-w-sm">
        <p
          className="mb-12 text-center text-[13px] tracking-[0.2em] uppercase opacity-40"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Eva Gorobets · Admin
        </p>

        <form onSubmit={handleSubmit} className="space-y-0">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full border-t border-b border-black/[0.12] bg-transparent py-5 text-sm placeholder:text-black/30 outline-none focus:border-black/40 transition-colors"
          />

          {error && (
            <p className="pt-3 text-xs text-black/50">{error}</p>
          )}

          <div className="pt-8">
            <button
              type="submit"
              disabled={loading}
              className="btn w-full justify-center disabled:opacity-40"
            >
              {loading ? "..." : "Enter"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
