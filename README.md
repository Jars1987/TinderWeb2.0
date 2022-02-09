# Tinder Clone in Web

## Todo List

Cons:

- Using front end (React) in a App that does a lot of API calls to a diferent
  server make the App slow and with bad experince.
- Next JS and the Server Side Rendering would be a better choice for performance

- Used setTimout to delay showing the content and alowwing the info to be
  dowloaded from the DB. Used the useEffect to call this when there is a change
  in the user. NEEDS TO BE CHANGED. As the time to download depends on the
  provider the user is using and loading times can be diferent.
