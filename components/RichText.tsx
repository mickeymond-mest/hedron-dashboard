// @ts-nocheck

import { useState, Fragment } from 'react';
import { NextComponentType } from 'next';

import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
// import createEditorStateWithText from 'draft-js-plugins-editor/lib/utils/createEditorStateWithText';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import { stateToHTML } from 'draft-js-export-html';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
} from 'draft-js-buttons';

const InlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = InlineToolbarPlugin;
const plugins = [InlineToolbarPlugin];

type RichTextProps = {
  onContentChange: Function;
}

const RichText: NextComponentType<any, any, RichTextProps> = ({ onContentChange }) => {
  const [content, setContent] = useState(EditorState.createEmpty());

  return (
    <Fragment>
      <div className="bx--row">
        <div className="bx--col">
          <label className="hedron-label">Full Product Description</label>
        </div>
      </div>
      <div className="editor">
        <Editor
          editorState={content}
          onChange={editorContent => {
            onContentChange(stateToHTML(editorContent.getCurrentContent()));
            setContent(editorContent);
          }}
          plugins={plugins}
        />
        <InlineToolbar>
          {
            externalProps => (
              <Fragment>
                <ItalicButton {...externalProps} />
                <BoldButton {...externalProps} />
                <UnderlineButton {...externalProps} />
                <UnorderedListButton {...externalProps} />
                <HeadlineOneButton {...externalProps} />
                <HeadlineTwoButton {...externalProps} />
                <HeadlineThreeButton {...externalProps} />
                <OrderedListButton {...externalProps} />
              </Fragment>
            )
          }
        </InlineToolbar>
      </div>
    </Fragment>
  );
}

export default RichText;