import { toPng } from "html-to-image";
import jsPDF from "jspdf";

export async function downloadResumePDF() {
  const node = document.getElementById("resume-preview");
  if (!node) return alert("Preview not found!");

  const dataUrl = await toPng(node, { pixelRatio: 2 });

  const pdf = new jsPDF("p", "mm", "a4");
  const width = pdf.internal.pageSize.getWidth();
  pdf.addImage(dataUrl, "PNG", 0, 0, width, 0);
  pdf.save("resume.pdf");
}
