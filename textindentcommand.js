/**
 * @module text-indent/textindentcommand
 */
import Command from '@ckeditor/ckeditor5-core/src/command';
import first from '@ckeditor/ckeditor5-utils/src/first';

const TEXTINDENT = 'textindent';

/**
 * The textindent command plugin.
 *
 * @extends module:core/command~Command
 */
export default class TextIndentCommand extends Command {
	/**
	 * @inheritDoc
	 */
	refresh() {
		const firstBlock = first(this.editor.model.document.selection.getSelectedBlocks());
		this.isEnabled = !!firstBlock && this._canBeAligned(firstBlock);

		// 设置按钮状态
		if (this.isEnabled && firstBlock.hasAttribute(TEXTINDENT)) {
			this.value = firstBlock.getAttribute(TEXTINDENT);
		} else {
			this.value = null;
		}
	}

	/**
	 * @inheritDoc
	 */
	execute() {
		const editor = this.editor;
		const model = editor.model;
		const doc = model.document;

		model.change(writer => {
			const blocks = Array.from(doc.selection.getSelectedBlocks()).filter(block => this._canBeAligned(block));
			const currentTextIndent = blocks[0].getAttribute(TEXTINDENT);
			const removeTextIndent = currentTextIndent === TEXTINDENT || !TEXTINDENT;

			if (removeTextIndent) {
				removeTextIndentFromSelection(blocks, writer);
			} else {
				setTextIndentOnSelection(blocks, writer, TEXTINDENT);
			}
		});
	}

	_canBeAligned(block) {
		return this.editor.model.schema.checkAttribute(block, TEXTINDENT);
	}
}

// Removes the textindent attribute from blocks.
// @private
function removeTextIndentFromSelection(blocks, writer) {
	for (const block of blocks) {
		writer.removeAttribute(TEXTINDENT, block);
	}
}

// Sets the textindent attribute on blocks.
// @private
function setTextIndentOnSelection(blocks, writer, textindent) {
	for (const block of blocks) {
		writer.setAttribute(TEXTINDENT, textindent, block);
	}
}