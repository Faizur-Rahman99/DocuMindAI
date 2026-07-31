import { useRef } from "react";

import { useUploadDocument } from "../hooks/useUploadDocument";

export default function UploadCard() {

    const fileInputRef =
        useRef<HTMLInputElement>(null);

    const uploadMutation =
        useUploadDocument();

    function handleFileSelect(
        event: React.ChangeEvent<HTMLInputElement>,
    ) {

        const file =
            event.target.files?.[0];

        if (!file) return;

        uploadMutation.mutate(file);

    }

    return (

        <div
            className="
                bg-white
                rounded-xl
                border-2
                border-dashed
                border-slate-300
                p-10
                text-center
                cursor-pointer
                hover:border-blue-500
                transition
            "
            onClick={() =>
                fileInputRef.current?.click()
            }
        >

            <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileSelect}
            />

            <h2 className="text-xl font-semibold">
                Upload Documents
            </h2>

            <p className="text-gray-500 mt-2">
                Click here to upload a file
            </p>

            {uploadMutation.isPending && (

                <p className="mt-4 text-blue-600">

                    Uploading...

                </p>

            )}

        </div>

    );

}