import { Likes, Tag } from "@prisma/client";

type Template = {
	id: number;
	title: string;
	creator: {
		id: number;
		name: string;
	};
	topic: {
		id: number;
		text: string;
	};
	tags: Tag[];
	likes: Likes[];
	_count: {
		likes: number;
	};
};

export const includeTemplate = {
	creator: { select: { id: true, name: true } },
	tags: true,
	topic: true,
	likes: { select: { userId: true } },
	_count: { select: { likes: true } },
};

export const verifyID = (id: string) => {
	const sanitizedId = Number(id);

	if (!sanitizedId) {
		throw new Error("Invalid ID input.");
	}

	return sanitizedId;
};

export const formatTemplate = (template: any): Template => {
	const formattedTemplate = {
		...template,
		tags: template.tags.map((tag: Tag) => tag.text),
		likedUsersIds: template.likes.map((like: Likes) => like.userId),
		likesCount: template._count.likes,
	};

	const { likes, _count, ...rest } = formattedTemplate;

	return rest;
};
