declare namespace ICommonTypes {
	interface IApiResponse<T> {
		status: 'SUCCESS' | 'ERROR';
		msg: string;
		data: T;
		statusCode: 200 | 201 | 401;
	}
	interface IPermissionType {
		id: number;
		img: ReactNode;
		title: string;
		subtitle: string;
		btn1Txt: string;
	}
	interface ILoginSliderInterface {
		id: number;
		text: string;
		img: ReactNode;
	}
	interface ILayoutType {
		menu: boolean;
		back: boolean;
		logo?: string;
		title?: string;
		onBack?: () => void;
		headerColor?: string;
	}
	interface IMedicalRecords {
		id: 0;
		name: string;
		label: string;
		value: string;
		icon?: ReactNode;
	}
	interface IServicePackageDetail {
		_id: string;
		clinicId: string;
		petHomeId: string | null;
		groomingCenterId: string | null;
		servicePackageItemId: string;
		price: number;
		selectedFacilities: any[];
		active: boolean;
	}
	interface IServicePackage {
		_id: string;
		name: string;
		category: string;
		petSize: string;
		type: string;
		active: boolean;
		updatedBy: string;
		createdAt: string;
		updatedAt: string;
		servicePackageDetail: IServicePackageDetail;
		facilities: string[];
	}
	interface IServicePackagesResponse {
		servicePackages: IServicePackage[];
	}
	interface IPetHomeAddress {
		_id: string;
		district: string;
		line1: string;
		line2: string;
		pincode: string;
		state: string;
		type: string;
		userId: string;
	}

	interface IPetHome {
		_id: string;
		mobile: string;
		name: string;
		petHomeAddress: IPetHomeAddress;
		petHomeId: string;
	}
	interface IClinic {
		clinicId: string;
		name: string;
		mobile: string;
		businessContact: string;
	}

	interface IDoctor {
		profileUrl?: string;
		doctorId: string;
		name: string;
		degree: string;
		speciality: string;
		experience: number;
		mobile?: string;
	}
	interface IParent {
		parentId: string;
		name: string;
		mobile: string;
		profileUrl?: string;
		petNames: string[];
	}
	interface IClinicSlot {
		clinicSlotId: string;
		maxLimit: number;
		slotId: string;
		startHour: number;
		startMinute: number;
		startTimePeriod: string;
		endHour: number;
		endMinute: number;
		endTimePeriod: string;
	}
	interface IAddress {
		_id: string;
		userId: string;
		pincode: string;
		line1: string;
		line2: string;
		state: string;
		district: string;
		type: string;
	}
	interface IPet {
		petId: string;
		name: string;
		gender: string;
		dob: string;
		breed: string;
		type: string;
	}
	interface ISlotDetail {
		scheduleId: string;
		maxLimit: number;
		active: boolean;
		clinicSlotId: string;
	}
	type ILoginAccess = 'ALLOW' | 'REMOVE';

	interface IDateCalender {
		dateString: string;
		day: number;
		month: number;
		timestamp: number;
		year: number;
	}
	type TabItem = {
		id: number;
		name: string;
		component: React.ComponentType;
		allowedRoles?: string[];
		params?: any;
		options: {
			headerShown: boolean;
			title: string;
			tabBarIcon: (props: { focused: boolean }) => JSX.Element;
		};
	};
	interface IMarkedDates {
		[dateString: string]: {
			selected: boolean;
			marked: boolean;
			selectedColor?: string;
			todayBackgroundColor?: string;
		};
	}
	interface ILoginFormDetails {
		mobileNumber: string;
		form: 'login' | 'otp' | 'signup';
		name?: string;
		role?: string;
		type?: 'login' | 'signup';
	}
	interface IVersionInfo {
		aosBuildNumber: number;
		aosVersion: string;
		iosBuildNumber: number;
		iosVersion: string;
		isMandatory: boolean;
	}
	interface IUpdateSchedulePayload {
		consultationFee?: number;
		active: boolean;
		weeklyClosed: string[];
	}
	interface ICreateSchedulePayload {
		active: boolean;
		consultationFee?: number;
		doctorId?: string;
		slotType: string;
		type: string;
		weeklyClosed: string[];
	}
}
