import { styled } from 'styled-components';

export const StyledSheet = styled.div.attrs({
	className: 'tgg-sheet-container',
})`
	position: absolute;
	width: 100%;
	height: 100%;

	background-color: rgba(0, 0, 0, 0.15);

	.tgg-sheet {
		position: absolute;

		height: 80%;
		aspect-ratio: 11 / 16;

		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

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
			z-index: 0;
		}

		&.tgg-tilt-2 {
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
				padding: 3em 2em;

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

					padding: 0.5em 0 3em 0;

					height: 100%;

					.tgg-title {
						font-size: 1.05em;
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
						font-size: 0.65em;
						font-weight: 400;
					}

					#seller {
						position: absolute;
						top: -0.15em;
						left: 3.5em;

						.tgg-sign-here {
							position: absolute;

							top: 0.45em;
							left: 2.5em;

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
						top: 1em;
						left: 3.5em;

						.tgg-sign-here {
							position: absolute;
							top: 0.45em;
							left: 2.5em;

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
