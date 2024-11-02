import { useEffect, useState } from "react";
import "./App.css";
import dict from "./assets/dict.json";
import Icon from "@mdi/react";
import { mdiContentCopy, mdiFire } from "@mdi/js";


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
      <div className="main">
        <textarea id="input-chinese" name="input-chinese" rows="5" onChange={handleInputUpdate} />
        <div className="control-area">
          <button id="btn-copy" onClick={copyToClipboard}>
           <Icon path={mdiContentCopy} size={1} /> 复制结果
          </button>
          <div id="control-fast-mode">
            <label htmlFor="toggle-fast-mode"><Icon path={mdiFire} size={"1.5rem"} /> 键盘侠模式</label>
            <input type="checkbox" id="toggle-fast-mode" onChange={(e) => setFastMode(e.target.checked)} />
          </div>
        </div>
        <textarea id="ouput-code" name="output-code" rows="5" disabled value={code} />
        <p className="descrip">键盘侠模式：输入原文后无需点击“复制结果”按钮，结果会自动复制到剪贴板。</p>
      </div>
    </>
  );
}

export default App;
