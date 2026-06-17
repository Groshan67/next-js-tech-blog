
'use client';

import { QiitaResponse } from "@/domain/Article";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Qiita() {

    const [qiitaItems, setQiitaItems] = useState<QiitaResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchQiitaItems = async () => {
        const response = await axios.get<QiitaResponse[]>(
            "https://qiita.com/api/v2/items?query=user:Sicut_study&per_page=20",
            {
                headers: {
                    "Authorization": `Bearer ${process.env.NEXT_PUBLIC_QIITA_API_KEY}`
                }
            }
        );
        return response.data;
    };

    useEffect(() => {
        fetchQiitaItems().then((items) => {
            setQiitaItems(items);
        })
            .finally(() => {
                setIsLoading(false)
            });
    }, []);

    return (
        <div>
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold tracking-tight">Qiita</h1>
                <p className="mt-2 text-muted">Qiita に投稿した技術記事一覧</p>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="rounded-xl border border-card-border bg-card p-5"
                        >
                            <div className="skeleton mb-3 h-5 w-3/4" />
                            <div className="skeleton mb-2 h-4 w-full" />
                            <div className="skeleton h-4 w-1/2" />
                        </div>
                    ))}
                </div>
            )}

            {/* Article List */}
            {!isLoading && (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {qiitaItems.map((item) => (
                        <a
                            key={item.id}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group rounded-xl border border-card-border bg-card p-5 transition-all hover:border-qiita-green hover:shadow-lg"
                        >
                            <h2 className="line-clamp-2 text-base font-semibold leading-snug text-foreground group-hover:text-qiita-green">
                                {item.title}
                            </h2>
                            <div className="mt-3 flex items-center gap-2">
                                <span className="inline-block rounded-full bg-qiita-green-light px-2.5 py-0.5 text-xs font-medium text-qiita-green">
                                    Qiita
                                </span>
                                <span className="text-xs text-muted">外部リンク &nearr;</span>
                            </div>
                        </a>
                    ))}
                </div>
            )}


        </div>
    )
}
