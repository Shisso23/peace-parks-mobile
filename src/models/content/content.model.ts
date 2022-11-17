import { Content } from "./types";

export const contentModel = (data?: Content): Content => ({
    id: data?.id ?? '',
    heading: data?.heading ?? '',
    subheading: data?.subheading ?? '',
    description: data?.description ?? '',
    location: data?.location ?? '',
    thumbnailId: data?.thumbnailId ?? '',
});