APP.factory('projectFactory', function() {
	var factory = {};

	factory.projects = [
		{title: 'TheGazReport.com - Justin Gazabat Realty', 
		 subtitle: 'A responsive, Backbone.js driven, mostly ' +
		 					 'single page site. (Except the blog)',
	 	 content: {
	 		features: ['Backbone.js single page app with a matching blog',
	 								'3rd party API integration for property ' + 
	 								'search & client lead capture.',
	 								'Sweet view tracking with GA.',
	 								'Mobile optimized design',
	 								'Matching custom WordPress template for the blog.',
	 								],
	 		 technologies: ['BackBone.js','jQuery','HTML5','CSS3','WordPress'],
	 		 pictures: ["img/gr/ss2.jpg", "img/gr/ss1.jpg"],
	 		 link: {url: 'http://thegazreport.com', title: 'The Gaz Report'}
	 		}
		},
		{title: 'Monthly Budgeter',
		 subtitle: 'A fun and simple ugly duckling of a monthly budget calculator.',
		 content: {
	 		features: ['Built with JavaScript and jQuery, this tool was created to ' +
	 							 'provide the user with a visual representation of monthly ' + 
	 							 'expenditures as a percentage of their monthly, post-tax income. ',
	 							 'Additionally, I wanted to have the ability to ' +
	 							 'touch or click & drag the different sections of the budget around ' +
	 							 'within the graph for a simpler way to adjust the percentages. ' +
	 							 'To make it as simple as possible, resizing the blocks was done with ' +
	 							 'jQuery UI (I would not choose it again).',
	 							 'It recalculates the user\'s ' +
	 							 'given values in real time. The math is handled in math.js, graph control ' +
	 							 'happens in blobs.js, and main.js handles everything else. ' +
	 							 'Currently the calculations are based on 2014 US Federal Withholdings ' +
	 							 '(Income tax, Medicare/Medicaid, Social Security tax, etc) and only ' +
	 							 'calculates accurately for states with no state income tax. '
	 							],
	 		 technologies: ['JavaScript','jQuery','HTML','CSS'],
	 		 pictures: ["img/budgeter/ss1.jpg"],
	 		 link: {url: 'http://louisnk.com/budgeter', title: 'Budgeter'}
	 		}
		},
		{title: 'Alpha Kappa Psi - Omega Beta',
		 subtitle: 'A responsive, secure platform for organizational management.',
		 content: {
	 		features: ['Fully searchable & sortable members database',
	 								'Role-based access control',
	 								'Complete user and role management',
	 								'Custom content management system',
	 								'Member attendance and dues tracking',
	 								'Expense and budget tracking and reporting',
	 								'Clean and responsive Bootstrap 3 design'
	 								],
	 		 technologies: ['PHP 5.5','MySQL 5.5','jQuery','HTML5','CSS3','LAMP'],
	 		 pictures: ["img/akpsi/ss2.gif", "img/akpsi/ss1.gif"],
	 		 link: {url: 'http://louisnk.com/akpsi', title: "AKPSi OB WebApp"}
	 		}
		},
		{title: 'Infinite image carousel & lightbox',
		 subtitle: 'A simple JavaScript and jQuery photo gallery tool.',
		 content: {
	 		features: ['Simple keyboard navigation (try it)',
	 								'Seamless, infinite rotation throughout the array of images',
	 								'Smooth transitions both in/out of the lightbox, and through image loads',
	 								'Primarily this was created to show off my own photography, ' +
	 								'which I then realized could be made to display anything that I wanted it ' +
	 								'to with minimal effort, so I did that. Making all of the key bindings ' +
	 								'operate as expected, and making it accurately track which array position ' +
	 								'it should be displaying were the most difficult parts.'
	 								],
	 		 technologies: ['jQuery','HTML','CSS3'],
	 		 link: {url: 'http://louisnk.com/carousel', title: 'The original basis for what you\'re currently using'}
	 		}
		},
		{title: 'Louisnk.com - what you\'re seeing now', 
		 subtitle: 'A fun rewrite of my jQuery driven site, into an Angular app.',
		 content: {
	 		features: ['It\'s pretty much all Angular.js.',
								 'It uses sweet CSS3 transitions to make things happen.',
								 'You can search my resume for the things you\'re interested in.',
								 'It has these other fun projects on it.',
								 'It helps you see how I will help your team ' +
								 'do great things. '
								 ],
	 		 technologies: ['Angular.js 1.2','HTML5','CSS3','jQuery(on this page)'],
	 		 link: {url: 'http://louisnk.com/', title: 'The site you\'re currently on'}
	 		}
		}

	];

	return factory;
});