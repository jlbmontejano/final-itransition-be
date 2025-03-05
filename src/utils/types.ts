import { Likes, Tag } from "@prisma/client";

export type Template = {
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
