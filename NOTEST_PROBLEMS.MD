### Solution for Error message "error:0308010C:digital envelope routines::unsupported":

##### For Windows, use the below command in cmd:

`set NODE_OPTIONS=--openssl-legacy-provider`

##### For Unix, use:

`export NODE_OPTIONS=--openssl-legacy-provider`





### Calendar component: 
* https://codesandbox.io/s/vydz4?file=/src/App.js
* https://codesandbox.io/s/color-calendar-react-y0cyf?file=/src/CalendarComponent.jsx (https://www.npmjs.com/package/color-calendar#usage-react)