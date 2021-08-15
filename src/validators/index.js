export const particularTypeError = (obj, name) => {
    return name === obj.path ? <p className="error">{obj.error}</p>: null
}