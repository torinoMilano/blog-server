import { readFile, writeFile } from "fs/promises";
import path from "path";
import {BlogPost} from "../classes/BlogPost";

const dataDir = "data";
const initialData:BlogPost = new BlogPost("First title", "this is my first blog", "me")

class MapStore {
    filepath: string;
    constructor(filename: string) {
        this.filepath = path.resolve(dataDir, filename);
    }
    async save(data: Map<string, BlogPost>) {
        console.log(`writing to ${this.filepath}`);
        const serializedData = JSON.stringify(Array.from(data.entries()));
        await writeFile(this.filepath, serializedData);
    }

    async read() {
        console.log(`reading from ${this.filepath}`);
        const data = await readFile(this.filepath, "utf-8");
        let parsed = null;
        try {
            parsed = JSON.parse(data);
        } catch (e) {
            // create and store dummy first blog post
            parsed = {id: initialData.id, initialData}
        }

        return new Map(parsed);
    }
}

export default MapStore;
