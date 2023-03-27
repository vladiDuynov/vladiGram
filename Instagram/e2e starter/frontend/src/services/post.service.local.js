
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'post_db'

export const postService = {
    query,
    getById,
    save,
    remove,
    getEmptyPost,
    addPostComment,
    addLike
}
window.cs = postService


async function query(filterBy = { txt: '', price: 0 }) {
    var posts = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        posts = posts.filter(post => regex.test(post.by.username))
    }
    if (filterBy.price) {
        posts = posts.filter(post => post.price <= filterBy.price)
    }
    return posts
}

function getById(postId) {
    return storageService.get(STORAGE_KEY, postId)
}

async function remove(postId) {
    await storageService.remove(STORAGE_KEY, postId)
}

async function save(post) {
    var savedPost
    if (post._id) {
        savedPost = await storageService.put(STORAGE_KEY, post)
    } else {
        // Later, owner is set by the backend
        post.by = userService.getLoggedinUser()
        savedPost = await storageService.post(STORAGE_KEY, post)
    }
    return savedPost
}

async function addPostComment(postId, txt) {
    // Later, this is all done by the backend
    const post = await getById(postId)
    if (!post.comments) post.comments = []

    const comment = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    post.comments.push(comment)
    await storageService.put(STORAGE_KEY, post)

    return comment
}

async function addLike(postId) {

    const post = await getById(postId)
    if (!post.likedBy) post.likedBy = []
    const liked = userService.getLoggedinUser()
    // const postLikes = JSON.parse(JSON.stringify(post.likedBy))

    // const postLikes = post.likedBy.map((user,index) => {
    //     if(user._id === liked._id)
    //     console.log(index);
    //     return user;
    //   })
    
    post.likedBy.push(liked)
    await storageService.put(STORAGE_KEY, post)
    return liked
}

function getEmptyPost() {
    return {
        _id: '',
        txt: '',
        imgUrl: '',
        createdAt: Date.now(),
        by: {

        },
        loc: {
            lat: 11,
            lng: 22,
            name: ''
        },
        comments: [
        ],
        likedBy: [],
        tags: ["fun",
            "kids"]

    }
}


// // // TEST DATA
// ; (async () => {
//     await storageService.post(STORAGE_KEY, {
//         "_id": "p101",
//         "txt": "Point of view",
//         "imgUrl": "https://res.cloudinary.com/mistertoysss/image/upload/v1651604330/instush/wjj9a7ucw8xauyvikxiq.jpg",
//         "createdAt": 1651604385128,
//         "by": {
//             "_id": "u101",
//             "username": "Muko",
//             "imgUrl": "https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg",
//             "fullname": "Muki Muka"
//         },
//         "loc": {
//             "lat": 11.11,
//             "lng": 22.22,
//             "name": "Tel Aviv"
//         },
//         "comments": [
//             {
//                 "id": "c1001",
//                 "by": {
//                     "_id": "u102",
//                     "username": "Ulash",
//                     "imgUrl": "https://res.cloudinary.com/mistertoysss/image/upload/v1648414285/funday%20must/photo-1618085222100-93f0eecad0aa_fuisxo.jpg",
//                     "fullname": "Ulash Ulashi"
//                 },
//                 "txt": "good one!",
//                 "likedBy": [
//                     {
//                         "_id": "u101",
//                         "username": "Muko",
//                         "imgUrl": "https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg",
//                         "fullname": "Muki Muka"
//                     }
//                 ]
//             }
//         ],
//         "likedBy": [
//             {
//                 "_id": "u102",
//                 "username": "Ulash",
//                 "imgUrl": "https://res.cloudinary.com/mistertoysss/image/upload/v1648414285/funday%20must/photo-1618085222100-93f0eecad0aa_fuisxo.jpg",
//                 "fullname": "Ulash Ulashi"
//             }
//         ],
//         "tags": [
//             "fun",
//             "kids"
//         ]
//     })
//     await storageService.post(STORAGE_KEY, {
//         "_id": "p101",
//         "txt": "Point of view",
//         "imgUrl": "https://res.cloudinary.com/mistertoysss/image/upload/v1651604330/instush/wjj9a7ucw8xauyvikxiq.jpg",
//         "createdAt": 1651604385128,
//         "by": {
//             "_id": "u101",
//             "username": "Muko",
//             "imgUrl": "https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg",
//             "fullname": "Muki Muka"
//         },
//         "loc": {
//             "lat": 11.11,
//             "lng": 22.22,
//             "name": "Tel Aviv"
//         },
//         "comments": [
//             {
//                 "id": "c1001",
//                 "by": {
//                     "_id": "u102",
//                     "username": "Ulash",
//                     "imgUrl": "https://res.cloudinary.com/mistertoysss/image/upload/v1648414285/funday%20must/photo-1618085222100-93f0eecad0aa_fuisxo.jpg",
//                     "fullname": "Ulash Ulashi"
//                 },
//                 "txt": "good one!",
//                 "likedBy": [
//                     {
//                         "_id": "u101",
//                         "username": "Muko",
//                         "imgUrl": "https://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg",
//                         "fullname": "Muki Muka"
//                     }
//                 ]
//             }
//         ],
//         "likedBy": [
//             {
//                 "_id": "u102",
//                 "username": "Ulash",
//                 "imgUrl": "https://res.cloudinary.com/mistertoysss/image/upload/v1648414285/funday%20must/photo-1618085222100-93f0eecad0aa_fuisxo.jpg",
//                 "fullname": "Ulash Ulashi"
//             }
//         ],
//         "tags": [
//             "fun",
//             "kids"
//         ]
//     })
// })()