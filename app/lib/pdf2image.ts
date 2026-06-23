
export interface PdfConversionResult {
    imageUrl: string;
    file: File | null;
    error?: string;
}

export async function convertPdfToImage(
    file: File
): Promise<PdfConversionResult> {
    try {
        const pdfjsLib = await import("pdfjs-dist");
        //  Stable worker
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
        // 1. Load PDF.js document
        const arrayBuffer = await file.arrayBuffer();

        const pdf = await pdfjsLib
            .getDocument({ data: arrayBuffer })
            .promise;

        // 2. Get first page (resume preview)
        const page = await pdf.getPage(1);

        // 3. Render scale (2 is safe & fast)
        const viewport = page.getViewport({ scale: 2 });

        // 4. Create canvas
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) {
            return {
                imageUrl: "",
                file: null,
                error: "Canvas context not available",
            };
        }

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";

        // 5. Render PDF page into canvas
        await page.render({
            canvasContext: context,
            viewport,
        }).promise;

        // 6. Convert canvas → Blob
        const blob: Blob | null = await new Promise((resolve) => {
            canvas.toBlob((b) => resolve(b), "image/png", 1.0);
        });

        if (!blob) {
            return {
                imageUrl: "",
                file: null,
                error: "Failed to generate image blob",
            };
        }

        // 7. Convert Blob → File (for Puter upload)
        const fileName = file.name.replace(/\.pdf$/i, "");
        const imageFile = new File([blob], `${fileName}.png`, {
            type: "image/png",
        });

        // 8. Return result
        return {
            imageUrl: URL.createObjectURL(blob),
            file: imageFile,
        };

    } catch (err) {
        return {
            imageUrl: "",
            file: null,
            error: `PDF conversion failed: ${err}`,
        };
    }
}