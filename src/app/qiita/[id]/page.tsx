import { Suspense } from "react";
import CommentsWrapper from "./CommentsWrapper";

function CommentsSkeleton() {
    return (
        <div>
            Loading comments...
        </div>
    );
}

export default function Page(props: {
    params: Promise<{ id: string }>;
}) {
    return (
        <>
            <h1>Qiita Detail</h1>

            <Suspense fallback={<CommentsSkeleton />}>
                <CommentsWrapper params={props.params} />
            </Suspense>
        </>
    )
}