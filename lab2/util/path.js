import { fileURLToPath } from "url";
import path from "path";

console.log(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
console.log(__filename);
const __dirname = path.dirname(__filename);
console.log(__dirname);

export const ROOTDIR = path.resolve(__dirname, "..");
console.log(ROOTDIR);
