export interface VideosDTO {
    items: Item[];
}

export interface Item {
    liveStreamingDetails: LiveStreamingDetails;
}

export interface LiveStreamingDetails {
    concurrentViewers: string;
    activeLiveChatId: string;
}
