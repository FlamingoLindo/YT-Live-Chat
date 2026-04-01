export interface SearchDTO {
    items: Item[];
}

export interface Item {
    id: ID;
    snippet: Snippet;
}

export interface ID {
    videoId: string;
}

export interface Snippet {
    title: string;
}
