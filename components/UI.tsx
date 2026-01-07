import React from "react";
import { clsx } from "clsx";

export function Container(props: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={clsx("mx-auto w-full max-w-5xl px-4", props.className)}>
      {props.children}
    </div>
  );
}

export function Card(props: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-zinc-200 bg-white shadow-soft",
        props.className
      )}
    >
      {props.children}
    </div>
  );
}

export function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "ghost";
  }
) {
  const v = props.variant ?? "primary";
  return (
    <button
      {...props}
      className={clsx(
        "inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed",
        v === "primary" && "bg-zinc-900 text-white hover:bg-zinc-800",
        v === "ghost" && "bg-transparent text-zinc-900 hover:bg-zinc-100",
        props.className
      )}
    />
  );
}

export function Badge(props: React.PropsWithChildren<{ className?: string }>) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700",
        props.className
      )}
    >
      {props.children}
    </span>
  );
}

export function Divider() {
  return <div className="h-px w-full bg-zinc-200" />;
}
