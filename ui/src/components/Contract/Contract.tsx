import { formatPrice, getFormatedDate } from '../../utils/misc';
import { IContractData } from '../../interfaces/IContractData';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { StyledSheet } from './StyledContract';
import Vara from 'vara';

const varaFontSize = 30;
const varaFont =
	'https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Satisfy/SatisfySL.json';

const paperTextureSrc = './paper-texture.jpg';

const initialMotion = {
	translateX: '-50%',
	translateY: '-50%',
	rotate: 0,
	opacity: 0,
};

const animateMotion = {
	decelerate: 5,
	translateX: '-50%',
	translateY: '-50%',
	rotate: '2deg',
	opacity: 1,
};

const exitMotion = {
	translateY: '-50%',
	translateX: '-50%',
	rotate: 0,
	opacity: 0,
};

interface IContractProps {
	contractData: IContractData;
}

export const Contract = ({ contractData }: IContractProps) => {
	const descriptionRef = useRef<HTMLDivElement>(null);

	const [sellerSigned, setSellerSigned] = useState(false);
	const [buyerSigned, setBuyerSigned] = useState(false);

	const [description, setDescription] = useState('');
	const [amountInput, setAmountInput] = useState<number>();

	useEffect(() => {
		if (!contractData.isSeller) {
			new Vara(
				'#seller',
				varaFont,
				[
					{
						duration: 0,
						text: contractData.sellerName,
					},
				],
				{
					fontSize: varaFontSize,
				},
			);
		}
	}, []);

	const handleDescriptionInput = (event: React.FormEvent<HTMLDivElement>) => {
		setDescription(event.currentTarget.textContent ?? '');
	};

	const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		// Only allow numbers
		if (!/^\d+$/.test(event.target.value)) return;

		setAmountInput(+event.target.value);
	};

	const onSellerSign = () => {
		if (!contractData.isSeller || sellerSigned) return;

		setSellerSigned(true);

		new Vara(
			'#seller',
			varaFont,
			[
				{
					text: contractData.sellerName,
				},
			],
			{
				duration: 1000,
				fontSize: varaFontSize,
			},
		);

		setTimeout(() => {
			console.log('Seller signed, sending to buyer');
		}, 1750);
	};

	const onBuyerSignature = () => {
		if (contractData.isSeller || buyerSigned) return;

		setBuyerSigned(true);

		new Vara(
			'#buyer',
			varaFont,
			[
				{
					text: contractData.buyerName,
				},
			],
			{
				duration: 1000,
				fontSize: varaFontSize,
			},
		);

		setTimeout(() => {
			console.log('Buyer signed');
		}, 1750);
	};

	const date = getFormatedDate();

	return (
		<StyledSheet>
			<div className="tgg-sheet">
				<div className="tgg-sheet-wrapper">
					<div className="tgg-sheet-content">
						<div className="tgg-agreements-container">
							<div className="tgg-title">
								Vehicle Purchase and Sale Agreement
							</div>

							<div className="tgg-header-paragraph">
								<div className="tgg-highlight">
									{contractData.sellerName}
								</div>
								, herein referred to as the "Seller," agrees to
								sell to{' '}
								<div className="tgg-highlight">
									{contractData.buyerName}
								</div>
								, herein referred to as the "Buyer," the
								following vehicle:{' '}
								<div className="tgg-highlight">
									{contractData.vehicleModel}
								</div>
								, with Vehicle Identification Number{' '}
								<div className="tgg-highlight">
									{contractData.vehiclePlate}
								</div>
								, subject to the terms and conditions outlined
								below:
							</div>

							<div className="tgg-vehicle-condition-wrapper">
								{!contractData.isSeller ? (
									<div>Description: {contractData.description}</div>
								) : (
									<div
										className="tgg-condition-input"
										contentEditable={contractData.isSeller}
										ref={descriptionRef}
										onInput={handleDescriptionInput}
										data-disabled={!contractData.isSeller}
										data-placeholder="Enter the vehicle's condition and details"></div>
								)}
							</div>

							<div className="tgg-paragraphs-wrapper">
								<div className="tgg-paragraph">
									<span>
										1. The total purchase price for the
										Vehicle shall be{' '}
									</span>
									{!contractData.isSeller ? (
										<div className="tgg-highlight">
											$
											{formatPrice(
												contractData.dealPrice,
											)}
										</div>
									) : (
										<div className="tgg-amount-input-wrapper">
											<input
												type="number"
												value={amountInput}
												onChange={onAmountChange}
												placeholder="Enter amount"
											/>
											{'$'}
										</div>
									)}
									.
								</div>

								<div className="tgg-paragraph">
									2. Payment of the total purchase price shall
									be made by the Buyer on the day of the sale
									exclusively via bank transfer.
								</div>

								<div className="tgg-paragraph">
									3. Upon successful confirmation of the
									payment transfer on the day of the sale, the
									Seller will provide the Buyer with the
									Vehicle's Certificate of Title, current
									Registration, Bill of Sale, and Odometer
									Disclosure Statement. The Seller is
									responsible for ensuring that all past
									registration fees are settled and that the
									Vehicle is delivered with a current
									registration and a clear title.
									Additionally, the Seller agrees to manage
									and cover the costs for all required in-game
									smog inspections prior to the sale date.
								</div>

								<div className="tgg-paragraph">
									4. The Vehicle is sold "as is" without any
									express or implied warranties regarding the
									condition or performance of the Vehicle.
								</div>
							</div>

							<div className="tgg-footer-paragraph">
								This agreement is executed on the{' '}
								<div className="tgg-highlight">{date.day}</div>{' '}
								day of{' '}
								<div className="tgg-highlight">
									{date.month}
								</div>
								,{' '}
								<div className="tgg-highlight">{date.year}</div>{' '}
								at{' '}
								<div className="tgg-highlight">
									{date.formattedHours}:{date.minutes}
									{date.period}
								</div>{' '}
								in, Los Santos
							</div>
						</div>

						<div className="tgg-signatures-container">
							<div className="tgg-signature-wrapper">
								<div className="tgg-label">
									Seller: _______________________
								</div>
								<div id="seller" onClick={onSellerSign}>
									{contractData.isSeller && !sellerSigned && (
										<div className="tgg-sign-here">
											Sign here
										</div>
									)}
								</div>
							</div>
							<div className="tgg-signature-wrapper">
								<div className="tgg-label">
									Buyer: _______________________
								</div>
								<div id="buyer" onClick={onBuyerSignature}>
									{!contractData.isSeller && !buyerSigned && (
										<div className="tgg-sign-here">
											Sign here
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>

				<PaperTexture />
			</div>

			<AnimatePresence>
				<motion.div
					className="tgg-sheet tgg-tilt-1"
					initial={initialMotion}
					animate={animateMotion}
					exit={exitMotion}>
					<PaperTexture />
				</motion.div>
			</AnimatePresence>

			<AnimatePresence>
				<motion.div
					className="tgg-sheet tgg-tilt-2"
					initial={initialMotion}
					animate={{
						...animateMotion,
						rotate: '4deg',
						decelerate: 500,
					}}
					exit={exitMotion}>
					<PaperTexture />
				</motion.div>
			</AnimatePresence>
		</StyledSheet>
	);
};

const PaperTexture = () => <img src={paperTextureSrc} alt="Paper texture" />;
