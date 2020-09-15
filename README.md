# prototype
Spring + React js + Saga +JWT 

This is simple web-application.

The standart SpringSecurity with DB authentication was supplemented by JWT.  (login/password - user/user) 
App dump file of DB schema - vr09_01.backup in project dir.  
The DB connection info in:   \src\main\resources\application.properties


To prepare React part of project go to: \src\main\webapp\WEB-INF\view\react    and run command  -  npm install
    
To build a deplojable war-file in pom dir run command: mvn clean package install

App Context Root:  mvz-corp-system-prototype


After deploying to web-server application start page is :  /mvz-corp-system-prototype/index.html   
