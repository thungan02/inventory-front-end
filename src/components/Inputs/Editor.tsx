import React, {useRef, useState} from 'react';
import JoditEditor from "jodit-react";

const Editor = ({placeholder, content, setContent} : {placeholder: string, content: string, setContent: React.Dispatch<React.SetStateAction<string>>}) => {
    const editor = useRef(null);
    const config = {
        readonly: false,
        placeholder: placeholder,
    }

    return (
        <div>
            <JoditEditor
                value={content}
                ref={editor}
                config={config}
                onBlur={(newContent: string) => setContent(newContent)}
            />
        </div>
    );
};

export default Editor;