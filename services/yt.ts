import { MessagesDTO } from "./dto/messages";
import { ModeratorsDTO } from "./dto/moderators";
import { SearchDTO } from "./dto/search";
import { SuperChatDTO } from "./dto/superChats";
import { VideosDTO } from "./dto/videos";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

export class ChannelNotLiveError extends Error {
    constructor() {
        super("Channel not live");
        this.name = "ChannelNotLiveError";
    }
}


export async function ytSearch(): Promise<SearchDTO> {
    const params = new URLSearchParams({
        part: 'snippet',
        channelId: `${process.env.EXPO_PUBLIC_CHANNEL_ID}`,
        type: 'video',
        eventType: 'live',
        maxResults: '1',
        key: API_KEY ?? '',
        fields: 'items(id/videoId,snippet/title)',
    });

    const res = await fetch(`${API_URL}/search?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch live video");
    const data = await res.json() as SearchDTO;
    if (!data.items || data.items.length === 0) throw new ChannelNotLiveError();
    return data;
}

type VideoParams = {
    videoId?: string;
}
export async function ytVideos({ videoId }: VideoParams): Promise<VideosDTO> {
    if (!videoId) throw new Error("No videoId provided");
    const params = new URLSearchParams({
        part: 'liveStreamingDetails',
        id: videoId,
        key: API_KEY ?? '',
        fields: 'items(liveStreamingDetails/concurrentViewers,liveStreamingDetails/activeLiveChatId)',
    });
    const res = await fetch(`${API_URL}/videos?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch live video");
    return res.json() as Promise<VideosDTO>;
}

type MessagesParams = {
    liveChatId?: string;
    pageToken?: string;
}
export async function ytMessages({ liveChatId, pageToken }: MessagesParams): Promise<MessagesDTO> {
    if (!liveChatId) throw new Error("No liveChatId provided");
    const params = new URLSearchParams({
        key: API_KEY ?? '',
        liveChatId: liveChatId,
        part: 'snippet,authorDetails,snippet',
        fields: 'nextPageToken,pollingIntervalMillis,items(id,snippet(type,displayMessage,superChatDetails(amountDisplayString,userComment)),authorDetails(displayName,profileImageUrl,isVerified,isChatOwner,isChatSponsor,isChatModerator))',
    });
    if (pageToken) params.set('pageToken', pageToken);
    const res = await fetch(`${API_URL}/liveChat/messages?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch messages");
    return res.json() as Promise<MessagesDTO>;
}


export async function ytSuperChats(): Promise<SuperChatDTO> {
    const params = new URLSearchParams({
        part: 'snippet',
        maxResults: '50',
        key: API_KEY ?? '',
    });
    const res = await fetch(`${API_URL}/superChatEvents?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch super chats");
    return res.json() as Promise<SuperChatDTO>;
}

type ModeratorsParams = {
    liveChatId?: string;
}
export async function ytModerators({ liveChatId }: ModeratorsParams): Promise<ModeratorsDTO> {
    if (!liveChatId) throw new Error("No liveChatId provided");
    const params = new URLSearchParams({
        key: API_KEY ?? '',
        liveChatId: liveChatId,
    });
    const res = await fetch(`${API_URL}/liveChat/moderators?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch moderators");
    return res.json() as Promise<ModeratorsDTO>;
}

// Can't enable user ban, since it also uses OAuth2
// https://developers.google.com/youtube/v3/live/docs/liveChatBans/insert