
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
            <h1>Qiitaページ</h1>
            <ul>
                {qiitaItems.map((item) => (
                    <li key={item.id}>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
