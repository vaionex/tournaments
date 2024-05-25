import {
  BoldItalicUnderlineToggles,
  headingsPlugin,
  listsPlugin,
  ListsToggle,
  MDXEditor,
  toolbarPlugin,
  UndoRedo,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import "./rule-description-editor.css";

export default function RuleDescriptionEditor({ value, onChange }) {
  return (
    <MDXEditor
      markdown={value}
      onChange={onChange}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              {" "}
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <ListsToggle />
            </>
          ),
        }),
      ]}
      className="![--baseBg:black] ![--baseBgActive:#333] ![--baseTextContrast:white]"
      contentEditableClassName="!prose-sm !prose-invert h-44"
      placeholder="Details"
    />
  );
}
