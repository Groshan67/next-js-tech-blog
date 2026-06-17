'use client';

import { reloadBlog } from "./actions";

export default function ReloadButton({ id }: { id: string }) {
    return (
        <form action={reloadBlog}>
            <input type="hidden" name="id" value={id} />
            <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-lg border border-card-border bg-card px-4 py-2 text-sm font-medium text-muted transition-all hover:border-accent hover:text-accent hover:shadow-sm active:scale-95"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                </svg>
                Reload | 再読み込み
            </button>
        </form>
    );
}