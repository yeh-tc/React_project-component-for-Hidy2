import React, { useState, useEffect } from 'react';
import Body from '../components/Body';
import Post from '../components/Posts';

export default function FeedPage() {
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
      fetch('/time')
      .then(res => res.json())
      .then(data => setCurrentTime(data.time))
      
    }, []);
  
    return(
        <Body sidebar>
            <Post/>
            <p>The current time is {currentTime}.</p>
        </Body>
    );
}