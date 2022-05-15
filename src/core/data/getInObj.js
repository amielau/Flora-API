export const getInObject = (jsObject, path, notSetValue = undefined) => {
	let current = jsObject
	try {
	  path.forEach(prop => {
	    current = current[prop]
	  })
	} catch (err) {
	  return notSetValue
	}
      
	if (current == null) {
	  return notSetValue
	}
      
	return current
      }
      