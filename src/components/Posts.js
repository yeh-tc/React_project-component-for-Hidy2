import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Post from "./Post.js";
export default function Posts() {
  const [posts, setPosts] = useState();
  //useEffect first argument is the function that we want to
  //execute (etc.background task), second argument is the dependency (The second argument is an array of dependencies that determine when the effect needs to run.)
  //if second argument is a emty array, then this will run when the page
  //first render and will never again
  //in React, in the side Effect function is not recommend using async function
  //the trick is put the async function in the non-async function, and immediatlely call it
  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://ecodata.odb.ntu.edu.tw/api/ctd?mode=rawx&cruise=OR22395&append=temperature");
      if (response.ok) {
        try {
          const result = await response.json();
          setPosts(result);
          //const index = Array.keys(result);
          
        }
        catch (error){
          setPosts(null);
        }
        
        //setPosts(result);
      } else {
        setPosts(null);
      }
    })();
  }, []);

  return (
    <>
      {posts === undefined ? (
        <CircularProgress color="secondary" />
      ) : (
        <>
          {posts === null ? (
            <p>Could not retrive any data</p>
          ) : (
            <>
              {posts.length === 0 ? (
                <Typography>There is no post th show</Typography>
              ) : (
                posts.map((post,index) => <Post post={post} key={index}/>)
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
