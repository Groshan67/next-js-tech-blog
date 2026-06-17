import Comments from "./Comments";

export default async function CommentsWrapper({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return <Comments params={params} />;
}