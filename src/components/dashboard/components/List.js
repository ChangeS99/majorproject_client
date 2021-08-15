
//component
import ListItem from './ListItem';

const List = ({ data, dashmode, crudmode, forRole, forDep }) => {

    const ConditionalRendering = () => {
        if (data.length < 1) {
            return <h1>No Data</h1>
        }

        switch (dashmode) {
            case "admin": return data.map(item => {
                return <ListItem
                    dashmode={dashmode}
                    crudmode={crudmode}
                    data={item}
                    key={item._id} />
            });
            case "employee": return data.map(item => {
                return <ListItem
                    dashmode={dashmode}
                    crudmode={crudmode}
                    data={item}
                    key={item._id} />
            });
            case "patient": return data.map(item => {
                return <ListItem
                    dashmode={dashmode}
                    crudmode={crudmode}
                    data={item}
                    key={item._id} />
            });
            case "about": return data.map(item => {
                return <ListItem
                    forRole={forRole}
                    forDep={forDep}
                    dashmode={dashmode}
                    data={item}
                    key={item._id} />
            });
            default: return <h1>Loading...</h1>
        }
    }

    return (
        <div>
            {
                ConditionalRendering()
            }
        </div>
    )
}

export default List;