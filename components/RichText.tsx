import { useState } from 'react';
import { NextComponentType } from 'next';

import SunEditor, {buttonList} from 'suneditor-react';

type RichTextProps = {
  onContentChange: Function;
}

const RichText: NextComponentType<any, any, RichTextProps> = ({ onContentChange }) => {
  const [content, setContent] = useState('');

  return (
    <SunEditor
      showToolbar={true}
      enableToolbar={true}
      setOptions={{
        height: 300,
        buttonList: buttonList.complex
      }}
      setContents={content}
      onChange={(value) => {
        setContent(value);
        onContentChange(value);
      }}
    />
  );
}

export default RichText;