export const flatten = (doc, prefixes = []) => {
	if (!doc) {
	  return doc
	}
      
	if (typeof doc === 'string') {
	  return { [prefixes.join('.')]: doc }
	}
      
	return Object.keys(doc).reduce((acc, key) => {
	  const value = doc[key]
	  const flattenKey = [...prefixes, key].join('.')
	  if (value == null) {
	    acc[flattenKey] = value
	  } else if (Array.isArray(value)) {
	    return {
	      ...acc,
	      ...value
		.map((nested, index) => flatten(nested, [...prefixes, `${key}.[${index}]`]))
		.reduce((acc, curr) => ({ ...curr, ...acc }), {}),
	    }
	  } else if (Object.prototype.toString.call(value) === '[object Date]') {
	    acc[flattenKey] = value
	  } else if (typeof value === 'object') {
	    return {
	      ...acc,
	      ...flatten(value, [...prefixes, key]),
	    }
	  } else {
	    acc[flattenKey] = doc[key]
	  }
      
	  return acc
	}, {})
      }
      