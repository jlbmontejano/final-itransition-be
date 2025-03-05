const verifyID = (id: string) => {
	const sanitizedId = Number(id);

	if (!sanitizedId) {
		throw new Error("Invalid ID input.");
	}

	return sanitizedId;
};

export default verifyID;
