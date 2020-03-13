import { useState, Fragment } from 'react';
import { NextComponentType } from 'next';

import { Editor, EditorState, RichUtils } from 'draft-js';
import { Button } from 'carbon-components-react';

import TextBold32 from '@carbon/icons-react/es/text--bold/32';
import TextItalic32 from '@carbon/icons-react/es/text--italic/32';
import TextUnderline32 from '@carbon/icons-react/es/text--underline/32';

type RichTextProps = {
  onContentChange: Function;
}

const RichText: NextComponentType<any, any, RichTextProps> = ({ onContentChange }) => {
  const [content, setContent] = useState(EditorState.createEmpty());

  const setFormat = (format: string) => {
    setContent(RichUtils.toggleInlineStyle(content, format));
  }

  return (
    <Fragment>
      <div className="bx--row">
        <div className="bx--col">
          <label className="hedron-label">Full Product Description</label>
        </div>
        <div className="bx--col">
          <Button
            hasIconOnly
            iconDescription="text--bold"
            renderIcon={props => <TextBold32 {...props} />}
            onClick={() => setFormat('BOLD')}
          />
          <Button
            hasIconOnly
            iconDescription="text--italic"
            renderIcon={props => <TextItalic32 {...props} />}
            onClick={() => setFormat('ITALIC')}
          />
          <Button
            hasIconOnly
            iconDescription="text--underline"
            renderIcon={props => <TextUnderline32 {...props} />}
            onClick={() => setFormat('UNDERLINE')}
          />
        </div>
      </div>
      <Editor
        editorState={content}
        onChange={editorContent => {
          onContentChange(editorContent.getCurrentContent().getPlainText());
          setContent(editorContent);
        }}
      />
    </Fragment>
  );
}

export default RichText;