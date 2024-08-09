import contentful from "contentful";
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';

const $SPACE = import.meta.env.CONTENTFUL_SPACE_ID;
const $TOKEN = import.meta.env.DEV ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN : import.meta.env.CONTENTFUL_DELIVERY_TOKEN;




export const contentfulClient = contentful.createClient({
	space: $SPACE,
	accessToken: $TOKEN,
	host: import.meta.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
});



// Overall API call to GraphQL Contentful API
async function apiCall( query, variables ) {
	const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${$SPACE}/environments/master`;

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${$TOKEN}`,
		},
		body: JSON.stringify( { query, variables } ),
	}

	return await fetch( fetchUrl, options );
}



// Get homepage query
async function getHome() {
	const query = `
		query {
			contentfulHome: home(id:"3g2iyD1SfySxM8OnHB2d37") {
				metadataTitle
				metadataDescription
				metadataImage {
					url
				}
				detail
				hero {
					headline
					subheadRich {
						json
					}
				}
				caseStudiesCollection {
					items {
						slug
						title
						year
						detail
						hero {
							headline
							subheadRich {
								json
							}
						}
						description {
							url
							detail {
								json
							}
							description {
								json
							}
						}
						mediaCollection {
							items {
								... on Image {
									__typename
									image {
										url
										width
										height
										description
									}
								}
								... on SingleColumn {
									__typename
									caption {
										json
									}
									alignment
									imagesCollection {
										items {
											url
											width
											height
											description
										}
									}
								}
								... on DoubleColumn {
									__typename
									caption {
										json
									}
									alignment
									leftColumnImagesCollection {
										items {
											url
											width
											height
											description
										}
									}
									rightColumnImagesCollection {
										items {
											url
											width
											height
											description
										}
									}
								}
								... on Video {
									__typename
									videoWebM {
										url
									}
									videoOgg {
										url
									}
									videoMp4 {
										url
									}
									videoPoster {
										url
									}
									audioBoolean
									loop
								}
							}
						}
					}
				}
				about {
					headline {
						json
					}
					detail
					description {
						json
					}
					colophon {
						json
					}
					additional {
						json
					}
					socialMediaCollection {
						items {
							name
							url
						}
					}
				}
			}
		}
	`;

	const response = await apiCall( query );
	const json = await response.json();

	return await json.data.contentfulHome;
}



// Get homepage query
async function getNavigation() {
	const query = `
		query {
			contentfulNavigation: navigation(id:"4t4MhDRfvC5pzhnlcm3y0P") {
				title
				detail
				linksCollection {
					items {
						title
						slug
						year
						detail
					}
				}
				socialMediaCollection {
					items {
						name
						url
					}
				}
			}
		}
	`;

	const response = await apiCall( query );
	const json = await response.json();

	return await json.data.contentfulNavigation;
}



// Get single case study
async function getCaseStudy( id ) {
	const variables = {
		id: id
	};

	const query = `
		query ($id: String!) {
			contentfulCaseStudy: caseStudy(id: $id) {
				title
				slug
				year
				detail
				metadataDescription
				metadataImage {
					url
				}
				hero {
					headline
					subheadRich {
						json
					}
				}
				description {
					url
					detail {
						json
					}
					description {
						json
					}
				}
				mediaCollection {
					items {
						... on Image {
							__typename
							image {
								url
								width
								height
								description
							}
						}
						... on SingleColumn {
							__typename
							caption {
								json
							}
							alignment
							imagesCollection {
								items {
									url
									width
									height
									description
								}
							}
						}
						... on DoubleColumn {
							__typename
							caption {
								json
							}
							alignment
							leftColumnImagesCollection {
								items {
									url
									width
									height
									description
								}
							}
							rightColumnImagesCollection {
								items {
									url
									width
									height
									description
								}
							}
						}
						... on Video {
							__typename
							videoWebM {
								url
							}
							videoOgg {
								url
							}
							videoMp4 {
								url
							}
							videoPoster {
								url
							}
							audioBoolean
							loop
						}
					}
				}
			}
		}
	`;

	const response = await apiCall( query, variables );
	const json = await response.json();

	return await json.data.contentfulCaseStudy;
}



// Text options
export const headlineOptions = {
	renderMark: {
		[MARKS.BOLD]: text => `<strong>${text}</strong>`,
		[MARKS.ITALIC]: text => `<em>${text}</em>`,
		[MARKS.UNDERLINE]: text => `<u>${text}</u>`,
	},
	renderNode: {
		[BLOCKS.PARAGRAPH]: (node, next) => `${next(node.content)}`,
	}	
}

export const copyOptions = {
	renderMark: {
		[MARKS.BOLD]: text => `<strong>${text}</strong>`,
		[MARKS.ITALIC]: text => `<em>${text}</em>`,
		[MARKS.UNDERLINE]: text => `<u>${text}</u>`,
	},
	renderNode: {
		[BLOCKS.PARAGRAPH]: (node, next) => `<p>${next(node.content)}</p>`,
		[BLOCKS.HEADING_6]: (node, next) => `<span class="small">${next(node.content)}</span>`,
		[INLINES.HYPERLINK]: (node, next) => `<a href=${node.data.uri} target="_blank" rel="noopener noreferrer">${next(node.content)}</a>`,
	},
	preserveWhitespace: true
}



// Export functions
export const contentfulGraphQLClient = { getHome, getNavigation, getCaseStudy };