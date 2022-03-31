import MapStore from "./lib/mapstore";
import {BlogPost, Comment} from "./classes/BlogPost";

const BLOG_POSTS = new Map();
const mapStore = new MapStore("blog-posts.json");


interface BlogPostRequest {
    title: string,
    body: string
}


interface BlogPostCommentRequest {
    text: string,
    name?: string
}


mapStore.read()
    .then(
        (blogPosts) => {
            for (const [id, blogPost] of blogPosts) {
                BLOG_POSTS.set(id, blogPost);
            }
        },
        (err) => {
            console.error(err);
        }
    );

export const getBlogPosts = (sort: string) => {
    const blogPosts = Array.from(BLOG_POSTS.values());
    blogPosts.sort((a, b) => {
        if (sort === "asc") {
            return a.lastEdited - b.lastEdited;
        } else {
            return b.lastEdited - a.lastEdited;
        }
    });
    return blogPosts;
}

export async function createBlogPost(title: string, body: string, author: string) {
    const blog_post = new BlogPost(title, body, author);
    BLOG_POSTS.set(blog_post.id, blog_post);
    await mapStore.save(BLOG_POSTS);
    return blog_post;
}

export async function createBlogPostComment(id: string, text: string, name?: string) {
    const blogPost = BLOG_POSTS.get(id);
    if (blogPost === null || blogPost === undefined) {
        return null;
    }
    console.log(`id found ${id} and blog post == [${blogPost}]`)
    const blogComment = new Comment(text, name);
    blogPost.comments.push(blogComment)
    await mapStore.save(BLOG_POSTS);
    return {...blogPost};
}

export async function updateBlogPost(id: string, request: BlogPostRequest) {
    const blogPost = getBlogPost(id);
    if (typeof blogPost !== 'undefined') {
        blogPost.title = request.title ?? blogPost.title;
        blogPost.body = request.body ?? blogPost.body;
        blogPost.lastEdited = Date.now();
        await mapStore.save(BLOG_POSTS);
        return {...blogPost};
    }
    return null
}

export async function updateComment(id: string, id_comment: string, request: BlogPostCommentRequest) {
    const blogPost = getBlogPost(id);
    if (typeof blogPost !== 'undefined') {
        const filterCommentWithId = (comment:Comment) => comment.id == id_comment
        const idComment = blogPost.comments.findIndex(filterCommentWithId);
        blogPost.comments[idComment].text = request.text ?? blogPost.comments[idComment].text;
        blogPost.comments[idComment].name = request.name ?? blogPost.comments[idComment].name;
        blogPost.lastEdited = Date.now();
        await mapStore.save(BLOG_POSTS);
        return {...blogPost};
    }
    return null
}

export function getBlogPost(id: string) {
    if (!BLOG_POSTS.has(id)) {
        return null;
    }
    const blogPost = BLOG_POSTS.get(id);
    return {...blogPost};
}

export async function deleteBlogPost(id: string) {
    const success = BLOG_POSTS.delete(id);
    await mapStore.save(BLOG_POSTS);
    return success;
}
