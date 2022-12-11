DROP TABLE IF EXISTS Teaches, Non_Instruct, Section, Course, TEU, Timeslot, Instructor;

CREATE TABLE Timeslot (
	class_mod VARCHAR(3),
	start_time TIME,
	end_time TIME,
	PRIMARY KEY (class_mod)
	);
INSERT INTO Timeslot (class_mod, start_time, end_time)
VALUES
    ('A3', '08:00:00', '08:50:00'),
    ('A4', '07:40:00', '08:50:00'),
    ('B3', '09:00:00', '09:50:00'),
    ('B4', '09:00:00', '10:10:00'),
    ('C3', '11:10:00', '12:00:00'),
    ('C4', '11:10:00', '12:20:00'),
    ('D3', '12:30:00', '13:20:00'),
    ('D4', '12:30:00', '13:40:00'),
    ('E3', '13:50:00', '14:50:00'),
    ('F3', '14:50:00', '15:40:00'),
    ('F4', '14:50:00', '16:00:00'),
    ('G3', '08:00:00', '09:15:00'),
    ('H3', '09:25:00', '10:40:00'),
    ('H4', '09:25:00', '11:05:00'),
    ('I3', '12:15:00', '13:30:00'),
    ('I4', '12:15:00', '13:55:00'),
    ('J3', '14:05:00', '15:20:00'),
    ('J4', '14:05:00', '15:45:00'),
    ('AA', '09:00:00', '12:00:00'),
    ('BB', '11:00:00', '02:00:00'),
    ('WEB', '00:00:00', '00:00:00');

	
CREATE TABLE TEU (
	num_credits INT(2),
	teu FLOAT(2, 1) not NULL,
	PRIMARY KEY (num_credits)
	);
INSERT INTO TEU (num_credits, teu)
VALUES
	(1, 1.0),
    (2, 2.0),
    (3, 3.4),
    (4, 3.4);
    
CREATE TABLE Instructor (
    instructor_id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(75) not NULL UNIQUE,
    last_name VARCHAR(25) not NULL,
    first_name VARCHAR(25) not NULL,
    desired_load FLOAT(4, 2) not NULL,
    PRIMARY KEY (instructor_id)
	);
  
CREATE TABLE Course (
	course_id INT(4),
	department VARCHAR(25) not NULL,
	course_title VARCHAR(75) not NULL,
	num_credits INT(2) not NULL,
	PRIMARY KEY (course_id),
	FOREIGN KEY (num_credits) REFERENCES TEU (num_credits) ON DELETE NO ACTION ON UPDATE CASCADE
	);
ALTER TABLE Course ADD CONSTRAINT UC_Course UNIQUE (department, course_title, num_credits);
	
CREATE TABLE Non_Instruct (
    non_instruct_id INT NOT NULL AUTO_INCREMENT,
    instructor_id INT(8) NOT NULL,
    task VARCHAR(75) NOT NULL,
    semester VARCHAR(15) NOT NULL,
    year INT(4) NOT NULL,
    ni_teu FLOAT(4, 2) NOT NULL,
    primary key (non_instruct_id),
	FOREIGN KEY (instructor_id) REFERENCES Instructor (instructor_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT UC_non_inst UNIQUE (instructor_id, task, semester, year, ni_teu)
);
ALTER TABLE Non_Instruct AUTO_INCREMENT = 1000;

CREATE TABLE Section (
	section_id INT(8),
	semester VARCHAR(10),
	section_num INT(2) not NULL,
	year INT(4) not NULL,
	course_id INT(8) not NULL,
	class_mod VARCHAR(2),
	PRIMARY KEY (section_id),
	FOREIGN KEY (course_id) REFERENCES Course (course_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (class_mod) REFERENCES Timeslot (class_mod) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT UC_section UNIQUE (semester, section_num, year, course_id)
	);

CREATE TABLE Teaches (
	section_id INT(8),
	instructor_id INT(8) not NULL,
	PRIMARY KEY (section_id),
	FOREIGN KEY (instructor_id) REFERENCES Instructor (instructor_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (section_id) REFERENCES Section (section_id) ON DELETE CASCADE ON UPDATE CASCADE
	);


INSERT IGNORE INTO Instructor (email, last_name, first_name, desired_load)
VALUES
	('gosnat@bethel.edu', 'Gossett', 'Nathan', 23.5),
    ('j-yang@bethel.edu', 'Yang', 'Jed', 23.5),
    ('t-auch@bethel.edu', 'Auch', 'Tanner', 23.5),
    ('d-thomas@bethel.edu', 'Thomas', 'Deborah', 23.5),
    ('yacste@bethel.edu', 'Yackel', 'Steven', 16.7),
    ('dunn@bethel.edu', 'Dunn', 'Lawrence', 12.4),
    ('wilkin@bethel.edu', 'Kinney', 'William', 23.5),
    ('huben@bethel.edu', 'Shull', 'Ben', 18.4),
    ('alebar@bethel.edu', 'Aybar', 'Alex', 21.7),
    ('rutliv@bethel.edu', 'Livingston', 'Ruth', 23.8);

INSERT IGNORE INTO Course (course_id, department, course_title, num_credits)
VALUES
	(1101, 'Computer Science', 'Intro to Programming', 4),
    (2102, 'Math', 'Precalculus', 3),
    (1104, 'Computer Science', 'Object Oriented Programming', 4),
    (1212, 'Computer Science', 'Data Structures', 3),
    (1216, 'Computer Science', 'Algorithms', 4),
    (1235, 'Computer Science', 'Computer Systems', 3),
    (1313, 'Computer Science', 'Database Systems', 4),
    (1351, 'Computer Science', 'High Performance Computing', 4),
    (1389, 'Computer Science', 'Artificial Intelligence', 3),
    (2104, 'Math', 'Calculus', 3),
    (2110, 'Math', 'Calculus 2', 3),
    (2200, 'Math', 'Multivariable Calculus', 3),
    (2214, 'Math', 'Discrete Mathematics', 3),
    (2221, 'Math', 'Linear Algebra', 3),
    (2310, 'Math', 'Differential Equations', 3),
    (2311, 'Math', 'Differential Equations and Linear Algebra', 4),
    (3100, 'English', 'How Stories Change the World', 3),
    (3101, 'English', 'British Literature I', 3),
    (3110, 'English', 'Introduction to Creative Writing', 3),
    (3111, 'English', 'Introduction to Professional and Technical Writing', 3),
    (3120, 'English', 'Reporting I', 3),
    (3121, 'English', 'Digital Storytelling', 3),
    (3203, 'English', 'World Literature', 3),
    (5400, 'Art', 'Underwater Basket Weaving', 4),
    (4200, 'History', 'American Civilization', 3),
    (4212, 'History', 'History of Islam', 3),
    (4216, 'History', 'American Constitutional History', 3),
    (4290, 'History', 'Introduction to History', 3),
    (4320, 'History', 'History and the Human Environment', 3),
    (4324, 'History', 'Human Rights in International History', 3),
    (4333, 'History', 'History of Crime and Punishment', 3)