APP.factory('projectFactory', function() {
	var factory = {};

	factory.projects = [
		{title: 'GazReport.com - Justin Gazabat Realty', 
		 visible: false,
		 subtitle: 'A responsive, JavaScript and jQuery driven, mostly single page site.',
	 	 content: {
	 		features: ['Home baked tab-navigation / routing.',
	 								'3rd party API integration for property ' + 
	 								'search & contact information capture.',
	 								'Sweet view tracking with GA.',
	 								'Mobile optimized design',
	 								'Matching custom WordPress template for the blog.',
	 								],
	 		 technologies: ['JavaScript','jQuery','HTML5','CSS3','WordPress'],
	 		 pictures: ["img/gr/ss2.jpg", "img/gr/ss1.jpg"],
	 		 link: {url: 'http://lousnk.com/GazReport', title: 'The Gaz Report'}
	 		}
		},
		{title: 'Monthly Budgeter', 
		 visible: false,
		 subtitle: 'A fun and simple ugly duckling of a monthly budget calculator.',
		 content: {
	 		features: ['Built with JavaScript and jQuery, this APP was created to ' +
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
	 		 technologies: ['JavaScript','jQuery','HTML','CSS3'],
	 		 pictures: ["img/budgeter/ss1.jpg"],
	 		 link: {url: 'http://louisnk.com/budgeter', title: 'Budgeter'}
	 		}
		},
		{title: 'Alpha Kappa Psi - Omega Beta',
		 visible: true,
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
	 		 technologies: ['PHP 5.5','MySQL 5.5','jQuery','HTML','CSS3','Ubuntu','LAMP'],
	 		 pictures: ["img/akpsi/ss2.gif", "img/akpsi/ss1.gif"],
	 		 link: {url: 'http://louisnk.com/akpsi', title: "AKPSi OB WebApp"}
	 		}
		},
		{title: 'A.B.C. Montana', 
		 visible: false,
		 subtitle: 'A custom WordPress theme with a few custom JavaScript features',
		 content: {
	 		features: ['Sticky navigation bar',
	 								'Custom contact plugin',
	 								'Basic SEO optimization',
	 								'Full social-media integration',
	 								'GoogleAnalytics',
	 							],
	 		 technologies: ['WordPress','JavaScript','jQuery','HTML','CSS3'],
	 		 pictures: ["img/abc/ss2.gif", "img/abc/ss1.gif"],
	 		 link: {url: 'http://louisnk.com/abc', title: 'A small WordPress APP'}
	 		}
		},
		{title: 'Infinite image carousel & lightbox',
		 visible: false, 
		 subtitle: 'This very tool which you\'re using to my other projects.',
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
	 		 link: {url: 'louisnk.com/carousel', title: 'What you\'re currently using'}
	 		}
		},
		{title: 'Louisnk.com - what you\'re seeing now', 
		 visible: false,
		 subtitle: 'A fun rewrite of my jQuery driven site, into a superior Angular app.',
		 content: {
	 		features: ['It\'s pretty much all Angular.js.',
								 'It uses sweet CSS3 transitions to make snazzy nav buttons.',
								 'You can search my resume for the things you\'re interested in.',
								 'It has these other fun projects on it.',
								 'It helps you see how I will help your team ' +
								 'make sure all of their base r belong to us. '
								 ],
	 		 technologies: ['Angular.js 1.2','HTML5','CSS3','jQuery(on this page)'],
	 		 link: {url: 'http://louisnk.com/', title: 'The site you\'re currently on'}
	 		}
		}

	];

	return factory;
});