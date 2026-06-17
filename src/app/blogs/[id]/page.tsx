import axios from "axios";
import { Suspense } from "react";
import { MicrocmsContent } from "@/domain/Article";
import Image from "next/image";
import ReloadButton from "./ReloadButton";


async function BlogContent({ params }: { params: Promise<{ id: string }> }) {
    'use cache'
    const { id } = await params;

    const response = await axios.get<MicrocmsContent>(
        `https://6f60h6194x.microcms.io/api/v1/blogs/${id}`,
        {
            headers: {
                "X-MICROCMS-API-KEY": `${process.env.MICROCMS_API_KEY}`,
            },
        }
    );

    const blog = response.data;

    return (

        <article>
            <Image
                src={blog.eyecatch.url}
                alt={blog.title}
                width={600}
                height={300}
            />
            <h2>{blog.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            {/* 追加 */}
            <ReloadButton id={id} />
        </article>



        // <div>
        //     <h1>BlogDetailページ</h1>
        //     <p>ID: {id}</p>
        // </div>
    );
}

export default function BlogDetail({ params }: { params: Promise<{ id: string }> }) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BlogContent params={params} />
        </Suspense>
    );
}
