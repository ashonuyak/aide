export const canChangeSlide = ({
	lastSlideChange,
	slideDuration,
	slideDurationRatio = 1
}: {
	lastSlideChange: Date;
	slideDuration: number;
	slideDurationRatio?: number;
}) => {
	if (
		lastSlideChange &&
		new Date().getTime() - lastSlideChange.getTime() < slideDuration * slideDurationRatio
	) {
		return false;
	}

	return true;
};
