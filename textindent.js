/**
 * @module text-indent/textindent
 */
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import TextIndentEditing from './textindentediting';
import TextIndentUI from './textindentui';

export default class TextIndent extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [TextIndentEditing, TextIndentUI];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'TextIndent';
	}
}