import { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const wordCount = (text) => {
  const trimmedText = text.trim();
  if (!trimmedText) return 0;

  return trimmedText.split(/\s+/).length;
};

function App() {
  const [text, setText] = useState("");
  const [isCapitalized, setIsCapitalized] = useState(false);

  const [isBold, setISBold] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [textColor, setTextColor] = useState("#000000");
  const [fontSize, setFontSize] = useState("16");

  const textareaRef = useRef();

  useEffect(() => {
    textareaRef.current.focus();
  }, []);

  const copyText = () => {
    window.navigator.clipboard.writeText(text);
    toast("Text Copied");
  };

  return (
    <>
      <ToastContainer />
      <div className="container  min-w-full h-full flex ">
        <div className="text-editor w-full h-screen p-10 shadow-lg  font-serif text-2xl bg-slate-600">
          <div className="flex flex-wrap justify-between gap-5 ">
            <div className="tool flex gap-2 text-white flex-wrap ">
              <button
                className={`px-4 bg-gray-700 rounded-sm hover:bg-blue-700 `}
                onClick={() => document.execCommand("undo")}
              >
                <b>↺</b>
              </button>
              <button
                className={`px-4 bg-gray-700 rounded-sm hover:bg-blue-700 `}
                onClick={() => document.execCommand("redo")}
              >
                <b>↻</b>
              </button>
              <button
                className={`${
                  !isCapitalized ? "bg-gray-700" : "bg-blue-700"
                } px-4 rounded-sm `}
                onClick={() => setIsCapitalized((prev) => !prev)}
              >
                <i>ABC</i>
              </button>
              <button
                className={`${
                  !isBold ? "bg-gray-700" : "bg-blue-700"
                } px-4 rounded-sm `}
                onClick={() => setISBold((prev) => !prev)}
              >
                <i>
                  <b>B</b>
                </i>
              </button>
              <button
                className={`${
                  !isUnderline ? "bg-gray-700" : "bg-blue-700"
                } px-4 rounded-sm `}
                onClick={() => setIsUnderline((prev) => !prev)}
              >
                <u>U</u>
              </button>
              <button
                className={`${
                  !isItalic ? "bg-gray-700" : "bg-blue-700"
                } px-4 rounded-sm `}
                onClick={() => setIsItalic((prev) => !prev)}
              >
                <i>
                  <u>I</u>
                </i>
              </button>
              <button>
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                />
              </button>
              <select
                className="text-white bg-gray-700 text-sm"
                onChange={(e) => setFontSize(e.target.value)}
              >
                <option>Font-Size</option>
                {[...Array(60).keys()].map((size) => (
                  <option key={size + 1} value={size + 1}>
                    {size + 1}
                  </option>
                ))}
              </select>
            </div>

            <button
              className={`text-white px-4 bg-gray-700 rounded-sm hover:bg-blue-700 `}
              onClick={copyText}
            >
              Copy
            </button>
          </div>

          <div className="editor mt-5 flex flex-col">
            <textarea
              style={{
                fontWeight: isBold ? "bold" : "normal",
                textDecoration: isUnderline ? "underline" : "none",
                color: textColor,
                textTransform: isCapitalized ? "uppercase" : "lowercase",
                fontSize: `${fontSize}px`,
                fontStyle: isItalic ? "italic" : "normal",
              }}
              ref={textareaRef}
              name="text"
              id="text"
              cols="80"
              rows="15"
              className="p-5 "
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>

          <h1 className="mt-5  text-white">Character Counts : {text.length}</h1>
          <h2 className="mt-2  text-white"> Word Counts : {wordCount(text)}</h2>
        </div>
      </div>
    </>
  );
}

export default App;
