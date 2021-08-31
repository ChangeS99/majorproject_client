export const informationReducer = (information = {}, action) => {
    switch (action.type) {
        case "SET_INFORMATION": return { ...information, ...action.payload };
        default: return information;
    }
}

export const SearchResultReducer = (result = [], action) => {
    switch (action.type) {
        case "SEARCH_RESULT": return [...action.payload];
        default: return result;
    }
}

export const hospitalReducer = (hospital = {}, action) => {
    switch (action.type) {
        case "SET_HOSPITAL": return { ...hospital, ...action.payload };
        default: return hospital
    }
}

export const roleReducer = (roles = [], action) => {
    switch (action.type) {
        case "SET_ROLE": return [...action.payload];
        default: return roles
    }
}

export const departmentReducer = (departments = [], action) => {
    switch (action.type) {
        case "SET_DEP": return [...action.payload];
        default: return departments;
    }
}

export const announcementReducer = (announcement = [], action) => {
    switch(action.type) {
        case "SET_ANN":  return [...action.payload];
        default: return announcement;
    }
}

export const floorReducer = (floors= [], action) => {
    switch(action.type) {
        case "SET_FLOOR": return [...action.payload];
        default: return floors
    }
}

export const roomReducer = (rooms= [], action) => {
    switch(action.type) {
        case "SET_ROOM": return [...action.payload];
        default: return rooms
    }
}