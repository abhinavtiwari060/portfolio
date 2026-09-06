"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Shield, ArrowLeft, Lock, Mail, Loader2, Sparkles } from "lucide-react";
import ClayCard from "@/components/ui/ClayCard";
import ClayInput from "@/components/ui/ClayInput";
import ClayButton from "@/components/ui/ClayButton";
import { useToast } from "@/components/ui/ToastNotification";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/admin/dashboard";
  const { showToast } = useToast();

  const [email, setEmail] = useState("admin@abhinav.dev");
  const [password, setPassword] = useState("Admin@Chai123");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast("Welcome back! Authentication successful.", "success");
        router.push(returnUrl);
        router.refresh();
      } else {
        showToast(data.message || "Invalid credentials.", "error");
      }
    } catch {
      showToast("Network error during login.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-950 flex flex-col justify-center items-center p-4 relative overflow-hidden bg-grid-pattern">
      {/* Background orange glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-orange-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-charcoal-400 hover:text-orange-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Portfolio</span>
        </Link>

        <ClayCard className="p-8 sm:p-10 border border-white/10 bg-charcoal-900/90 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-orange-500 text-white flex items-center justify-center mb-4 shadow-clay-pill border border-orange-400/40">
              <Shield className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Admin Console</h1>
            <p className="text-xs text-charcoal-400 mt-1">
              Sign in to manage Abhinav's portfolio content
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <ClayInput
              label="Admin Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@abhinav.dev"
              required
            />

            <ClayInput
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
            />

            {/* Initial Seed Credentials Hint */}
            <div className="p-3.5 rounded-xl bg-charcoal-800/80 border border-white/5 text-xs text-charcoal-300">
              <span className="font-semibold text-orange-400 flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                Default Credentials
              </span>
              <p>Email: <code className="text-white">admin@abhinav.dev</code></p>
              <p>Password: <code className="text-white">Admin@Chai123</code></p>
            </div>

            <ClayButton
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              className="w-full mt-2"
              icon={loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
            >
              {loading ? "Authenticating..." : "Sign In to Admin"}
            </ClayButton>
          </form>
        </ClayCard>
      </div>
    </div>
  );
}
