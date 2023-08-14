const extractTimeFromDate = (dateString) => {
	const parts = dateString.split(", ")[1].split(" ")[0].split(":");
	const hours = parts[0];
	const minutes = parts[1];
	return `${hours}:${minutes}`;
};
export const formatISODate = (isoDate) => {
	const options = {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
		timeZoneName: "short",
	};

	const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	return extractTimeFromDate(
		new Date(isoDate).toLocaleString(undefined, {
			...options,
			timeZone: userTimeZone,
		})
	);
};

export const checkDate = (dateToCheck) => {
	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const yesterday = new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate() - 1
	);

	const aDate = new Date(dateToCheck);
	aDate.setHours(0, 0, 0, 0); // Reset time to midnight for comparison

	if (aDate.getTime() === today.getTime()) {
		return "Today";
	} else if (aDate.getTime() === yesterday.getTime()) {
		return "Yesterday";
	} else {
		const weekAgo = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate() - 7
		);
		if (aDate >= weekAgo) {
			const daysOfWeek = [
				"Sunday",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday",
			];
			const dayOfWeek = daysOfWeek[aDate.getDay()];
			return dayOfWeek;
		} else {
			const formattedDate = `${aDate.getDate()}/${
				aDate.getMonth() + 1
			}/${aDate.getFullYear().toString().slice(-2)}`;
			return formattedDate;
		}
	}
}
