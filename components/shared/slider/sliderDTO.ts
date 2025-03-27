export type Slide = {
    id: number;
    type: 'image' | 'video';
    src: string;
    alt: string;
    date?: string;
    title?: string;
    country?: string;
    subtitle?: string;
}
