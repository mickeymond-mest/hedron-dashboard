import { useState, Fragment } from 'react';
import { NextComponentType } from 'next';

import RichTextEditor from 'react-rte';

type RichTextProps = {
  onContentChange: Function;
}

const RichText: NextComponentType<any, any, RichTextProps> = ({ onContentChange }) => {
  const [content, setContent] = useState(RichTextEditor.createEmptyValue())

  return (
    <Fragment>
      <div className="bx--row">
        <div className="bx--col">
          <label className="hedron-label">Full Product Description</label>
        </div>
      </div>
      <div className="editor">
        <RichTextEditor
          value={content}
          onChange={editorContent => {
            onContentChange(editorContent.toString('html'));
            setContent(editorContent);
          }}
        />
      </div>
    </Fragment>
  );
}

export default RichText;