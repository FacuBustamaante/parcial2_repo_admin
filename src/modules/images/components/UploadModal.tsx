import { useCallback, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadImages } from "../services/ImageService";

interface UploadModalProps {
   onClose: () => void;
   onUpload?: (urls: string[]) => void;
}

export default function UploadModal({ onClose, onUpload }: UploadModalProps) {
   const [files, setFiles] = useState<File[]>([]);
   const [dragging, setDragging] = useState(false);
   const inputRef = useRef<HTMLInputElement>(null);
   const queryClient = useQueryClient();

   const mutation = useMutation({
      mutationFn: () => uploadImages(files),
      onSuccess: (result) => {
         queryClient.invalidateQueries({ queryKey: ["images"] });
         onUpload?.(result.map((img) => img.url));
         onClose();
      },
   });

   const addFiles = useCallback((incoming: FileList | null) => {
      if (!incoming) return;
      const valid = Array.from(incoming).filter((f) =>
         f.type.startsWith("image/"),
      );
      setFiles((prev) => {
         const existing = new Set(prev.map((f) => f.name + f.size));
         return [...prev, ...valid.filter((f) => !existing.has(f.name + f.size))];
      });
   }, []);

   const removeFile = (index: number) =>
      setFiles((prev) => prev.filter((_, i) => i !== index));

   const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      addFiles(e.dataTransfer.files);
   };

   return (
      <div
         className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
         onClick={(e) => e.target === e.currentTarget && onClose()}
      >
         <div className="bg-zinc-900 border border-white/8 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/6">
               <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-linear-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center">
                     <svg
                        className="w-3.5 h-3.5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2.5}
                           d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                        />
                     </svg>
                  </div>
                  <h2 className="text-base font-semibold text-white">
                     Upload images
                  </h2>
               </div>
               <button
                  onClick={onClose}
                  className="text-zinc-500 hover:text-zinc-300 transition-colors p-1 rounded-lg hover:bg-white/5"
               >
                  <svg
                     className="w-5 h-5"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                     />
                  </svg>
               </button>
            </div>

            {/* Drop zone */}
            <div className="px-6 pt-5">
               <div
                  onClick={() => inputRef.current?.click()}
                  onDragOver={(e) => {
                     e.preventDefault();
                     setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={handleDrop}
                  className={`cursor-pointer rounded-xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center gap-3 py-11
              ${dragging
                        ? "border-violet-500 bg-violet-500/10 shadow-lg shadow-violet-500/10"
                        : "border-zinc-700 hover:border-violet-500/60 hover:bg-violet-500/5"
                     }`}
               >
                  <div
                     className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${dragging ? "bg-violet-500/20" : "bg-zinc-800"}`}
                  >
                     <svg
                        className={`w-6 h-6 transition-colors ${dragging ? "text-violet-400" : "text-zinc-500"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={1.5}
                           d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                        />
                     </svg>
                  </div>
                  <div className="text-center">
                     <p className="text-sm text-zinc-300">
                        <span className="font-semibold text-violet-400">
                           Click to browse
                        </span>{" "}
                        or drag & drop
                     </p>
                     <p className="text-xs text-zinc-600 mt-1">
                        PNG, JPG, GIF, WEBP · max 10 MB each
                     </p>
                  </div>
                  <input
                     ref={inputRef}
                     type="file"
                     multiple
                     accept="image/*"
                     className="hidden"
                     onChange={(e) => addFiles(e.target.files)}
                  />
               </div>
            </div>

            {/* File list */}
            {files.length > 0 && (
               <ul className="px-6 mt-4 max-h-48 overflow-y-auto space-y-1.5">
                  {files.map((file, i) => (
                     <li
                        key={i}
                        className="flex items-center gap-3 bg-zinc-800/70 hover:bg-zinc-800 rounded-xl px-3 py-2.5 transition-colors group/item"
                     >
                        <img
                           src={URL.createObjectURL(file)}
                           alt={file.name}
                           className="w-9 h-9 object-cover rounded-lg shrink-0 border border-white/5"
                        />
                        <div className="min-w-0 flex-1">
                           <p className="text-sm text-zinc-200 truncate font-medium">
                              {file.name}
                           </p>
                           <p className="text-xs text-zinc-500 mt-0.5">
                              {file.size < 1024 * 1024
                                 ? `${(file.size / 1024).toFixed(1)} KB`
                                 : `${(file.size / (1024 * 1024)).toFixed(1)} MB`}
                           </p>
                        </div>
                        <button
                           onClick={() => removeFile(i)}
                           className="text-zinc-600 hover:text-red-400 transition-colors opacity-0 group-hover/item:opacity-100 shrink-0"
                        >
                           <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth={2}
                                 d="M6 18L18 6M6 6l12 12"
                              />
                           </svg>
                        </button>
                     </li>
                  ))}
               </ul>
            )}

            {/* Error */}
            {mutation.isError && (
               <div className="mx-6 mt-4 flex items-start gap-2.5 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2.5">
                  <svg
                     className="w-4 h-4 text-red-400 mt-0.5 shrink-0"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                     />
                  </svg>
                  <p className="text-sm text-red-400">
                     {(mutation.error as Error).message}
                  </p>
               </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 mt-3 border-t border-white/6">
               <span className="text-xs text-zinc-600">
                  {files.length > 0
                     ? `${files.length} file${files.length > 1 ? "s" : ""} selected`
                     : "No files selected"}
               </span>
               <div className="flex items-center gap-2">
                  <button
                     type="button"
                     onClick={onClose}
                     className="px-4 py-2 text-sm text-zinc-400 hover:text-zinc-200 hover:bg-white/5 rounded-xl transition-colors"
                  >
                     Cancel
                  </button>
                  <button
                     type="button"
                     disabled={files.length === 0 || mutation.isPending}
                     onClick={() => mutation.mutate()}
                     className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold bg-linear-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-violet-500/20 active:scale-95"
                  >
                     {mutation.isPending && (
                        <svg
                           className="w-4 h-4 animate-spin"
                           fill="none"
                           viewBox="0 0 24 24"
                        >
                           <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                           />
                           <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8H4z"
                           />
                        </svg>
                     )}
                     {mutation.isPending ? "Uploading…" : "Upload"}
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}
