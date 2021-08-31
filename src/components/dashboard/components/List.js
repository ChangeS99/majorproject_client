import { Fragment } from 'react';

//component
import ListItem from './ListItem';

//styles
import {
    ListContainer
} from '../../../style/list/list__styles'

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
            case "employee": return <ListContainer>
                {
                    data.map(item => {
                        return <ListItem
                            dashmode={dashmode}
                            crudmode={crudmode}
                            data={item}
                            key={item._id} />
                    })
                }
            </ListContainer>
            case "patient": return <ListContainer>
                {
                    data.map(item => {
                        return <ListItem
                            dashmode={dashmode}
                            crudmode={crudmode}
                            data={item}
                            key={item._id} />
                    })
                }
            </ListContainer>
            case "about": return <div>
                {
                    data.map(item => {
                        return <ListItem
                            forRole={forRole}
                            forDep={forDep}
                            dashmode={dashmode}
                            data={item}
                            key={item._id} />
                    })
                }
            </div>
            default: return <h1>Loading...</h1>
        }
    }

    return (
        <Fragment>
            {
                ConditionalRendering()
            }
        </Fragment>

    )
}

export default List;