type Template = {
	id: string;
	title: string;
	creator: {
		id: string;
		name: string;
	};
	topic: {
		id: string;
		text: string;
	};
	tags: string[];
	likes: {
		user: {
			id: string;
		};
	}[];
	_count: {
		likes: number;
	};
};

export const includeTemplate = {
	creator: { select: { id: true, name: true } },
	tags: true,
	topic: true,
	likes: { select: { user: { select: { id: true } } } },
	_count: { select: { likes: true } },
};

export const verifyID = (id: string) => {
	const sanitizedId = Number(id);

	if (!sanitizedId) {
		throw new Error("Invalid ID input.");
	}

	return sanitizedId;
};

export const formatTemplate = (template: any) => {
	const formattedTemplate = {
		...template,
		likedUsersIds: template.likes.map((like: any) => like.user.id),
		likesCount: template._count.likes,
	};

	const { likes, _count, ...rest } = formattedTemplate;

	return rest;
};
