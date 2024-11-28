import React, { useCallback, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip";
import pdf from "./ebook.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const Pages = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage" ref={ref}>
      <div>{props.children}</div>
      <div>Page number: {props.number}</div>
    </div>
  );
});


export default function FlipBook() {
  const [numPages, setNumPages] = useState();

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    console.log([...Array(numPages).keys()]);
  }

  const onFlip = useCallback((e) => {
    console.log("Current page: ", e);
  }, []);

  return (
    <>
      <div className="h-screen w-screen flex flex-col gap-5 justify-center items-center bg-gray-900 overflow-hidden">
        <h1 className="text-3xl text-white text-center font-bold">FlipBook-</h1>
        <HTMLFlipBook width={400} height={624} onFlip={onFlip} showCover={true} className="demo-book">
          {[...Array(numPages).keys()].map((pNum) => (
            <Pages key={pNum} number={pNum}>
              <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
                <Page
                  pageNumber={pNum + 1}
                  width={400}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                />
              </Document>
              <div className="text-white position-absolute top-0">
                Page {pNum} of {numPages}
              </div>
            </Pages>
          ))}
          
        </HTMLFlipBook>
      </div>
    </>
  );
}
