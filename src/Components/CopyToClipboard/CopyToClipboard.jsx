import { useEffect, useState } from "react";

export function CopyToClipboard({ text }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const copiedTimeout = setTimeout(() => {
      setCopied(false);
    }, 3000);
    return () => clearTimeout(copiedTimeout);
  }, [copied]);

  async function handleClick(text) {
    setCopied(true);
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      {!copied ? (
        <button
          onClick={() => {
            handleClick(text);
          }}
        >
          COPY
        </button>
      ) : (
        <button>SUCCESSFULLY COPIED!</button>
      )}
    </>
  );
}
