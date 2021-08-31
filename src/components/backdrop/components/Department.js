import DepartmentList from './DepartmentList';

//component

const Department = ({
    userDeps,
    newDep,
    depAddHandler,
    depRemoveHandler }) => {

    // const {hospital} = info;

    return (
        <div>
            Department,
            <div>
                <DepartmentList
                    userDeps={userDeps}
                    depRemoveHandler={depRemoveHandler}
                    depAddHandler={depAddHandler}
                />
            </div>
        </div>
    )
}


export default Department;