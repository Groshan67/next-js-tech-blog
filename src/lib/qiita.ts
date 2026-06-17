export type QiitaArticle = {
    id: string;
    title: string;
    created_at: string;
    url: string;
    image: string;
}

export type QiitaComment = {
    id: string;
    body: string;
    created_at: string;
    user: {
        id: string;
    };
};


export async function getQiitaArticles() {
    const response = await fetch(
        "https://qiita.com/api/v2/items?page=1&per_page=4",
        {
            cache: "no-store"
        }
    )
    if (!response.ok) {
        throw new Error("Failed to fetch qiita articles");
    }
    const data: QiitaArticle[] = await response.json()
    return data;
}

export async function getQiitaComments(
    id: string
): Promise<QiitaComment[]> {
    const response = await fetch(
        `https://qiita.com/api/v2/items/${id}/comments`,
        {
            cache: "no-store",
        }
    );


    if (!response.ok) {
        throw new Error("Failedto fetch comments");
    }

    const data = await response.json();



    return data;

}