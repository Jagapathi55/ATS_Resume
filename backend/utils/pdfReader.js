import fs from "fs";
import pdfjsLib from "pdfjs-dist/build/pdf.js";

pdfjsLib.GlobalWorkerOptions.workerSrc = "";

export const extractPDFText = async (filePath) => {
  const data = new Uint8Array(fs.readFileSync(filePath));

  const loadingTask = pdfjsLib.getDocument({ data });
  const pdf = await loadingTask.promise;

  let fullText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    const strings = content.items.map((item) => item.str);
    fullText += strings.join(" ") + "\n";
  }

  return fullText.trim();
};
