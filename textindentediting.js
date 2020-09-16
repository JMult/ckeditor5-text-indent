/**
 * @module text-indent/textindentediting
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import TextIndentCommand from './textindentcommand';

export default class TextIndentEditing extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'TextIndentEditing';
	}

	/**
	 * @inheritDoc
	 */
	constructor(editor) {
		super(editor);

		editor.config.define('textIndentValue', '2em');
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const schema = editor.model.schema;

		const indentValue = editor.config.get('textIndentValue');

		// Allow textindent attribute on all blocks.
		schema.extend('$block', { allowAttributes: 'textindent' });
		editor.model.schema.setAttributeProperties('textindent', { isFormatting: true });

		const definition = {
			model: {
				key: 'textindent',
				values: ['textindent']
			},
			view: {
				textindent: {
					key: 'style',
					value: {
						'text-indent': indentValue
						// , width: '50%'
						// , margin: '5px'
					}
				}
			}
		};

		editor.conversion.attributeToAttribute(definition);

		editor.commands.add('textindent', new TextIndentCommand(editor));
	}
}