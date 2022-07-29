const getBooleanType = name => {
	return {
		name,
		defaultValue: 'false',
		toolbar: {
			items: ['true', 'false'],
			title: name
		}
	};
};

const getObjectType = (name, defaultValue, obj) => {
	return {
		name,
		defaultValue,
		toolbar: {
			items: Object.keys(obj).map(title => {
				return {
					value: obj[title],
					title
				};
			}),
			title: name
		}
	};
};

export {getBooleanType, getObjectType};
