import { Likes, Tag } from "@prisma/client";
import { Template } from "./types";

const formatTemplate = (template: any): Template => {
	const formattedTemplate = {
		...template,
		tags: template.tags.map((tag: Tag) => tag.text),
		likedUsersIds: template.likes.map((like: Likes) => like.userId),
		likesCount: template._count.likes,
	};

	const { likes, _count, ...rest } = formattedTemplate;

	return rest;
};

export default formatTemplate;
