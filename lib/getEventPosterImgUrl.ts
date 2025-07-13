export function getEventPosterImgUrl(posterUrl: string) {
    const api = process.env.NEXT_PUBLIC_API_URL;

    return `${api}${posterUrl}`
}