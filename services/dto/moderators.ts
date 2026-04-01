export interface ModeratorsDTO {
    prevPageToken: string;
    nextPageToken: string;
    pageInfo: PageInfo;
    items: ModeratorItem[];
}

export interface PageInfo {
    totalResults: number;
    resultsPerPage: number;
}

export interface ModeratorItem {
    id: string;
    snippet: ModeratorSnippet;
}

export interface ModeratorSnippet {
    moderatorDetails: ModeratorDetails;
    liveChatId: string;
}

export interface ModeratorDetails {
    channelId: string;
    channelUrl: string;
    displayName: string;
    profileImageUrl: string;
}