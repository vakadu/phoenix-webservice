/* eslint-disable @typescript-eslint/no-explicit-any */
import { PemilyRootState, closeModal, usePemilyAppDispatch } from "@webservices/slices";
import Button from "../../button/button";
import { useSelector } from "react-redux";

const ConfirmationModal = () => {
    const dispatch = usePemilyAppDispatch();
    const modal = useSelector((state: PemilyRootState) => state.modal);
    const { modalData, onClick, heading, subHeading, btnText } = modal;
    const { loading } = modalData as any;    

    const handleModal = () => {
		dispatch(closeModal());
	};

    return(
        <section className="flex justify-center items-center">
            <section className="bg-white rounded-4 shadow-2 min-w-[94%] lg:min-w-[450px]">
                <h1 className="text-16 lg:text-22 font-medium mb-12 lg:mb-24 border-b py-12 px-12 lg:px-24">
                    { heading }
                </h1>
                <h4 className="text-grey-secondary text-14 lg:text-18 mb-12 lg:mb-18 px-12 lg:px-24">
                    { subHeading }
                </h4>
                <section className="grid grid-cols-2 gap-24 px-12 lg:px-24 mb-24">
                    <Button
                        size="large"
                        variant="ghost"
                        className="uppercase !text-14 lg:!text-16 border-grey-light !text-black"
                        onClick={handleModal}
                    >
                        cancel
                    </Button>
                    <Button
                        size="large"
                        className="uppercase !text-14 lg:!text-16"
                        onClick={onClick}
                        disabled={loading as boolean}
                        isLoading={loading as boolean}
                        loadingText="deleting"
                    >
                        { btnText }
                    </Button>
                </section>
            </section>
        </section>
    )
};

export default ConfirmationModal;
