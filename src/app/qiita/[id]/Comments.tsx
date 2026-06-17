import { getQiitaComments } from "@/lib/qiita";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function Comments({
    params,
}: Props) {
    let { id } = await params;
    id = '2c9df846e96a47900e6d'
    const comments = await getQiitaComments(id);

    return (
        <div>
            {comments.map((comment) => (
                <div key={comment.id}>
                    {comment.body}
                </div>
            ))}
        </div>
    );
}