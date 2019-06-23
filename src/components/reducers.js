export default function(state = {}, action) {
  if (action.type == 'LOGGED_IN_USER') {
    state = {
      ...state,
      user: action.user
    };
  }
  if (action.type == 'GET_MEMBERS') {
    state = {
      ...state,
      members: action.members
    };
  }
  if (action.type == 'SET_UPLOADER_VISIBLE') {
    state = {
      ...state,
      uploaderVisible: !state.uploaderVisible
    };
  }
  if (action.type == 'SET_PROFILE_PIC') {
    state = {
      ...state,
      user: { ...state.user, pic: action.pic }
    };
  }
  if (action.type == 'CHAT_MESSAGES') {
    state = {
      ...state,
      chat: action.messages.messages
    };
  }
  if (action.type == 'CHAT_MESSAGE') {
    state = {
      ...state,
      chat: [...state.chat, action.message]
    };
  }
  if (action.type == 'SET_EVENT_EDITOR_VISIBLE') {
    state = {
      ...state,
      eventEditorVisible: true
    };
  }
  if (action.type == 'CLOSE_EVENT_EDITOR') {
    state = {
      ...state,
      eventEditorVisible: false
    };
  }
  if (action.type == 'DISPLAY_DATE') {
    state = {
      ...state,
      start: String(action.start),
      end: String(action.end)
    };
  }
  if (action.type == 'DATE_EVENTS_OFFER') {
    state = {
      ...state,
      reserveEventsOffer: action.events
    };
  }
  if (action.type == 'DATE_EVENTS_NEED') {
    state = {
      ...state,
      reserveEventsNeed: action.events
    };
  }
  if (action.type == 'ADD_EVENT_OFFER') {
    const addNewEventsOffer = state.reserveEventsOffer.concat(action.newEvent);
    state = {
      ...state,
      reserveEventsOffer: addNewEventsOffer
    };
  }

  if (action.type == 'ADD_EVENT_NEED') {
    const addNewEventsNeed = state.reserveEventsNeed.concat(action.newEvent);
    state = {
      ...state,
      reserveEventsNeed: addNewEventsNeed
    };
  }
  if (action.type == 'REMOVE_EVENT_OFFER') {
    state = {
      ...state,
      reserveEventsOffer: state.reserveEventsOffer.filter(
        ev => ev.id != action.id
      )
    };
  }

  if (action.type == 'REMOVE_EVENT_NEED') {
    state = {
      ...state,
      reserveEventsNeed: state.reserveEventsNeed.filter(
        ev => ev.id != action.id
      )
    };
  }

  return state;
}
