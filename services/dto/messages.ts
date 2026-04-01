export interface MessagesDTO {
    nextPageToken: string;
    pollingIntervalMillis?: number;
    items: Item[];
}

export interface Item {
    id: string;
    snippet: Snippet;
    authorDetails: AuthorDetails;
}

export interface AuthorDetails {
    displayName: string;
    profileImageUrl: string;
    isVerified: boolean;
    isChatOwner: boolean;
    isChatSponsor: boolean;
    isChatModerator: boolean;
}

export interface Snippet {
    type: Type;
    displayMessage: string;
    superChatDetails?: {
        amountDisplayString: string;
        userComment?: string;
    };
}

export enum Type {
    TextMessageEvent = "textMessageEvent",
    SuperChatEvent = "superChatEvent"
}
