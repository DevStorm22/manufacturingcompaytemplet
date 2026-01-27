export function slugify(text: string) {
    return text.toLocaleLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}