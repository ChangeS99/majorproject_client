

const DynamicInput = ({ data }) => {

    const { value } = data;

    const ConditionalRendering = () => {
        // console.log(typeof value === 'object');
        // console.log(value);
        if (typeof value === 'object') {
            return Object.keys(value).map(item => {
                console.log(item);
                return <div>
                    <label htmlFor={item}>{item}</label>
                    <input value={value[item]}></input>
                </div>
            })
        } else {
            return <div>
                <label htmlFor={data.label}>{data.label}</label>
                <input value={data.value}></input>
            </div>
        }
    }



    return <>
        {
            ConditionalRendering()
        }
    </>
}

export default DynamicInput;