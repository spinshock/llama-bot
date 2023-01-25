import { EmoteListener } from "./emote.listener";
import { ListenerCtr } from "./listener";
import { StartupListener } from "./startup.listener";

const ALL_LISTENERS: ListenerCtr[] = [StartupListener, EmoteListener];

export default ALL_LISTENERS;
