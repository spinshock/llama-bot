import React, { useEffect, useState } from 'react';
import Emote from './Emote';
import { EmoteDTO } from '../models/emote.dto';

export const App = () => {
    const [emotes, setEmotes] = useState<EmoteDTO[]>([]);
    useEffect(() => {
        fetch('api/emotes')
        .then((res) => res.json())
        .then(({emotes}) => {
            setEmotes(emotes)
        });
    }, [])
    
    return <div  style={{ display: "flex", flexWrap: "wrap" }}>{emotes.map((emote) => <Emote url={emote.url} code={emote.code} />)}</div>
}

export default App;