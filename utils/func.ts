export function isStringEmpty(value: any) {
    return (typeof value !== "string" || value.length <= 0);
}