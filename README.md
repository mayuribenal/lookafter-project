# **Lookafter**
Social Network web app for users that love plants and pets to connect with their local communities based on their location. Main features: registration, shared calendar, group chat, profile creation. Built with React/Redux, Node.js and PostgreSQL.
Through a shared calendar (react-big-calendar) and a group chat, users can manage their availability to support each other by watering each other’s plants and/or feed pets around their community. 
It features a home that describes how the community works, one shared calendar for availability, one shared calendar for needs, a group chat for the community, and a personal profile with bio.  

## **Motivation**
This application was built in one week as final project for a SPICED academy bootcamp in Berlin. I wanted to solve a problem: get users to keep their plants and pets taken care of when they are unavailable while connecting with the community. 


## **Registration**
Users must register by adding their full name, email address and the neighborhood they live in Berlin. After that step is completed, they can log in with their email and password.
![Registration](/public/screenshots/registration.png)


## **Home**
The first page the user lands after completing the registration and/or logged in. There is mainly content to describe how the app works.
![Home](/public/screenshots/home.png)
 
## **Calendars**
There are two calendar sections: one for users need, and the other for users availability (the future will be to implement a toggle). Each calendar has a different color to distinguish itself. I have used React Big Calendar to have an interactive calendar. All the members in the community are allowed to input the range of dates, a title, and the time they are available and everyone in the community are able to see that. The events could be removed only by the members that created it.
![Calendar1](https://github.com/mrachelb/lookafterproject/upload/master/public/screenshots/needcalendar.png)
![Calendar2](/public/screenshots/availability.png)

## **Chat**
A chat functionality where all the members of the community can participate.
![Chat](/public/screenshots/chat.png)


## **Personal Profile**
The user can upload the profile picture, add a bio, and see a summary of the events that he is available for and/or that he needs support. Also, users can add a bio and a photo of their pets and plants.
![Profile1](/public/screenshots/profile.png)
![Profile2](/public/screenshots/profile2.png)


