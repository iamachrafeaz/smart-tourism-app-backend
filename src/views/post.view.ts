import { timeStamp } from "node:console"

export const postList = (posts: any[]) => {
    return posts.map(post => ({
        id: post._id,
        photo: post.user.profilePictureUrl,
        likes: post.likes.length,
        repliesCount: post.replies.length,
        name: post.user.firstName + " " + post.user.lastName,
        isGuide: post.user.role == "GUIDE",
        timestamp: post.createdAt,
        tags: post.tags,
        topic: post.topic,
        hasLiked: post.hasLiked,
        question: post.question
    }))
}

export const postDetail = (post: any) => {
    return {
        id: post._id,
        photo: post.user.profilePictureUrl,
        likes: post.likes.length,
        repliesCount: post.replies.length,
        name: post.user.firstName + " " + post.user.lastName,
        isGuide: post.user.role == "GUIDE",
        timestamp: post.createdAt,
        tags: post.tags,
        topic: post.topic,
        question: post.question,
        replies: post.replies.map((r: any) => ({
            id: r._id,
            name: r.user.firstName + " " + r.user.lastName,
            timestamp: r.createdAt,
            isGuide: r.user.role == "GUIDE",
            photo: r.user.profilePictureUrl,
            answer: r.answer
        }))
    }
}