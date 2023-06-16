import React, { useState, useEffect } from 'react';
import Body from '../components/Body';
import Post from '../components/Posts';

export default function FeedPage() {
    
    
  
    return(
        <Body sidebar>
            <Post/>
            <p>The current time is .</p>
        </Body>
    );
}