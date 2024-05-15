import React, {useRef, useState} from 'react';
import JoditEditor from "jodit-react";

const Editor = ({placeholder} : {placeholder: string}) => {
    const editor = useRef(null);
    const [content, setContent] = useState<string>('');
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