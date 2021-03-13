import React from 'react';

export const Emote = (props) => (<div>
    <img src={props.url} />
    <span>{props.code}</span>
</div>)

export default Emote;