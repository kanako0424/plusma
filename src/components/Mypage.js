import React, {useState} from 'react'
import { db, auth, storage } from '../firebase'
import firebase from 'firebase/app'
import '../App.css'
import NavBar from './NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"


// function Mypage({ postId, postName, price, imageUrl}) {
//   const [linkForMercari, setLinkForMercari] = useState('');
//   const [nickname, setNickname] = useState('');
//   const [profileDesc, setProfileDesc] = useState('');
//   const profile = db.collection('users')
//     .where('userID', '==', user.uid)
//     .get()
//     .then(snapshot =>(console.log(snapshot.date())))
//   console.log(profile.size)
//   console.log(profile.empty)
  // profile.forEach((postDoc) => {
  //   console.log(postDoc.id, ' => ', JSON.stringify(postDoc.data()))
  // })

// const historyPost = db.collection('posts')
//     .where('authorID', '==', 'user.uid')
//     .get()
//   console.log(historyPost.size)
//   console.log(historyPost.empty)
  // historyPost.forEach((postDoc) => {
  //   console.log(postDoc.id, ' => ', JSON.stringify(postDoc.data()))
  // })
//   return (
//     <Link target="_blank" to={`posts/${postId}`} className="">
//       <li 
//       key={postId} 
//       className="list-styles col-md-2 w-100"
//       style={{maxWidth: "300px"}}
//       >
//         <figure>
//           <div className="thumbnail">
//             <img width="200px" src={imageUrl} alt="アップロード写真"/>
//             <span className="price-tag">¥{price}</span>
//           </div>
//           <figcaption>{postName}</figcaption>
//         </figure>
//       </li>
//     </Link>
//   )
// }

// export default Mypage