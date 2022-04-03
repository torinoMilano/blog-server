import * as BlogPostApi from "../blogpost_api";
import {Request, Response} from "express/ts4.0";
import {BlogPost} from "../classes/BlogPost";
import {logger} from "../classes/Logger";

const ERROR_STATUS:number = 400;
const SORT_ASC:string = "asc";
const SORT_DESC:string = "desc";

export const errorResponse = async (req: Request, res: Response, message: string) => {
    return res
        .status(ERROR_STATUS)
        .json({error: `${message}`});
}

export const list = async (req: Request, res: Response) => {
    let {sort} = req.query;
    sort = sort ? sort : "desc";
    if (!(sort === SORT_ASC|| sort === SORT_DESC)) {
        return errorResponse(req, res, "Invalid sort Params");
    }
    const blogPosts = BlogPostApi.getBlogPosts(sort);
    res.json({blogPosts});
}

export const listByTitle = async (req: Request, res: Response) => {
    let {sort} = req.query;
    sort = sort ? sort : "desc";
    if (!(sort === "asc" || sort === "desc")) {
        return errorResponse(req, res, "Invalid sort Params");
    }
    const blogPosts = BlogPostApi.getBlogPosts(sort);

    res.json(blogPosts.map(({id: id, title: title}) => ({id, title})));
}

export const create = async (req: Request, res: Response) => {
    const {title, body, author} = req.body;
    if (title === undefined || body === undefined) {
        return errorResponse(req, res, "Missing title or body");
    }
    const blogPost = await BlogPostApi.createBlogPost(title, body, author);
    console.log({blogPost});
    res.send("ok");
}

export const createComment = async (req: Request, res: Response) => {
    const {id} = req.params || undefined;
    const {text, name} = req.body || undefined;
    if (id === undefined || text === undefined) {
        return errorResponse(req, res, "Missing comment text or id of Blog to update");
    }
    const blogPost = await BlogPostApi.createBlogPostComment(id, text, name);
    console.log({blogPost});
    res.send("ok");
}

export const read = async (req: Request, res: Response) => {
    // blog/:id
    const {id} = req.params;
    const blogPost = BlogPostApi.getBlogPost(id);
    res.json({blogPost});
}

export const comments = async (req: Request, res: Response) => {
    // blog/:id/comments
    const {id} = req.params;
    const blogPost: BlogPost = BlogPostApi.getBlogPost(id);
    res.json({comments: blogPost.comments});
}

export const commentsCounts = async (req: Request, res: Response) => {
    // blog/:id/comments/count
    const {id} = req.params;
    const blogPost: BlogPost = BlogPostApi.getBlogPost(id);
    res.json({count: blogPost.comments.length});
}

export const update = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {title, body} = req.body;
    if (title === undefined && body === undefined) {
        return errorResponse(req, res, "Missing title and body");
    }
    const blogPost = await BlogPostApi.updateBlogPost(id, {title, body});
    console.log({blogPost});
    res.send("ok");
}

export const updateComment = async (req: Request, res: Response) => {
    const {id, id_comment} = req.params || {};
    const {text, name} = req.body || {};
    if (typeof text !== 'undefined' && text) {
        const blogPost: BlogPost = await BlogPostApi.updateComment(id, id_comment, {text, name});
        logger.info(`updated blog post id ${id} with comment "${text}"`, blogPost)
        res.send("ok");
    } else {
        logger.error(`text is undefined ${text}`)
        return res.status(ERROR_STATUS).contentType("application/json").send({"error": `Missing id, id of comment or comment text`});
    }
}

export const deleteBlogPost = async (req: Request, res: Response) => {
    const {id} = req.params;
    const success = await BlogPostApi.deleteBlogPost(id);
    console.log(`deleting ${id}`, success);
    res.send("ok");
}