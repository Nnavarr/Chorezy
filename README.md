![badmath](https://img.shields.io/badge/-MongoDB-yellow) ![badmath](https://img.shields.io/badge/-Express-green)  ![badmath](https://img.shields.io/badge/-React-blue)  ![badmath](https://img.shields.io/badge/-Node-orange) 

# Chorezy

## Table of contents

* [Installation](#installation)
* [Usage](#usage)
* [Technologies](#Technologies)
* [Description](#Description)

## Deployed site
Deployment for the Chorezy app was done on Heroku. The link can be found [here](https://chorezy2.herokuapp.com/)

## App ScreenShot

## Technologies
`MongoDB`
`Express.js`
`React.js`
`Node.js`

## Description
---
The Chorezy app 

## Installation
---
To use the app, no installation is necessary. Simply find the link to the deployment site (above). However, if you'd like to update the code to your linking, simply fork the repo.

## Usage
---
#### SignUp / Login
Like most apps, a user sign-up is required prior to using Chorezy. This will provide a custom user experience, tailored to your family and desired chores. The user sign up consists of the following: 
* Username
* Email
* Password

Returning users can then use their `Username` and `Password` to login.


#### Profile Functionality
With the account created, the user can navigate to their `profile` page and begin using the Chorezy app. Main functionality includes:

1. Add Child 
2. Add Chore
3. Assign Chore

#### Add Child
A user can choose to create other users that will be associated with their account. We refer to these sub accounts as "Child" accounts. By creating this parent / child relationship, the parent account will be given the ability to assign specific tasks to the Child

#### Add Chore
A user can add custom tasks via textbox under the Chore List section of their profile page. Three entries are required:

1. Chore text
2. Category Selection 
3. Point Value Selection

With the chore text input, the user can get creative with the task they wish to assign. Additionally, the user can determine how valuable the task is to complete. This is intended for the user to provide some type of reward for positive reinforcement.

Once the task is complete, the user can click the `Create` button to have this task become available within the assignment dropdown.

#### Assigning Task
Once child users and chores are created, the parent user can then assign these tasks. To assign, the user must do the following: 

1. Select Child
2. Select Task

Once the user and task are selected, clicking the `Assign` button will associate this task with the child user. 

#### Viewing Tasks by User
With the tasks assigned, the user can keep an overview of individual child user's tasks by clicking their username within their profile page. This take the user to that child's account summary and show any outstanding tasks



Happy browsing! 