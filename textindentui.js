/**
 * @module text-indent/textindentui
 */
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import Icon from './icons/textindent.svg';

export default class TextIndentUI extends Plugin {

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'TextIndentUI';
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;

		editor.ui.componentFactory.add(`textindent`, locale => {
			const command = editor.commands.get('textindent');
			const buttonView = new ButtonView(locale);

			buttonView.set({
				label: '首行缩进',
				icon: Icon,
				tooltip: true
				, isToggleable: true
			});

			buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

			// Execute command.
			this.listenTo(buttonView, 'execute', () => {
				editor.execute('textindent');
				editor.editing.view.focus();
			});

			return buttonView;
		});
	}

}