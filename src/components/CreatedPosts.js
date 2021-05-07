// import React, {useState, useEffect} from 'react'
// import { db } from '../firebase'
// import '../App.css'
// import Post from './Post'

// function CreatedPosts({postIds}) {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     postIds.map(postId => {
//       db.collection('posts').doc(postId).get().then((snapshot) => {
//         console.log(postId, snapshot.data())
//         const post = snapshot.data()
//         setPosts(post);
//       })
//       console.log(posts);
//     })
//     return(() => {
//     })
//   }, [])
    
//   const postListItems = posts.map(post => {
//     return(
//       <Post 
//         key={post.postId}
//         imageUrl={post.imageUrl}
//         postId={post.postId}
//         postName={post.postName}
//         price={post.price}
//       />
//     );
//   })

//   return (
//     <div className="d-flex container">
//       <div className="row">
//         {postListItems}
//       </div>
//     </div>
//   )
// }

// export default CreatedPosts
