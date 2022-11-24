import { AboutUs } from "./types";

export const aboutUsModel = (data?: AboutUs): AboutUs => ({
    id: data?.id ?? '',
    description: data?.description ?? '',
});