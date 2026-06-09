import apiClient from "../../../api/axiosInstance";
import type { Image } from "../types/Image";

const BASE = "/images";

export async function fetchImages(): Promise<Image[]> {
   const res = await apiClient.get<Image[]>(`${BASE}/`);
   return res.data;
}

export async function uploadImages(files: File[]): Promise<Image[]> {
   const formData = new FormData();
   for (const file of files) {
      formData.append("files", file);
   }

   const res = await apiClient.post<Image[]>(`${BASE}/upload_many`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
   });

   return res.data;
}

export async function deleteImage(id: number): Promise<void> {
   await apiClient.delete(`${BASE}/${id}`);
}
