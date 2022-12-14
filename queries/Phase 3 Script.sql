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
    desired_load FLOAT(4, 2) DEFAULT 23.5,
    PRIMARY KEY (instructor_id)
	);
  
CREATE TABLE Course (
	course_id INT(4) not NULL,
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
	class_mod VARCHAR(3),
	PRIMARY KEY (section_id),
	FOREIGN KEY (course_id) REFERENCES Course (course_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (class_mod) REFERENCES Timeslot (class_mod) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT UC_section UNIQUE (semester, section_num, year, course_id)
	);

CREATE TABLE Teaches (
	section_id INT(8) not NULL,
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

INSERT IGNORE INTO Section (section_id, semester, section_num, year, course_id, class_mod)
VALUES
	(11010122, 'Fall', 1, 2022, 1101, 'A4'),
    (11010222, 'Fall', 2, 2022, 1101, 'B4'),
    (11010322, 'Fall', 3, 2022, 1101, 'C4'),
    (21020122, 'Fall', 1, 2022, 2102, 'D3'),
    (21020222, 'Fall', 2, 2022, 2102, 'E3'),
    (11040122, 'Fall', 1, 2022, 1104, 'F4'),
    (11040222, 'Fall', 2, 2022, 1104, 'G4'),
    (12120122, 'Fall', 1, 2022, 1212, 'H3'),
    (12120222, 'Fall', 2, 2022, 1212, 'I3'),
    (12160122, 'Fall', 1, 2022, 1216, 'J4'),
    (12160222, 'Fall', 2, 2022, 1216, 'A4'),
    (12160322, 'Fall', 3, 2022, 1216, 'B4'),
    (12350122, 'Fall', 1, 2022, 1235, 'C3'),
    (12350222, 'Fall', 2, 2022, 1235, 'D3'),
    (12350322, 'Fall', 3, 2022, 1235, 'E3'),
    (13130122, 'Fall', 1, 2022, 1313, 'F4'),
    (13130222, 'Fall', 2, 2022, 1313, 'G4'),
    (13510122, 'Fall', 1, 2022, 1351, 'H4'),
    (13510222, 'Fall', 2, 2022, 1351, 'I4'),
    (13510322, 'Fall', 3, 2022, 1351, 'J4'),
    (13890122, 'Fall', 1, 2022, 1389, 'A3'),
    (13890222, 'Fall', 2, 2022, 1389, 'B3'),
    (13890322, 'Fall', 3, 2022, 1389, 'C3'),
    (21040122, 'Fall', 1, 2022, 2104, 'D3'),
    (21040222, 'Fall', 2, 2022, 2104, 'E3'),
    (21040322, 'Fall', 3, 2022, 2104, 'F3'),
    (21041122, 'Spring', 1, 2023, 2104, 'G3'),
    (21101122, 'Spring', 1, 2023, 2110, 'H3'),
    (21101222, 'Spring', 2, 2023, 2110, 'I3'),
    (21101322, 'Spring', 3, 2023, 2110, 'J3'),
    (22001122, 'Spring', 1, 2023, 2200, 'A3'),
    (22001222, 'Spring', 2, 2023, 2200, 'B3'),
    (22001322, 'Spring', 3, 2023, 2200, 'C3'),
    (22141122, 'Spring', 1, 2023, 2214, 'D3'),
    (22141222, 'Spring', 2, 2023, 2214, 'E3'),
    (22211122, 'Spring', 1, 2023, 2221, 'F3'),
    (22211222, 'Spring', 2, 2023, 2221, 'G3'),
    (23101122, 'Spring', 1, 2023, 2310, 'H3'),
    (23101222, 'Spring', 2, 2023, 2310, 'I3'),
    (23111122, 'Spring', 1, 2023, 2311, 'J4'),
    (23111222, 'Spring', 2, 2023, 2311, 'A4'),
    (23111322, 'Spring', 3, 2023, 2311, 'B4'),
    (31001122, 'Spring', 1, 2023, 3100, 'C3'),
    (31001222, 'Spring', 2, 2023, 3100, 'D3'),
    (31011122, 'Spring', 1, 2023, 3101, 'E3'),
    (31011222, 'Spring', 2, 2023, 3101, 'F3'),
    (31101122, 'Spring', 1, 2023, 3110, 'G3'),
    (31101222, 'Spring', 2, 2023, 3110, 'H3'),
    (31111122, 'Spring', 1, 2023, 3111, 'I3'),
    (31111222, 'Spring', 2, 2023, 3111, 'J3'),
    (31201122, 'Spring', 1, 2023, 3120, 'A3'),
    (31201222, 'Spring', 2, 2023, 3120, 'B3'),
    (31211122, 'Spring', 1, 2023, 3121, 'C3'),
    (31311222, 'Spring', 2, 2023, 3121, 'D3'),
    (32030122, 'Fall', 1, 2022, 3203, 'E3'),
    (54000122, 'Fall', 1, 2022, 5400, 'F4'),
    (42000122, 'Fall', 1, 2022, 4200, 'G3'),
    (42000222, 'Fall', 2, 2022, 4200, 'H3'),
    (42121122, 'Interim', 1, 2023, 4212, 'AA'),
    (42161122, 'Interim', 1, 2023, 4216, 'AA'),
    (42901122, 'Interim', 1, 2023, 4290, 'BB'),
    (43201122, 'Interim', 1, 2023, 4320, 'BB'),
    (43240122, 'Interim', 1, 2022, 4324, 'BB'),
    (43330122, 'Interim', 1, 2022, 4333, 'AA'),
    (22140122, 'Interim', 1, 2022, 2214, 'BB'),
    (23100122, 'Interim', 1, 2022, 2310, 'AA'),
    (21020322, 'Fall', 3, 2022, 2102, 'I3'),
    (54000222, 'Fall', 2, 2022, 5400, 'J4'),
    (42160122, 'Fall', 1, 2022, 4216, 'A3'),
    (22000122, 'Fall', 1, 2022, 2200, 'B3'),
    (21100122, 'Fall', 1, 2022, 2110, 'C3'),
    (54001122, 'Spring', 1, 2023, 5400, NULL),
    (54001222, 'Spring', 2, 2023, 5400, NULL);
