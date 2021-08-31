

const StageItem = ({ data, deleteHandler }) => {
    // console.log(data);
    return <div>
        <div>
            {data.detail}
        </div>
        <div>
            floor: {data.floor}
            <br />
            room: {data.room.number}
            <br />
            name: {data.room.name}
        </div>
        <div>
            <button
                onClick={e => deleteHandler(data._id)}
            >
                <i className="fas fa-times"></i>
            </button>
        </div>
    </div>
}

const StageList = ({ stages, deleteHandler }) => {
    console.log(stages);
    const ListCondition = () => {
        if (stages.length >= 1) {
            return stages.map(item => <StageItem data={item} key={item.detail} deleteHandler={deleteHandler} />)
        } else {
            return <div>No stages yet.</div>
        }
    }

    return (
        <div>
            {
                ListCondition()
            }
        </div>
    )
}

export default StageList;