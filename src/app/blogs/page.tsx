'use cache';

import { MicrocmsResponse } from "@/domain/Article";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default async function Blogs() {
    const getBlogs = async () => {
        const response = await axios.get<MicrocmsResponse>(
            // "https://mf2p17uv52.microcms.io/api/v1/blogs",
            "https://6f60h6194x.microcms.io/api/v1/blogs",
            {
                headers: {
                    "X-MICROCMS-API-KEY": `${process.env.MICROCMS_API_KEY}`,
                },
                // next :{tags:['blog-posts']}
            }
        );

        return response.data.contents.map((item) => ({
            id: item.id,
            title: item.title,
            url: `/blogs/${item.id}`,
            image: item.eyecatch.url,
        }));
    };

    const blogs = await getBlogs();

    return (
        <div>
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold tracking-tight">Blogs</h1>
                <p className="mt-2 text-muted">MicroCMS で管理しているブログ記事一覧</p>
            </div>

            {/* Article Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog) => (
                    <Link
                        key={blog.id}
                        href={blog.url}
                        className="group overflow-hidden rounded-xl border border-card-border bg-card transition-all hover:border-accent hover:shadow-lg"
                    >
                        <div className="relative aspect-video w-full overflow-hidden">
                            <Image
                                src={blog.image}
                                alt={blog.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <div className="p-4">
                            <h2 className="line-clamp-2 text-base font-semibold leading-snug text-foreground group-hover:text-accent">
                                {blog.title}
                            </h2>
                            <span className="mt-3 inline-block rounded-full bg-accent-bg px-2.5 py-0.5 text-xs font-medium text-accent">
                                Blog
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}