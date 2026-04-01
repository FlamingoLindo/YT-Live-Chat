export interface SuperChatDTO {
    nextPageToken: string;
    pageInfo: PageInfo;
    items: SuperChatItem[];
}

export interface PageInfo {
    totalResults: number;
    resultsPerPage: number;
}

export interface SuperChatItem {
    id: string;
    snippet: SuperChatSnippet;
}

export interface SuperChatSnippet {
    channelId: string;
    supporterDetails: SupporterDetails;
    commentText: string;
    createdAt: string;
    amountMicros: number;
    currency: string;
    displayString: string;
    messageType: number;
    isSuperStickerEvent: boolean;
    superStickerMetadata?: SuperStickerMetadata;
}

export interface SupporterDetails {
    channelId: string;
    channelUrl: string;
    displayName: string;
    profileImageUrl: string;
}

export interface SuperStickerMetadata {
    stickerId: string;
    altText: string;
    language: string;
}