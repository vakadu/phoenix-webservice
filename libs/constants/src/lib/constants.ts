import { DietIcon, OthersIcon, PrescriptionIcon } from '@webservices/icons';

export const dashboardMenuItems = [
	{
		isHeadr: true,
		title: 'menu',
	},

	{
		title: 'Dashboard',
		icon: 'heroicons-outline:home',
		isOpen: true,
		isHide: true,
		child: [
			{
				childtitle: 'Analytics Dashboard',
				childlink: 'analytics',
			},
			{
				childtitle: 'Ecommerce Dashboard',
				childlink: 'ecommerce',
			},
			{
				childtitle: 'Project  Dashbaord',
				childlink: 'project',
			},
			{
				childtitle: ' CRM Dashbaord',
				childlink: 'crm',
			},
			{
				childtitle: 'Banking Dashboard',
				childlink: 'banking',
			},
		],
	},
	{
		title: 'changelog',
		icon: 'heroicons:arrow-trending-up',
		link: 'changelog',
		isHide: false,
		badge: '1.0.0',
	},
	{
		isHeadr: true,
		title: 'apps',
	},

	{
		title: 'Chat',
		isHide: true,
		icon: 'heroicons-outline:chat',
		link: 'chat',
	},

	{
		title: 'Email',
		isHide: true,
		icon: 'heroicons-outline:mail',
		link: 'email',
	},

	{
		title: 'Kanban',
		isHide: true,
		icon: 'heroicons-outline:view-boards',
		link: 'kanban',
	},
	{
		title: 'Calender',
		isHide: true,
		icon: 'heroicons-outline:calendar',
		link: 'calender',
	},

	{
		title: 'Todo',
		isHide: true,
		icon: 'heroicons-outline:clipboard-check',
		link: 'todo',
	},

	{
		title: 'Projects',
		icon: 'heroicons-outline:document',
		link: '#',
		isHide: true,
		child: [
			{
				childtitle: 'Projects',
				childlink: 'projects',
			},
			{
				childtitle: 'Project Details',
				childlink: 'project-details',
			},
		],
	},
	{
		isHeadr: true,
		title: 'Pages',
	},
	{
		title: 'Authentication',
		icon: 'heroicons-outline:lock-closed',
		link: '#',
		child: [
			{
				childtitle: 'Signin One',
				childlink: '/',
			},
			{
				childtitle: 'Signin Two',
				childlink: '/login2',
			},
			{
				childtitle: 'Signin Three',
				childlink: '/login3',
			},
			{
				childtitle: 'Signup One',
				childlink: '/reg',
			},
			{
				childtitle: 'Signup Two',
				childlink: '/reg2',
			},
			{
				childtitle: 'Signup Three',
				childlink: '/reg3',
			},
			{
				childtitle: 'Forget Password One',
				childlink: '/forgot-password',
			},
			{
				childtitle: 'Forget Password Two',
				childlink: '/forgot-password2',
			},
			{
				childtitle: 'Forget Password Three',
				childlink: '/forgot-password3',
			},
			{
				childtitle: 'Lock Screen One',
				childlink: '/lock-screen',
			},
			{
				childtitle: 'Lock Screen Two',
				childlink: '/lock-screen2',
			},
			{
				childtitle: 'Lock Screen Three',
				childlink: '/lock-screen3',
			},
		],
	},
	{
		title: 'Utility',
		icon: 'heroicons-outline:view-boards',
		link: '#',
		isHide: false,
		child: [
			{
				childtitle: 'Invoice',
				childlink: 'invoice',
			},
			{
				childtitle: 'Pricing',
				childlink: 'pricing',
			},
			// {
			//   childtitle: "Testimonial",
			//   childlink: "testimonial",
			// },
			{
				childtitle: 'FAQ',
				childlink: 'faq',
			},
			{
				childtitle: 'Blog',
				childlink: 'blog',
			},
			{
				childtitle: 'Blank page',
				childlink: 'blank-page',
			},
			{
				childtitle: 'Prfoile',
				childlink: 'profile',
			},
			{
				childtitle: 'Settings',
				childlink: 'settings',
			},
			{
				childtitle: '404 page',
				childlink: 'error-page',
			},

			{
				childtitle: 'Coming Soon',
				childlink: 'coming-soon',
			},
			{
				childtitle: 'Under Maintanance page',
				childlink: 'under-construction',
			},
		],
	},
	{
		isHeadr: true,
		title: 'Elements',
	},
	{
		title: 'Widgets',
		icon: 'heroicons-outline:view-grid-add',
		link: '#',
		child: [
			{
				childtitle: 'Basic',
				childlink: 'basic',
			},
			{
				childtitle: 'Statistic',
				childlink: 'statistic',
			},
		],
	},
	{
		title: 'Components',
		icon: 'heroicons-outline:collection',
		link: '#',
		child: [
			{
				childtitle: 'Typography',
				childlink: 'typography',
			},
			{
				childtitle: 'Colors',
				childlink: 'colors',
			},
			{
				childtitle: 'Alert',
				childlink: 'alert',
			},
			{
				childtitle: 'Button',
				childlink: 'button',
			},
			{
				childtitle: 'Card',
				childlink: 'card',
			},
			{
				childtitle: 'Carousel',
				childlink: 'carousel',
			},
			{
				childtitle: 'Dropdown',
				childlink: 'dropdown',
			},

			{
				childtitle: 'Modal',
				childlink: 'modal',
			},
			{
				childtitle: 'Progress bar',
				childlink: 'progress-bar',
			},
			{
				childtitle: 'Placeholder',
				childlink: 'placeholder',
			},
			{
				childtitle: 'Tab & Accordion',
				childlink: 'tab-accordion',
			},
			{
				childtitle: 'Badges',
				childlink: 'badges',
			},
			{
				childtitle: 'Paginatins',
				childlink: 'paginations',
			},
			{
				childtitle: 'Video',
				childlink: 'video',
			},
			{
				childtitle: 'Tooltip & Popover',
				childlink: 'tooltip-popover',
			},
		],
	},
	{
		title: 'Forms',
		icon: 'heroicons-outline:clipboard-list',
		link: '#',
		child: [
			{
				childtitle: 'Input',
				childlink: 'input',
			},
			{
				childtitle: 'Input group',
				childlink: 'input-group',
			},
			{
				childtitle: 'Input layout',
				childlink: 'input-layout',
			},
			{
				childtitle: 'Form validation',
				childlink: 'form-validation',
			},
			{
				childtitle: 'Wizard',
				childlink: 'form-wizard',
			},
			{
				childtitle: 'Input mask',
				childlink: 'input-mask',
			},
			{
				childtitle: 'File input',
				childlink: 'file-input',
			},
			{
				childtitle: 'Form repeater',
				childlink: 'form-repeater',
			},
			{
				childtitle: 'Textarea',
				childlink: 'textarea',
			},
			{
				childtitle: 'Checkbox',
				childlink: 'checkbox',
			},
			{
				childtitle: 'Radio button',
				childlink: 'radio-button',
			},
			{
				childtitle: 'Switch',
				childlink: 'switch',
			},
			{
				childtitle: 'Select & Vue select',
				childlink: 'select',
			},
			{
				childtitle: 'Date time picker',
				childlink: 'date-time-picker',
			},
		],
	},
	{
		title: 'Table',
		icon: 'heroicons-outline:table',
		link: '#',
		child: [
			{
				childtitle: 'Basic Table',
				childlink: 'table-basic',
			},
			{
				childtitle: 'React Table',
				childlink: 'react-table',
			},
		],
	},
	{
		title: 'Chart',
		icon: 'heroicons-outline:chart-bar',
		link: '#',
		child: [
			{
				childtitle: 'Apex chart',
				childlink: 'appex-chart',
			},
			{
				childtitle: 'Chart js',
				childlink: 'chartjs',
			},
			{
				childtitle: 'Recharts',
				childlink: 'recharts',
			},
		],
	},
	{
		title: 'Map',
		icon: 'heroicons-outline:map',
		link: 'map',
	},
	{
		title: 'Icons',
		icon: 'heroicons-outline:emoji-happy',
		link: 'icons',
	},
	{
		title: 'Multi Level',
		icon: 'heroicons:share',
		link: '#',
		child: [
			{
				childtitle: 'Level 1.1',
				childlink: 'icons',
			},
			{
				childtitle: 'Level 1.2',
				childlink: 'Level-1',
				multi_menu: [
					{
						multiTitle: 'Level 2.1',
						multiLink: 'Level-2',
					},
					{
						multiTitle: 'Level 2.2',
						multiLink: 'Level-2.3',
					},
				],
			},
		],
	},
];

