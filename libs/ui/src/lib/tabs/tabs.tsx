"use client"

import { Tab } from '@headlessui/react';

  
interface TabsProps {
	tabs: any;
	onTabChange?: (index: number) => void;
	containerClasses?: string;
	tabItemClasses?: string;
	panelClasses?: string;
	defaultIndex?: number;
}

export function Tabs(props: TabsProps) {
	const { tabs, onTabChange, containerClasses, tabItemClasses, panelClasses, defaultIndex } = props;

	return (
		<Tab.Group defaultIndex={defaultIndex} onChange={onTabChange}>
			<Tab.List className={`flex ${containerClasses}`}>
				{tabs.map((tabItem: any) => (
					<Tab
						key={tabItem.title}
						className={({ selected }) => 
							`px-12 text-14 focus:outline-none ${selected ? 'border-b-2 border-brand text-brand font-semibold' : ''} ${tabItemClasses}`
						}
					>
						{tabItem.title}
					</Tab>
				))}
			</Tab.List>
			<Tab.Panels className={`${panelClasses}`}>
				{tabs.map((tabItem: any, idx: number) => (
					<Tab.Panel
						key={idx}
					>
						{tabItem.content}
					</Tab.Panel>
				))}
			</Tab.Panels>
		</Tab.Group>
	);
}

export default Tabs;
