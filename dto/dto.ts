export interface Top {
    stream: StreamClass;
}

export interface StreamClass {
    viewers: number;
    messages: Message[];
}

export interface Message {
    id: string;
    username: string;
    pfp: string;
    message: string;
    isVerified: boolean;
    isChatOwner: boolean;
    isChatSponsor: boolean;
    isChatModerator: boolean;
}
