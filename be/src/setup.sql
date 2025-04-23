DROP DATABASE IF EXISTS task_manager_db;

CREATE DATABASE task_manager_db;


DROP TABLE IF EXISTS tasks;


CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,       
  title VARCHAR(100) NOT NULL,  
  description TEXT,            
  status VARCHAR(50) NOT NULL, 
  due_date TIMESTAMP          
);
