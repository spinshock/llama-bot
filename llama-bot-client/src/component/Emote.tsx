import React from 'react';

type EmoteProps = { url: string; code: string; };

export const Emote: React.FunctionComponent<EmoteProps> = (props: EmoteProps) => (<div style={{ display: "inline-flex", flexDirection: "column", margin: "4px", padding: "18px", textAlign: "center", backgroundColor: "gray", color: "white" }}>
    <img width="112" height="112" alt={props.code} src={props.url} />
    <span style={{ marginTop: "8px" }}>{props.code}</span>
</div>)

export default Emote;