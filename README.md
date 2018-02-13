# personalcalculatorapp
Personal calculator app that keeps records of calculations performed. This app utilizes Docker containers to run the following:
  - Django server
  - Postgres database
  - ReactJS front-end
  - Django API REST Framework to add records to Postgres database

Steps to install the app
- Git clone this repo into your local drive
- Navigate to the project folder and run the command `docker-compose up`

Using the app
- The home page is a calculator UI that will allow you to perform non-decimal basic arithmetic calculations. 
- Keyboard support is included for the calculator
- User will be able to navigate to 'View Logs' to view a list of all calculations performed by user 
- User will be able to navigate back to 'View Calculator' from the logs page to use the calculator
- Records of calculations will not be lost upon page refresh as records are persisted to a back-end database

Enjoy calculating!

