const core = require("./enc.js");

core.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6MCwiaWF0IjoxNjAyNDc0OTQ3fQ.XSLjgvee-cfsEoHFxjBnNw9BuD5i-hxmhJXYfzq0QEw").then(res => {
  console.log(res);
}).catch(e=> {
  console.log(e)
})