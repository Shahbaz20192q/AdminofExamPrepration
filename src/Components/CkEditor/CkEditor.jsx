import React, { useEffect, useRef } from "react";

const CkEditor = ({ value, onChange, id, name }) => {
  const editorInstance = useRef(null);

  useEffect(() => {
    // Dynamically load CKEditor script
    const script = document.createElement("script");
    script.src = "/ckeditor/ckeditor.js"; // Path to your downloaded CKEditor file
    script.onload = () => {
      if (window.CKEDITOR && !editorInstance.current) {
        const editor = window.CKEDITOR.replace(id || "ckeditor"); // Replace the textarea
        editor.setData(value || ""); // Set initial value
        editorInstance.current = editor;
        // Update parent component on editor content change
        editor.on("change", () => {
          const data = editor.getData();
          onChange({ target: { name, value: data } });
        });
      }
    };

    document.body.appendChild(script);

    // Cleanup script and editor instance on unmount
    return () => {
      if (editorInstance.current) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, [id]);

  return <textarea id={id || "ckeditor"} name={name} />;
};

export default CkEditor;
