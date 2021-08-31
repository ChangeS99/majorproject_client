import { combineReducers } from 'redux';

import { userReducer } from './user';

import { locationReducer, markerReducer } from './location';

import {
    informationReducer,
    hospitalReducer,
    SearchResultReducer,
    roleReducer,
    departmentReducer,
    announcementReducer,
    floorReducer,
    roomReducer
} from './hospital';

import {
    backdropReducer,
    infoReducer

} from './ui'

const tempReducer = (temp = 0, action) => {
    switch (action.type) {
        case 'ADD': return temp + action.payload
        default: return temp
    }
}



const appReducer = combineReducers({
    temp: tempReducer,
    user: userReducer,
    location: locationReducer,
    marker: markerReducer,
    information: informationReducer,
    hospital: hospitalReducer,
    result: SearchResultReducer,
    roles: roleReducer,
    departments: departmentReducer,
    announcements: announcementReducer,
    backdrop: backdropReducer,
    info: infoReducer,
    floors: floorReducer,
    rooms: roomReducer
});

export default appReducer;