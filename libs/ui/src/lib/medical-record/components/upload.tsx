'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { DeleteIcon, ImagePlaceholderIcon, PdfIcon } from '@webservices/icons';
import ImagePlaceholder from '../../image-placeholder/image-placeholder';
import ButtonWrapper from '../../button-wrapper/button-wrapper';
import Button from '../../button/button';

const Upload = ({
	btnTxt,
	handleClick,
	isLoading,
	headingTxt,
}: {
	btnTxt: string;
	handleClick: (file: ICommonTypes.IUploadType, setFiles: (files: []) => void) => void;
	isLoading: boolean;
	headingTxt: string;
}) => {
	const [files, setFiles] = useState<ICommonTypes.IUploadType[]>([]);
	const { getRootProps, getInputProps } = useDropzone({
		accept: {
			'image/*': [],
			'application/pdf': [],
		},
		onDrop: (acceptedFiles) => {
			const mappedFiles = acceptedFiles.map((acceptedFile, index) => {
				return {
					file: acceptedFile,
					preview:
						acceptedFile.type === 'application/pdf'
							? ''
							: URL.createObjectURL(acceptedFile),
					index: index.toString(),
				};
			});
			setFiles(mappedFiles);
		},
	});

	return (
		<div className="relative flex flex-col h-full px-16">
			<div className="flex-1 pt-32">
				<h3 className="text-22 font-semibold leading-[24px]">{headingTxt}</h3>
				<p className="text-18 mt-12">You can upload JPEG or PNG up to 2MB</p>
				{files.length === 0 && (
					<div
						{...getRootProps({
							className:
								'dropzone cursor-pointer h-[200px] border-[3px] border-[#12D18E] flex items-center justify-center flex-col rounded-[20px] mt-24',
						})}
					>
						<input className="hidden border-grey-border1" {...getInputProps()} />
						<ImagePlaceholderIcon />
						<p className="pt-12 text-grey-3">Drop files here or click to upload.</p>
					</div>
				)}
				<div className="relative">
					{files.length > 0 && (
						<>
							{files.map((file) => {
								return (
									<div
										key={file.index}
										className="h-[200px] border-[3px] border-[#12D18E] flex items-center justify-center flex-col rounded-[20px] mt-24"
									>
										{file.preview !== '' ? (
											<ImagePlaceholder
												src={file.preview}
												alt=""
												className="h-[200px] relative w-full"
												imageClasses="rounded-[20px] object-contain"
												onLoad={() => {
													URL.revokeObjectURL(file.preview);
												}}
											/>
										) : (
											<PdfIcon width={180} height={180} />
										)}
									</div>
								);
							})}
						</>
					)}
					{files.length > 0 && (
						<ButtonWrapper
							onClick={() => setFiles([])}
							className="!absolute top-1/2 -translate-y-1/2 right-10 w-32 h-32 shadow-base rounded-full flex items-center justify-center border border-grey-2"
						>
							<DeleteIcon className="text-red-1" />
						</ButtonWrapper>
					)}
				</div>
			</div>
			<Button
				disabled={files.length === 0 || isLoading}
				className="px-16 w-full font-bold tracking-[-0.41px] mb-12"
				onClick={() => handleClick(files[0], setFiles)}
				isLoading={isLoading}
			>
				<span className="font-black tracking-[-0.41px]">{btnTxt}</span>
			</Button>
		</div>
	);
};

export default Upload;
