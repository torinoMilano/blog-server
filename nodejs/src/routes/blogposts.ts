import * as BlogPostApi from "../blogpost_api";
import {Request, Response} from "express/ts4.0";
import {BlogPost} from "../classes/BlogPost";

export function list(req: Request, res: Response) {
    let {sort} = req.query;
    sort = sort ? sort : "desc";
    if (!(sort === "asc" || sort === "desc")) {
        return res.status(400).send("Invalid sort Params");
    }
    const blogPosts = BlogPostApi.getBlogPosts(sort);
    res.json({blogPosts});
}

export async function create(req: Request, res: Response) {
    const {title, body, author} = req.body;
    if (title === undefined || body === undefined) {
        return res.status(400).send("Missing title or body");
    }
    const blogPost = await BlogPostApi.createBlogPost(title, body, author);
    console.log({blogPost});
    res.send("ok");
}

export async function createComment(req: Request, res: Response) {
    const {id} = req.params;
    const {text, name} = req.body;
    if (id === undefined || text === undefined) {
        return res.status(400).send("Missing comment text or id of Blog to update");
    }
    const blogPost = await BlogPostApi.createBlogPostComment(id, text, name);
    console.log({blogPost});
    res.send("ok");
}

export function read(req: Request, res: Response) {
    // blog/:id
    const {id} = req.params;
    const blogPost = BlogPostApi.getBlogPost(id);
    res.json({blogPost});
}

export function comments(req: Request, res: Response) {
    // blog/:id/comments
    const {id} = req.params;
    const blogPost: BlogPost = BlogPostApi.getBlogPost(id);
    res.json({comments: blogPost.comments});
}

export function commentsCounts(req: Request, res: Response) {
    // blog/:id/comments/count
    const {id} = req.params;
    const blogPost: BlogPost = BlogPostApi.getBlogPost(id);
    res.json({count: blogPost.comments.length});
}

export async function update(req: Request, res: Response) {
    const {id} = req.params;
    const {title, body} = req.body;
    if (title === undefined && body === undefined) {
        return res.status(400).send("Missing title and body");
    }
    const blogPost = await BlogPostApi.updateBlogPost(id, {title, body});
    console.log({blogPost});
    res.send("ok");
}

export async function updateComment(req: Request, res: Response) {
    const {id, id_comment} = req.params;
    const {text, name} = req.body;
    if (typeof text !== undefined) {
        const blogPost = await BlogPostApi.updateComment(id, id_comment, {text, name});
        console.log({blogPost});
        res.send("ok");
    } else {
        return res.status(400).send("Missing id, id of comment or comment text");
    }
}

export async function deleteBlogPost(req: Request, res: Response) {
    const {id} = req.params;
    const success = await BlogPostApi.deleteBlogPost(id);
    console.log(`deleting ${id}`, success);
    res.send("ok");
}