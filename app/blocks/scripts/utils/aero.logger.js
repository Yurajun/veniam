export default class {
	constructor() {
		this.origin = console.log;

		this.createUI();

		this.proxyLog();
	}

	createUI() {
		const self = this;

		self.devTools = document.createElement('div');
		self.devTools.className = 'aiui-devtools';
		//

		self.devToolsHeader = document.createElement('header');
		self.devToolsHeader.className = 'aiui-devtools__header';

		self.devToolsContent = document.createElement('section');
		self.devToolsContent.className = 'aiui-devtools__content aiui-scroll';

		self.devToolsList = document.createElement('ul');
		self.devToolsList.className = 'aiui-devtools__list';

		self.devTools.appendChild(self.devToolsHeader);
		self.devTools.appendChild(self.devToolsContent);
		self.devToolsContent.appendChild(self.devToolsList);

		document.body.appendChild(self.devTools);
	}

	log(msg) {
		const self = this;

		const message = `<li class="aiui-devtools__list-item">${msg}</li>`;

		self.devToolsList.innerHTML += message;
	}

	proxyLog() {
		const self = this;

		console.log = function (msg) {
			self.origin.apply(this, arguments);
			self.log(msg);
		};
	}
}
