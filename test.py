import os
import time
import requests
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("API_KEY")
CHANNEL_ID = os.getenv("CHANNEL_ID")

# 1. Get video ID and title
step1 = requests.get("https://www.googleapis.com/youtube/v3/search",
                     params={
                         "part": "snippet",
                         "channelId": CHANNEL_ID,
                         "type": "video",
                         "eventType": "live",
                         "maxResults": "1",
                         "key": API_KEY,
                         "fields": "items(id/videoId,snippet/title)"
                     })

items = step1.json().get("items", [])
if not items:
    print("No live stream found.")
    exit()

video_id = items[0]["id"]["videoId"]
title = items[0]["snippet"]["title"]
print(f"Watching: {title}")

# 2. Get chat ID
step2 = requests.get("https://www.googleapis.com/youtube/v3/videos",
                     params={
                         "part": "liveStreamingDetails",
                         "id": video_id,
                         "key": API_KEY,
                         "fields": "items(liveStreamingDetails/concurrentViewers,liveStreamingDetails/activeLiveChatId)"
                     })

live_details = step2.json()["items"][0]["liveStreamingDetails"]
chat_id = live_details["activeLiveChatId"]

# 3. Poll loop
next_page_token = None

RESET = '\033[0m'
user_colors = {
    'owner':    '\033[1;43m',
    'verified': '\033[1;44m',
    'sponsor':  '\033[1;42m',
    'mod':      '\033[1;41m',
    'default':  '\033[0m',
}

while True:
    # Fetch messages
    params = {
        "key": API_KEY,
        "liveChatId": chat_id,
        "part": "snippet,authorDetails",
    }
    if next_page_token:
        params["pageToken"] = next_page_token

    step3 = requests.get(
        "https://www.googleapis.com/youtube/v3/liveChat/messages", params=params)
    data = step3.json()

    # Print new messages
    for msg in data.get("items", []):
        pfp = msg["authorDetails"]["profileImageUrl"]

        is_verified = msg["authorDetails"]["isVerified"]
        is_owner = msg["authorDetails"]["isChatOwner"]
        is_sponsor = msg["authorDetails"]["isChatSponsor"]
        is_mod = msg["authorDetails"]["isChatModerator"]

        sender = msg["authorDetails"]["displayName"]

        content = msg["snippet"]["displayMessage"]
        print(f"PFP: {pfp}")

        if is_owner:
            color = user_colors['owner']
        elif is_mod:
            color = user_colors['mod']
        elif is_sponsor:
            color = user_colors['sponsor']
        elif is_verified:
            color = user_colors['verified']
        else:
            color = user_colors['default']

        print(f"{color}{sender}{RESET}: {content}\n")

    # Fetch updated viewer count
    step2 = requests.get("https://www.googleapis.com/youtube/v3/videos",
                         params={
                             "part": "liveStreamingDetails",
                             "id": video_id,
                             "key": API_KEY,
                             "fields": "items(liveStreamingDetails/concurrentViewers)"
                         })
    viewers = step2.json()["items"][0]["liveStreamingDetails"].get(
        "concurrentViewers", "0")
    print(f"Viewers: {viewers}")

    # Check if there are new messages
    next_page_token = data.get("nextPageToken")

    # Wait
    wait_ms = data.get("pollingIntervalMillis", 5000)
    time.sleep(wait_ms / 1000)


# https://developers.google.com/youtube/v3/live/docs/superChatEvents/list (Super Chat)
# https://developers.google.com/youtube/v3/live/docs/liveChatBans/insert (Ban User)
# Pool?