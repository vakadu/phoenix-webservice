// // bugsnag.ts
// import Bugsnag from '@bugsnag/js';
// import BugsnagPluginReact from '@bugsnag/plugin-react';

// // Initialize Bugsnag with the React plugin
// const bugsnagClient = Bugsnag.start({
// 	apiKey: process.env.NEXT_PUBLIC_BUG_SNAG_API_KEY as string,
// 	plugins: [BugsnagPluginReact], // Make sure the plugin is added here
// });

// // Check if the plugin was loaded correctly
// const reactPlugin = bugsnagClient.getPlugin('react');
// if (!reactPlugin) {
// 	throw new Error('Bugsnag React plugin failed to load');
// }

// // Export the client and the error boundary component
// export const ErrorBoundary = reactPlugin.createErrorBoundary();
// export default bugsnagClient;
