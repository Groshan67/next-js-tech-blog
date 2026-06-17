
import { getQiitaArticles } from "@/lib/qiita";
import Link from "next/link";

export default async function Articles() {
    const blogs = await getQiitaArticles();

    return (
        <>
            {/* {blogs.map((blog) => (
                <div key={blog.id}>
                    <Link href={`/qiita/${blog.id}`}>{blog.title}</Link>
                </div>
            ))} */}
        </>
    )
}