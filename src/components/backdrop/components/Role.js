import RoleList from './RoleList';

//component

const Role = ({
    userRoles,
    newRole,
    roleAddHandler,
    roleRemoveHandler }) => {

    // const {hospital} = info;

    return (
        <div>
            Role,
            <div>
                <RoleList
                    userRoles={userRoles}
                    roleRemoveHandler={roleRemoveHandler}
                    roleAddHandler={roleAddHandler}
                />
            </div>
        </div>
    )
}


export default Role;