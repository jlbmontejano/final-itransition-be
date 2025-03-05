const includeTemplate = {
	creator: { select: { id: true, name: true } },
	tags: true,
	topic: true,
	likes: { select: { userId: true } },
	_count: { select: { likes: true } },
};

export default includeTemplate;