export const medicalRecordsFilters = [
	{
		id: 0,
		name: 'Prescription',
		label: 'Prescription',
		value: 'PRESCRIPTION',
		icon: PrescriptionIcon,
	},
	{
		id: 1,
		name: 'Report',
		label: 'Report',
		value: 'REPORT',
		icon: PrescriptionIcon,
	},
	{
		id: 2,
		name: 'Diet',
		label: 'Diet',
		value: 'DIET',
		icon: DietIcon,
	},
	{
		id: 3,
		name: 'Other Document',
		label: 'Other Documents',
		value: 'OTHER',
		icon: OthersIcon,
	},
] as ICommonTypes.IMedicalRecords[];

export const vaccinationClinicFilters = [
	{
		id: 0,
		name: 'Pending',
		label: 'Pending',
		value: 'PENDING',
		icon: PrescriptionIcon,
	},
	{ id: 1, name: 'Complete', label: 'Complete', value: 'COMPLETE', icon: PrescriptionIcon },
	{ id: 3, name: 'All', label: 'All', value: 'ALL', icon: PrescriptionIcon },
] as ICommonTypes.IMedicalRecords[];

export const vaccinationParentFilters = [
	{
		id: 0,
		name: 'Upcoming',
		label: 'Pending',
		value: 'PENDING',
	},
	{
		id: 1,
		name: 'Upcoming',
		label: 'Upcoming',
		value: 'UPCOMING',
	},
	{ id: 2, name: 'Complete', label: 'Complete', value: 'COMPLETE' },
	{ id: 3, name: 'All', label: 'All', value: '' },
] as ICommonTypes.IMedicalRecords[];

