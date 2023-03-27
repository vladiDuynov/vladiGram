
import { postService } from "../services/post.service.local"

export function getActionRemovePost(postId) {
    return {
        type: 'removePost',
        postId
    }
}
export function getActionAddPost(post) {
    return {
        type: 'addPost',
        post
    }
}
export function getActionUpdatePost(post) {
    return {
        type: 'updatePost',
        post
    }
}
export function getActionAddPostComment(postId) {
    return {
        type: 'addPostcCmment',
        postId,
        txt: 'Stam txt'
    }
}

export const postStore = {
    state: {
        posts: []
    },
    getters: {
        posts({ posts }) {
            return posts
        },
    },
    mutations: {
        setPosts(state, { posts }) {
            state.posts = posts
        },
        addPost(state, { post }) {
            state.posts.push(post)
        },
        updatePost(state, { post }) {
            const idx = state.posts.findIndex(c => c._id === post._id)
            state.posts.splice(idx, 1, post)
        },
        removePost(state, { postId }) {
            state.posts = state.posts.filter(post => post._id !== postId)
        },
        addPostComment(state, { postId, comment }) {
            const post = state.posts.find(post => post._id === postId)
            if (!post.comments) post.comments = []
            post.comments.push(comment)
        },
        addPostLike(state, { postId, like }) {
            const post = state.posts.find(post => post._id === postId)
            if (!post.likedBy) post.likedBy = []
            post.likedBy.push(like)
        },
    },
    actions: {
        async addPost(context, { post }) {
            try {
                post = await postService.save(post)
                context.commit(getActionAddPost(post))
                return post
            } catch (err) {
                console.log('postStore: Error in addPost', err)
                throw err
            }
        },
        async updatePost(context, { post }) {
            try {
                post = await postService.save(post)
                context.commit(getActionUpdatePost(post))
                return post
            } catch (err) {
                console.log('postStore: Error in updatePost', err)
                throw err
            }
        },
        async loadPosts({ commit },{txt}) {
            try {
                const posts = await postService.query({txt})
                console.log('posts:', posts)
                commit({ type: 'setPosts', posts })
            } catch (err) {
                console.log('postStore: Error in loadPosts', err)
                throw err
            }
        },
        async removePost(context, { postId }) {
            try {
                await postService.remove(postId)
                context.commit(getActionRemovePost(postId))
            } catch (err) {
                console.log('postStore: Error in removePost', err)
                throw err
            }
        },
        async addPostComment(context, { postId, txt }) {
            try {
                const comment = await postService.addPostComment(postId, txt)
                context.commit({ type: 'addPostComment', postId, comment })
            } catch (err) {
                console.log('postStore: Error in addPostComment', err)
                throw err
            }
        },

        async addLike(context, { postId }) {
            try {
                const post = await postService.addLike(postId)
                context.commit(getActionUpdatePost(post))
            } catch (err) {
                console.log('postStore: Error in addLike', err)
                throw err
            }
        },

    }
}