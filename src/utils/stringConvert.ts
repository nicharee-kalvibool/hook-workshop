export const toPascalCase = (text: string, trimSpace?: boolean) => {
    if (!text) return "";
    return text
        .split(" ")
        .map((t) => t[0].toUpperCase() + t.slice(1).toLowerCase())
        .join(trimSpace ? "" : " ");
};
