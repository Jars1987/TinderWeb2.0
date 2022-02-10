# Tinder Clone in Web

This build was for my first client. The client has seen Tinder Clone from Sonny
Sangha on React Native and wanted something similar but with diferent
specifications.

The client specifications:

- Same App but in a Web App
- Instead of Google Login he wanted Email and Password
- In the Profile Feature he wanted Gender as Male and Female and no Job
  description
- He wanted a Search Feature to be able to search by gender and age

The Extra Mile:

- Instead of URL links to upload a photo I implemented firebase image storage to
  upload the images and get the url
- Added some loading screens for a better flow and user experience

I have watched Sonny's video and re-used some of the logic for the DB structure
and followed is design.

What I have used to implement this:

- React
- Tailwind for an easy styling
- Firebase (authentication, Image Upload and )
- React Tinder Card (for the swipe feature)
- React Hook Form (for some of the forms as it helps with validation)
- Material-tailwind/react (to get some of the materia-ui features but using
  tailwind)
- React Slider (for the Age Range selection)
- React Slider (for the gender search slider)

Pros:

- It was nice to hace a chalenge. Although there was a turtorial for Reacr
  Native for this app there is a lot of things that are done differently and
  there was a log of improvising.
- Refresh on React Hook Form
- Refresh on using setTimeout inside useEffect and trying to update the state
  inside this setTimeout
- Improved React Router Skills as I add to use useLocation state to pass data
  throw Routes
- Learned how to do implement a Modal using React Router
- Learned how to improve performance using useMemo Hook
- My first job

Cons:

- It took more time than I expected
- Build could use a refactor to become more performant
- Using front end (React) in a App that does a lot of API calls to a diferent
  server can make the App slow and with bad experince. Next JS and the Server
  Side Rendering would be a better choice forperformance.
- Used setTimout to delay showing the content and alowwing the info to be
  dowloaded from the DB. Used the useEffect to call this when there is a change
  in the user. NEEDS TO BE CHANGED. As the time to download depends on the
  provider the user is using and loading times can be diferent.
- Typescript would have prevented some small issues but I am not that proficient
  with typescript yet and has this is for a client and not for learning I
  couldn't risk it.
