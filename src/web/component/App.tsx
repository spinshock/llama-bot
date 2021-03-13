import React, { useEffect, useState } from 'react';
import Emote from './Emote';

export const App = () => {
    const [emotes, setEmotes] = useState([]);
    useEffect(() => {
        fetch('api/emotes')
        .then((res) => res.json())
        .then(({emotes}) => {
            setEmotes(emotes)
        });
    }, [emotes])
    
    return <div  style={{ display: "flex", flexWrap: "wrap" }}>{emotes.map((emote) => <Emote url={emote.url} code={emote.code} />)}</div>
}

export default App;