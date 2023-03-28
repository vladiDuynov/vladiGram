
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
    if (!post.likedBy) {
      post.likedBy = []
    }
    const currentUser = userService.getLoggedinUser();
    const existingLikeIndex = post.likedBy.findIndex((like) => like._id === currentUser._id)
  
    if (existingLikeIndex >= 0) {
      post.likedBy.splice(existingLikeIndex, 1)
    } else {
      post.likedBy.push(currentUser)
    }
    const updatedPost = await storageService.put(STORAGE_KEY, post)
    return updatedPost
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


