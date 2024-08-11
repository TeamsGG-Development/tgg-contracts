import { styled } from 'styled-components';

export const StyledSheet = styled.div.attrs({
	className: 'tgg-sheet-container',
})`
	display: flex;
	justify-content: center;
	align-items: center;

	position: absolute;
	width: 100%;
	height: 100%;

	background-color: rgba(0, 0, 0, 0.15);

	user-select: none;

	.tgg-sheet {
		position: relative;

		height: 80%;
		aspect-ratio: 11 / 16;

		background-color: #dddddd;

		box-shadow: 0 0 30px rgba(0, 0, 0, 0.075) inset;

		filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.1));

		z-index: 1;

		overflow: hidden;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;

			opacity: 0.35;

			user-select: none;
			-webkit-user-drag: none;
		}

		&.tgg-tilt-1 {
			position: absolute;

			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);

			z-index: 0;
		}

		&.tgg-tilt-2 {
			position: absolute;

			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);

			z-index: -1;
		}

		.tgg-sheet-wrapper {
			position: absolute;

			width: 100%;
			height: 100%;

			top: 0;
			left: 0;
			z-index: 2;

			.tgg-sheet-content {
				position: relative;

				display: flex;
				flex-direction: column;

				justify-content: space-between;

				width: 100%;
				height: 100%;
				padding: 2em 2em;

				.tgg-highlight {
					display: inline-block;

					font-weight: bold;
					text-decoration: underline;
					text-decoration-thickness: 1px;
					text-decoration-color: #000;

					text-underline-offset: 0.2em;
				}

				.tgg-agreements-container {
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					padding: 0 0 1.5em 0;

					height: 100%;

					.tgg-title {
						font-size: 1em;
						font-weight: 400;
						text-align: center;
					}

					.tgg-header-paragraph {
						font-size: 0.5em;
						font-weight: 400;
						text-align: left;
						margin: 1em 0;

						line-height: 1.15em;
					}

					.tgg-vehicle-condition-wrapper {
						display: inline;
						width: 100%;

						font-size: 0.5em;
						font-weight: 400;
						line-height: 1.15em;

						span {
							display: inline;
						}

						.tgg-condition-input {
							display: inline-block;
							width: 100%;
							min-height: 1.5em;
							max-height: 4em;

							border-bottom: 1px solid rgba(0, 0, 0, 0.15);

							padding: 0.15em 0.25em;

							overflow-y: auto;
							overflow-x: hidden;

							font-size: 0.95em;
							line-height: 1;

							padding-bottom: 0.25em;

							&:empty:before {
								content: attr(data-placeholder);
								color: #aaa;
								font-size: 1.1em;
								font-size: 0.95em;
								line-height: 1;
							}

							/* Remove the cursor if data-disabled attr is true */

							&:hover {
								cursor: pointer;
							}

							&[data-disabled='true'] {
								cursor: default;
							}

							&:focus {
								outline: none;
								cursor: text;
								font-size: 0.95em;
								line-height: 1;

								border-color: rgba(0, 0, 0, 0.45);
							}

							&::-webkit-scrollbar {
								width: 0;
							}
						}
					}

					.tgg-paragraphs-wrapper {
						display: flex;
						flex-direction: column;

						row-gap: 0.45em;

						.tgg-paragraph {
							font-size: 0.5em;
							font-weight: 400;
							line-height: 1.15em;
						}
					}

					.tgg-amount-input-wrapper {
						display: inline;

						input {
							font-family: 'Times New Roman', serif;
							font-size: 0.85em;
							font-weight: 400;

							width: 7em;

							outline: none;

							border: none;
							border-bottom: 1px solid rgba(0, 0, 0, 0.15);

							background-color: transparent;

							text-align: center;

							&:focus {
								border-color: rgba(0, 0, 0, 0.45);
							}

							&::placeholder {
								font-size: 1.1em;
								color: #aaa;
							}

							&::-webkit-outer-spin-button,
							&::-webkit-inner-spin-button {
								-webkit-appearance: none;
								margin: 0;
							}
						}
					}

					.tgg-footer-paragraph {
						font-size: 0.5em;
						font-weight: 400;
						text-align: left;
					}
				}

				.tgg-signatures-container {
					position: relative;

					display: flex;
					flex-direction: column;

					row-gap: 0.5em;

					.tgg-label {
						font-size: 0.6em;
						font-weight: 400;
					}

					#seller {
						position: absolute;
						top: -0.275em;
						left: 3.5em;

						.tgg-sign-here {
							position: absolute;

							top: 0.45em;
							left: 1.5em;

							font-size: 0.5em;
							white-space: nowrap;

							transition: color 0.3s ease;
							&:hover {
								cursor: pointer;
								color: #000000ae;
							}
						}
					}

					#buyer {
						position: absolute;
						top: 0.85em;
						left: 3.5em;

						.tgg-sign-here {
							position: absolute;
							top: 0.45em;
							left: 1.5em;

							font-size: 0.5em;
							white-space: nowrap;

							transition: color 0.3s ease;
							&:hover {
								cursor: pointer;
								color: #000000ae;
							}
						}
					}
				}
			}
		}
	}
`;
