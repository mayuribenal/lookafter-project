import axios from './axios';
import moment from 'moment';

export async function loggedInUser() {
  const user = await axios.get('/user');
  return {
    type: 'LOGGED_IN_USER',
    user: user.data
  };
}

export function setUploaderVisible() {
  return {
    type: 'SET_UPLOADER_VISIBLE'
  };
}

export function setProfilePic(pic) {
  return {
    type: 'SET_PROFILE_PIC',
    pic
  };
}

export function openBioEditor(bio) {
  return {
    type: 'SET_BIO_EDITOR',
    bio
  };
}
export function openFamilyBioEditor(description) {
  return {
    type: 'SET_DESCRIPTION_EDITOR',
    description
  };
}

export function setBio(bio) {
  return {
    type: 'SET_BIO',
    bio
  };
}
export function setFamilyBio(description) {
  return {
    type: 'SET_FAM_BIO',
    description
  };
}

export async function getMembers() {
  const members = await axios.get('/members');
  return {
    type: 'GET_MEMBERS',
    members: members.data
  };
}

export function chatMessages(messages) {
  return {
    type: 'CHAT_MESSAGES',
    messages
  };
}

export function chatMessage(message) {
  return {
    type: 'CHAT_MESSAGE',
    message
  };
}

export function setEventEditorVisible() {
  return {
    type: 'SET_EVENT_EDITOR_VISIBLE'
  };
}

export function closeEventEditor() {
  return {
    type: 'CLOSE_EVENT_EDITOR'
  };
}

export function displayDate(start, end) {
  return {
    type: 'DISPLAY_DATE',
    start,
    end
  };
}

export function addEventOffer(newEvent) {
  return {
    type: 'ADD_EVENT_OFFER',
    newEvent
  };
}

export function addEventNeed(newEvent) {
  return {
    type: 'ADD_EVENT_NEED',
    newEvent
  };
}

export async function removeEventOffer(id) {
  return {
    type: 'REMOVE_EVENT_OFFER',
    id
  };
}

export async function removeEventNeed(id) {
  return {
    type: 'REMOVE_EVENT_NEED',
    id
  };
}

export async function getDatesOffer() {
  const events = await axios.get('/get-events-offer');
  for (let i = 0; i < events.data.length; i++) {
    events.data[i].start = moment(events.data[i].start).toDate();
    events.data[i].end = moment(events.data[i].end).toDate();
  }
  return {
    type: 'DATE_EVENTS_OFFER',
    events: events.data
  };
}

export async function getDatesNeed() {
  const events = await axios.get('/get-events-need');
  for (let i = 0; i < events.data.length; i++) {
    events.data[i].start = moment(events.data[i].start).toDate();
    events.data[i].end = moment(events.data[i].end).toDate();
  }
  return {
    type: 'DATE_EVENTS_NEED',
    events: events.data
  };
}
