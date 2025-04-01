export type Slide = {
    id: number;
    type: 'image' | 'video';
    src: string;
    alt: string;
    date?: string;
    title1?: string;
    title2?: string;
    country?: string;
    subtitle?: string;
    congreso?: string;
}
