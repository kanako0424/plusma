// import React, {useState, useEffect} from 'react'
// import { db } from '../firebase'
// import '../App.css'
// import Post from './Post'

// function CreatedPosts({userId}) {
//   const userRef = db.collection('users').doc(userId);
//   const createdPostsRef = userRef.collection('createdPosts');
//   const postIds = [];

//   const postListItems = createdPostsRef.get()
//     .then((querysnapshot) => {
//       querysnapshot.forEach(doc => {
//         postIds.push(doc.id);
//       })
//       console.log(postIds)
//       return postIds;
//     }).catch(err => {
//       console.log(err)
//     })

//     .then((postIds) => {
//       postIds.map(postId => {
//         db.collection('posts').doc(postId).get().then((snapshot) => {
//           const postData = snapshot.data()
//           return ([
//             <Post 
//               key={postData.postId}
//               imageUrl={postData.imageUrl}
//               postId={postData.postId}
//               postName={postData.postName}
//               price={postData.price}
//             />
//           ])
//         })
//       })
//     })

//   return (
//     <div className="d-flex container">
//       <div className="row">
//         {postListItems}
//       </div>
//     </div>
//   )
// }

// export default CreatedPosts
