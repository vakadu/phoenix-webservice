'use client';

const Dashboard = () => {
	return (
		<div>
			{Array.from({ length: 100 }).map((_, i) => {
				return <div>{i}</div>;
			})}
			dashboiard
		</div>
	);
};

export default Dashboard;
