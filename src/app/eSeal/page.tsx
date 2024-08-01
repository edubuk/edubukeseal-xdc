// 'use client';
// import { TickCircle, Warning2 } from 'iconsax-react';
// import { Outfit } from 'next/font/google';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import React from 'react';
// import { useState } from 'react';

// const outfit = Outfit({ subsets: ['latin'] });

// const Certificate = () => {
// 	const router = useRouter();
// 	const [FileName, setFile] = useState(new File([], '', {}));
// 	const [ConnectedAccount, setConnectedAccount] = useState(null);
// 	const [FileHash, setFileHash] = useState('');
// 	const [CertType, setCertType] = useState('');
// 	const [CertOwner, setCertOwner] = useState('');
// 	const [CertIssuer, setCertIssuer] = useState('');
// 	const [TxnHash, setTxnHash] = useState('');

// 	const selectFile = (e: any) => {
// 		setFile(e.target.files[0]);
// 		// console.log(e.target.files[0]);
// 	};

// 	const connectWallet = async () => {
// 		const { connectMetamask } = await import('../../utils/eSeal');
// 		connectMetamask().then((res: any) => {
// 			console.log('Connected To : ', res);
// 			setConnectedAccount(res);
// 		});
// 	};

// 	const hashFile = async (file: any) => {
// 		const reader = new FileReader();
// 		return new Promise((resolve, reject) => {
// 			reader.onload = (event: any) => {
// 				const arrayBuffer = event.target.result;
// 				// Convert arrayBuffer to Uint8Array (required for crypto.subtle)
// 				const byteArray = new Uint8Array(arrayBuffer);
// 				// byteArray.map((e)=>console.log(e))
// 				console.log(JSON.stringify(byteArray));
// 				crypto.subtle
// 					.digest('SHA-256', byteArray)
// 					.then((hashBuffer) => {
// 						// Convert hashBuffer to hex string
// 						const hashArray = Array.from(new Uint8Array(hashBuffer));
// 						const hashHex = hashArray.map((b) => b.toString(16)).join('');
// 						resolve(hashHex);
// 					})
// 					.catch(reject);
// 			};
// 			reader.onerror = reject;
// 			reader.readAsArrayBuffer(file);
// 		});
// 	};

// 	const computeHash = async () => {
// 		// console.log(hash);
// 		// const buffer = await FileName.arrayBuffer();
// 		// console.log(new Uint8Array(buffer));
// 		// const hashDigest = crypto.subtle
// 		// 	.digest('SHA-256', new Uint8Array(buffer))
// 		// 	.then((hashBuffer) => {
// 		// 		// Convert hashBuffer to hex string
// 		// 		const hashArray = Array.from(new Uint8Array(hashBuffer));
// 		// 		const hashHex = hashArray
// 		// 			.map((b) => b.toString(16).padStart(2, '0'))
// 		// 			.join('');
// 		// 		return hashHex;
// 		// 	});
// 		// // const hashDigest = hash.digest('hex');
// 		const hashDigest: any = await hashFile(FileName);
// 		console.log(hashDigest);
// 		setFileHash(hashDigest);

// 		// console.log({
// 		// 	hashDigest,
// 		// 	CertOwner,
// 		// 	CertIssuer,
// 		// 	CertType,
// 		// });
// 	};

// 	const registerFile = async () => {
// 		const obj = {
// 			name: CertOwner,
// 			issuer: CertIssuer,
// 			type: CertType,
// 			hash: FileHash,
// 		};

// 		const { postCertificate } = await import('../../utils/eSeal');

