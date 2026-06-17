export type QiitaResponse = {
    id: string;
    title: string;
    url: string;
    image: string;
}

export type MicrocmsContent = {
    id: string;
    title: string;
    eyecatch: {
        url: string;
    };
    content: string;
};

export type MicrocmsResponse = {
    contents: MicrocmsContent[];
}
