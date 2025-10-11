import Script from 'next/script'

interface StructuredDataProps {
	data: Record<string, unknown>
}

export function StructuredData({ data }: StructuredDataProps) {
	return (
		<Script
			id="structured-data"
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
		/>
	)
}

interface WebsiteSchemaProps {
	url: string
	name: string
	description: string
}

export function WebsiteSchema({ url, name, description }: WebsiteSchemaProps) {
	const schema = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name,
		description,
		url,
		potentialAction: {
			'@type': 'SearchAction',
			target: {
				'@type': 'EntryPoint',
				urlTemplate: `${url}/?search={search_term_string}`
			},
			'query-input': 'required name=search_term_string'
		}
	}

	return <StructuredData data={schema} />
}

interface CreativeWorkSchemaProps {
	name: string
	description: string
	author: string
	dateCreated: string
	dateModified?: string
	url: string
	image?: string
	interactionStatistic?: {
		interactionType: string
		userInteractionCount: number
	}
}

export function CreativeWorkSchema({
	name,
	description,
	author,
	dateCreated,
	dateModified,
	url,
	image,
	interactionStatistic
}: CreativeWorkSchemaProps) {
	const schema = {
		'@context': 'https://schema.org',
		'@type': 'CreativeWork',
		name,
		description,
		author: {
			'@type': 'Person',
			name: author
		},
		dateCreated,
		...(dateModified && { dateModified }),
		url,
		...(image && { image }),
		...(interactionStatistic && { interactionStatistic })
	}

	return <StructuredData data={schema} />
}

interface BreadcrumbListSchemaProps {
	items: Array<{
		name: string
		url: string
	}>
}

export function BreadcrumbListSchema({ items }: BreadcrumbListSchemaProps) {
	const schema = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: item.url
		}))
	}

	return <StructuredData data={schema} />
}

interface OrganizationSchemaProps {
	name: string
	url: string
	logo?: string
	description: string
}

export function OrganizationSchema({
	name,
	url,
	logo,
	description
}: OrganizationSchemaProps) {
	const schema = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name,
		url,
		...(logo && { logo }),
		description
	}

	return <StructuredData data={schema} />
}