// 		const receipt: any = await postCertificate(obj);
// 		console.log(receipt);
// 		setTxnHash(receipt);
// 	};
// 	return (
// 		<div className='flex flex-col gap-32  mx-auto py-16 mb-40 sem:w-auto justify-center bg-page-bg bg-full bg-no-repeat min-h-screen'>
// 			<div className='flex flex-col gap-9 '>
// 				<span
// 					className={`${outfit.className} font-semibold text-[64px] text-[#2D6F57] text-center sem:text-4xl`}
// 				>
// 					eSeal Certificates
// 				</span>
// 				<span
// 					className={`${outfit.className} font-light text-xl w-[50%] mx-auto text-[#2D6F57] text-center`}
// 				>
// 					Record Academic & Work-Experience Certificates and CVs on Blockchain
// 					in a transparent & tamper-proof manner
// 				</span>
// 			</div>
// 			<div className='rounded-[20px] border border-solid mx-auto border-[#FFFFFF4D] justify-center w-[50%] bg-[#E0FAEA] pt-9 pb-24 px-7 flex flex-col gap-8 sem:p-4 med:w-[90%] med:m-auto'>
// 				<span
// 					className={`${outfit.className} font-medium text-5xl text-[#2D6F57] text-center`}
// 				>
// 					eSealer
// 				</span>
// 				<div className='flex gap-6 justify-center'>
// 					<button
// 						onClick={connectWallet}
// 						className={`rounded-[30px] font-normal text-xl text-center text-[#ffffff] bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] ${outfit.className} flex py-2 px-6`}
// 					>
// 						Connect Wallet
// 					</button>
// 					{/* <button
// 						className={`rounded-[30px] font-normal text-xl text-center text-[#ffffff] bg-gradient-to-r from-[#012376] to-[#009EFF] ${outfit.className} flex py-2 px-6`}
// 					>
// 						Mobile Wallet
// 					</button> */}
// 				</div>
// 				<div className='flex flex-col gap-6'>
// 					<div className='flex flex-col gap-4'>
// 						<label
// 							className={`${outfit.className} font-normal text-xl text-[#2D6F57]`}
// 						>
// 							Connected to
// 						</label>
// 						<div className='rounded-[20px] p-6 bg-[#FFFFFF]'>
// 							<div className='flex gap-4'>
// 								{/* <Image
// 									alt='icon'
// 									src='/info.svg'
// 									width={24}
// 									height={24}
// 								/> */}
// 								{ConnectedAccount != null ? (
// 									<TickCircle
// 										size='32'
// 										color='#2D6F57'
// 										variant='Bold'
// 									/>
// 								) : (
// 									<Warning2
// 										size='32'
// 										color='#2D6F57'
// 										variant='Bold'
// 									/>
// 								)}
// 								<span
// 									className={`${outfit.className} font-normal text-xl text-[#2D6F57] text-center`}
// 								>
// 									{ConnectedAccount != null
// 										? ConnectedAccount
// 										: `Please connect your JumboBlockchain wallet`}
// 								</span>
// 							</div>
// 						</div>
// 					</div>
// 					<div className='flex flex-col gap-4'>
// 						<label
// 							className={`${outfit.className} font-normal text-xl text-[#2D6F57]`}
// 						>
// 							Certificate issued to
// 						</label>
// 						<input
// 							className={`${outfit.className} font-normal text-xl text-[#2D6F57] rounded-[20px] p-6 bg-[#FFFFFF]`}
// 							type='text'
// 							placeholder='Name'
// 							onChange={(e) => setCertOwner(e.target.value)}
// 							value={CertOwner}
// 						/>
// 					</div>
// 					<div className='flex flex-col gap-4'>
// 						<label
// 							className={`${outfit.className} font-normal text-xl text-[#2D6F57]`}
// 						>
// 							Certificate issued by
// 						</label>
// 						<input
// 							className={`${outfit.className} font-normal text-xl text-[#2D6F57] rounded-[20px] p-6 bg-[#FFFFFF]`}
// 							type='text'
// 							placeholder='Certifying Authority'
// 							onChange={(e) => setCertIssuer(e.target.value)}
// 							value={CertIssuer}
// 						/>
// 					</div>
// 					<div className='flex flex-col gap-4'>
// 						<label
// 							className={`${outfit.className} font-normal text-xl text-[#2D6F57]`}
// 						>
// 							Certificate type
// 						</label>
// 						<input
// 							className={`${outfit.className} font-normal text-xl text-[#2D6F57] rounded-[20px] p-6 bg-[#FFFFFF]`}
// 							type='text'
// 							placeholder='Certificate Type'
// 							onChange={(e) => setCertType(e.target.value)}
// 							value={CertType}
// 						/>
// 					</div>
// 					<div className='flex flex-col gap-4'>
// 						<label
// 							className={`${outfit.className} font-normal text-xl text-[#2D6F57]`}
// 						>
// 							Upload file
// 						</label>
// 						<div className='flex items-center sem:flex-col'>
// 							<input
// 								className={`${outfit.className} font-normal text-xl text-[#2D6F57] rounded-[20px] p-6 bg-[#FFFFFF] sem:w-full`}
// 								type='file'
// 								placeholder='Choose file'
// 								onChange={selectFile}
// 							/>
// 							<span
// 								className={`${outfit.className} font-normal text-xl text-[#2D6F57] text-center`}
// 							>
// 								Suggested file types: PDF, docx, word
// 							</span>
// 						</div>
// 					</div>
// 					<button
// 						onClick={computeHash}
// 						className={`m-8 rounded-[20px] px-4 py-4 font-normal text-xl text-center text-[#ffffff] bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] ${outfit.className} flex self-center py-2 px-6 w-fit`}
// 					>
// 						Compute File Hash
// 					</button>
// 					<div className='flex flex-col gap-4'>
// 						<label
// 							className={`${outfit.className} font-normal text-xl text-[#2D6F57]`}
// 						>
// 							File hash of selected file
// 						</label>
// 						<input
// 							className={`${outfit.className} font-normal text-xl text-[#2D6F57] rounded-[20px] p-6 bg-[#FFFFFF] sem:p-4`}
// 							type='text'
// 							placeholder='Fill out the form and select a file'
// 							readOnly
// 							value={FileHash}
// 						/>
// 					</div>
// 					<button
// 						onClick={registerFile}
// 						className={`rounded-[30px] font-normal text-xl text-center text-[#ffffff] bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] ${outfit.className} flex self-center py-2 px-6 w-fit`}
// 					>
// 						Register File
// 					</button>
// 					{TxnHash != '' && (
// 						<>
// 							<div className='flex flex-col gap-4'>
// 								<label
// 									className={`${outfit.className} font-normal text-xl text-[#2D6F57]`}
// 								>
// 									Transaction Hash
// 								</label>
// 								<Link
// 									href={`https://explorer.apothem.network/tx/${TxnHash}`}
// 									target='_blank'
// 									className={`${outfit.className} font-normal text-xl text-[#2D6F57] rounded-[20px] p-6 bg-[#FFFFFF] sem:p-4 overflow-scroll`}
// 								>
// 									{`${TxnHash}`}
// 								</Link>
// 							</div>
// 							<div className='flex flex-col gap-4'>
// 								<span
// 									className={`w-full text-xl text-center text-green-500 font-normal ${outfit.className} flex self-center py-2 px-6 justify-center`}
// 								>
// 									<TickCircle
// 										size='32'
// 										color='#2D6F57'
// 										variant='Bold'
// 									/>
// 									File {`"${FileName.name}"`} Successfully Registered!
// 								</span>
// 								<button
// 									className={`rounded-[30px] font-normal text-xl text-center text-[#ffffff] bg-gradient-to-r from-[#2D6F57] to-[#5FC8A2] ${outfit.className} flex self-center py-2 px-6 w-fit`}
// 									onClick={() => window.location.reload()}
// 								>
// 									Click here to register another certificate
// 								</button>
// 							</div>
// 						</>
// 					)}
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default Certificate;
