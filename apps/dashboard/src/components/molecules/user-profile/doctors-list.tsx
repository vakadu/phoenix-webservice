import { useGetDoctors } from '@webservices/api';
import UserProfileImage from '../../atoms/user-profile';
import { PlusIcon } from '@webservices/icons';
import { BoxLoader } from '@webservices/ui';

const DoctorsList = () => {
	const { data, isPending } = useGetDoctors();

	if (isPending) {
		return <BoxLoader rows={1} columns={4} coverHeight={144} />;
	}

	return (
		<section className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-24 ">
			{data?.data?.doctors?.map((doctor) => {
				return (
					<section className="cursor-pointer" key={doctor._id}>
						<UserProfileImage
							id={doctor?.doctor?.doctorId}
							containerClasses="!w-[154px] !h-[154px]"
							imageClasses="!rounded-8"
							iconHeight={154}
							iconWidth={154}
						/>
						<span className="pt-8 block">{doctor?.doctor?.name}</span>
					</section>
				);
			})}
			<section className="w-[154px] h-[154px] border border-dashed border-primary-1 rounded-8 flex items-center justify-center cursor-pointer">
				<section className="w-[58px] h-[58px] bg-primary-1 flex items-center justify-center rounded-full">
					<PlusIcon className="text-white" />
				</section>
			</section>
		</section>
	);
};

export default DoctorsList;
