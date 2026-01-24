import { error } from '@sveltejs/kit';
import { projects } from '$lib/store';

export const load = ({ params }: { params: { slug: string } }) => {
	const project = projects[params.slug];

	if (!project) {
		throw error(404, 'Project not found');
	}

	return {
		project,
		slug: params.slug
	};
};
