import { Category } from "./types";

export const categoryModel = (data?: Category): Category => ({
    id: data?.id ?? '',
    name: data?.name ?? '',
    description: data?.description ?? '',
});