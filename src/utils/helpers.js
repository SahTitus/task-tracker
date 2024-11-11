export const formatDate = (dateStr) => {
	const today = new Date();
	const taskDate = new Date(dateStr);
	const differenceInTime = today - taskDate;
	const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

	if (differenceInDays === 0) return "Today";
	if (differenceInDays === 1) return "Yesterday";
	return taskDate.toLocaleDateString();
};