export const follwupFilters = [
	{
		id: 0,
		name: 'Upcoming',
		label: 'Upcoming',
		value: 'UPCOMING',
	},
	{ id: 1, name: 'All', label: 'All', value: 'ALL' },
] as ICommonTypes.IMedicalRecords[];

export const dogAndCatVaccines = [
	{ key: 'DHPPi+L', label: 'DHPPi+L' },
	{ key: 'DHPPi', label: 'DHPPi' },
	{ key: 'Corona', label: 'Corona' },
	{ key: 'Anti-Rabies', label: 'Anti-Rabies' },
	{ key: 'Kennel Cough', label: 'Kennel Cough' },
	{ key: 'CRP', label: 'CRP' },
	{ key: '10 in 1', label: '10 in 1' },
	{ key: '9 in 1', label: '9 in 1' },
	{ key: '7 in 1', label: '7 in 1' },
	{ key: 'DHPPi & Anti-Rabies', label: 'DHPPi & Anti-Rabies' },
	{ key: 'DHPPi & Kennel Cough', label: 'DHPPi & Kennel Cough' },
	{ key: 'DHPPi & Corona', label: 'DHPPi & Corona' },
	{ key: 'Corona & Kennel Cough', label: 'Corona & Kennel Cough' },
	{ key: 'Corona & Anti-Rabies', label: 'Corona & Anti-Rabies' },
	{ key: 'Kennel Cough & Anti-Rabies', label: 'Kennel Cough & Anti-Rabies' },
	{ key: 'CRP & Anti-Rabies', label: 'CRP & Anti-Rabies' },
	{ key: 'DHPPi & Deworming', label: 'DHPPi & Deworming' },
	{ key: 'Corona & Deworming', label: 'Corona & Deworming' },
	{ key: 'Kennel Cough & Deworming', label: 'Kennel Cough & Deworming' },
	{ key: 'Anti-Rabies & Deworming', label: 'Anti-Rabies & Deworming' },
	{ key: 'CRP & Deworming', label: 'CRP & Deworming' },
	{ key: 'DHPPi, Anti-Rabies & Corona', label: 'DHPPi, Anti-Rabies & Corona' },
	{ key: 'DHPPi, Anti-Rabies & Kennel Cough', label: 'DHPPi, Anti-Rabies & Kennel Cough' },
	{ key: 'Anti-Rabies, Corona & Kennel Cough', label: 'Anti-Rabies, Corona & Kennel Cough' },
];

export const followupData = [
	{ key: 'Deworming', label: 'Deworming' },
	{ key: 'Grooming', label: 'Grooming' },
	{ key: 'Blood Test', label: 'Blood Test' },
	{ key: 'Spot On', label: 'Spot On' },
	{ key: 'NexGard', label: 'NexGard' },
	{ key: 'Tetanus', label: 'Tetanus' },
	{ key: '1st Post Bite Rabies', label: '1st Post Bite Rabies' },
	{ key: '2nd Post Bite Rabies', label: '2nd Post Bite Rabies' },
	{ key: '3rd Post Bite Rabies', label: '3rd Post Bite Rabies' },
	{ key: '4th Post Bite Rabies', label: '4th Post Bite Rabies' },
	{ key: '5th Post Bite Rabies', label: '5th Post Bite Rabies' },
	{ key: 'Treatment Follow-up', label: 'Treatment Follow-up' },
	{ key: 'Post-Surgery Checkup', label: 'Post-Surgery Checkup' },
	{ key: 'Behavior Evaluation', label: 'Behavior Evaluation' },
	{ key: 'Injury or Wound', label: 'Injury or Wound' },
	{ key: 'Diet and Nutrition Review', label: 'Diet and Nutrition Review' },
	{ key: 'Diagnostic Test', label: 'Diagnostic Test' },
];
