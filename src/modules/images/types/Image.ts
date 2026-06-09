export interface Image {
   id: number;
   public_id: string;
   url: string;
   filename: string;
   format: string | null;
   width: number | null;
   height: number | null;
   bytes: number | null;
   created_at: string;
}