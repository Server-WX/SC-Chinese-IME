import { useEffect, useState } from "react";
import "./App.css";
import dict from "./assets/dict.json";

function App() {
  const [code, setCode] = useState("");
  const [fastMode, setFastMode] = useState(false);
  const handleInputUpdate = (e) => {
    let string = e.target.value;
    let result = "";
    let isLastEncoded = false;
    for (const char of string) {
      let v = dict[char];
      if (v) {
        result += "@" + v;
        isLastEncoded = true;
      } else {
        if (isLastEncoded) {
          result += " " + char;
        } else {
          result += char;
        }
        isLastEncoded = false;
      }
    }
    setCode(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  useEffect(() => {
    if (fastMode) navigator.clipboard.writeText(code);
  }, [code, fastMode]);

  return (
    <>
      <div>
        <textarea id="input-chinese" name="input-chinese" rows="5" onChange={handleInputUpdate} />
        <textarea id="ouput-code" name="output-code" rows="5" disabled value={code} />
        <button id="btn-copy" onClick={copyToClipboard}>
          复制结果
        </button>
        <input type="checkbox" id="toggle-fast-mode" onChange={(e) => setFastMode(e.target.checked)} />
        <label htmlFor="toggle-fast-mode">键盘侠模式</label>
      </div>
    </>
  );
}

export default App;
