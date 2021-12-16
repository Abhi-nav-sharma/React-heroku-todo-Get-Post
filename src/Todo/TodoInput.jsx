import { useState } from "react";

export default function TodoInput({ onSubmit }) {
  const [text, setText] = useState("");
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = () => {
    onSubmit && onSubmit(text);
    setText("");
  };
  return (
    <div>
      <input value={text} placeholder="Add something" onChange={handleChange} />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}
