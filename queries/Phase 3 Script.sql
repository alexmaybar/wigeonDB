DROP TABLE IF EXISTS Teaches, Non_Instruct, Section, Course, TEU, Timeslot, Instructor;

CREATE TABLE Timeslot (
	class_mod VARCHAR(3),
	start_time TIME,
	end_time TIME,
	PRIMARY KEY (class_mod)
	);
INSERT INTO Timeslot (class_mod)
VALUES
	('A'),
	('A3'),
    ('A4'),
    ('B'),
    ('B3'),
    ('B4'),
    ('C'),
    ('C3'),
    ('C4'),
    ('D'),
    ('D3'),
    ('D4'),
    ('E'),
    ('E3'),
    ('E4'),
    ('F'),
    ('F3'),
    ('F4'),
    ('G'),
    ('G3'),
    ('G4'),
    ('H'),
    ('H3'),
    ('H4'),
    ('I'),
    ('I3'),
    ('I4'),
    ('J'),
    ('J3'),
    ('J4'),
    ('AA'),
    ('BB'),
    ('WEB');
	
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
    non_instruct_id INT(8),
    instructor_id INT(8) NOT NULL,
    task VARCHAR(75) NOT NULL,
    semester VARCHAR(15) NOT NULL,
    year INT(4) NOT NULL,
    ni_teu FLOAT(4, 2) NOT NULL,
    primary key (non_instruct_id),
	FOREIGN KEY (instructor_id) REFERENCES Instructor (instructor_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT UC_non_inst UNIQUE (instructor_id, task, semester, year, ni_teu)
);

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
      (4333, 'History', 'History of Crime and Punishment', 3);

INSERT IGNORE INTO Section (section_id, semester, section_num, year, course_id, class_mod)
VALUES
	(11010122, 'Fall', 1, 2022, 1101, 'A'),
    (11010222, 'Fall', 2, 2022, 1101, 'B'),
    (11010322, 'Fall', 3, 2022, 1101, 'C'),
    (21020122, 'Fall', 1, 2022, 2102, 'D'),
    (21020222, 'Fall', 2, 2022, 2102, 'E'),
    (11040122, 'Fall', 1, 2022, 1104, 'F'),
    (11040222, 'Fall', 2, 2022, 1104, 'G'),
    (12120122, 'Fall', 1, 2022, 1212, 'H'),
    (12120222, 'Fall', 2, 2022, 1212, 'I'),
    (12160122, 'Fall', 1, 2022, 1216, 'J'),
    (12160222, 'Fall', 2, 2022, 1216, 'A'),
    (12160322, 'Fall', 3, 2022, 1216, 'B'),
    (12350122, 'Fall', 1, 2022, 1235, 'C'),
    (12350222, 'Fall', 2, 2022, 1235, 'D'),
    (12350322, 'Fall', 3, 2022, 1235, 'E'),
    (13130122, 'Fall', 1, 2022, 1313, 'F'),
    (13130222, 'Fall', 2, 2022, 1313, 'G'),
    (13510122, 'Fall', 1, 2022, 1351, 'H'),
    (13510222, 'Fall', 2, 2022, 1351, 'I'),
    (13510322, 'Fall', 3, 2022, 1351, 'J'),
    (13890122, 'Fall', 1, 2022, 1389, 'A'),
    (13890222, 'Fall', 2, 2022, 1389, 'B'),
    (13890322, 'Fall', 3, 2022, 1389, 'C'),
    (21040122, 'Fall', 1, 2022, 2104, 'D'),
    (21040222, 'Fall', 2, 2022, 2104, 'E'),
    (21040322, 'Fall', 3, 2022, 2104, 'F'),
    (21041122, 'Spring', 1, 2023, 2104, 'G'),
    (21101122, 'Spring', 1, 2023, 2110, 'H'),
    (21101222, 'Spring', 2, 2023, 2110, 'I'),
    (21101322, 'Spring', 3, 2023, 2110, 'J'),
    (22001122, 'Spring', 1, 2023, 2200, 'A'),
    (22001222, 'Spring', 2, 2023, 2200, 'B'),
    (22001322, 'Spring', 3, 2023, 2200, 'C'),
    (22141122, 'Spring', 1, 2023, 2214, 'D'),
    (22141222, 'Spring', 2, 2023, 2214, 'E'),
    (22211122, 'Spring', 1, 2023, 2221, 'F'),
    (22211222, 'Spring', 2, 2023, 2221, 'G'),
    (23101122, 'Spring', 1, 2023, 2310, 'H'),
    (23101222, 'Spring', 2, 2023, 2310, 'I'),
    (23111122, 'Spring', 1, 2023, 2311, 'J'),
    (23111222, 'Spring', 2, 2023, 2311, 'A'),
    (23111322, 'Spring', 3, 2023, 2311, 'B'),
    (31001122, 'Spring', 1, 2023, 3100, 'C'),
    (31001222, 'Spring', 2, 2023, 3100, 'D'),
    (31011122, 'Spring', 1, 2023, 3101, 'E'),
    (31011222, 'Spring', 2, 2023, 3101, 'F'),
    (31101122, 'Spring', 1, 2023, 3110, 'G'),
    (31101222, 'Spring', 2, 2023, 3110, 'H'),
    (31111122, 'Spring', 1, 2023, 3111, 'I'),
    (31111222, 'Spring', 2, 2023, 3111, 'J'),
    (31201122, 'Spring', 1, 2023, 3120, 'A'),
    (31201222, 'Spring', 2, 2023, 3120, 'B'),
    (31211122, 'Spring', 1, 2023, 3121, 'C'),
    (31311222, 'Spring', 2, 2023, 3121, 'D'),
    (32030122, 'Fall', 1, 2022, 3203, 'E'),
    (54000122, 'Fall', 1, 2022, 5400, 'F'),
    (42000122, 'Fall', 1, 2022, 4200, 'G'),
    (42000222, 'Fall', 2, 2022, 4200, 'H'),
    (42121122, 'Interim', 1, 2023, 4212, 'AA'),
    (42161122, 'Interim', 1, 2023, 4216, 'AA'),
    (42901122, 'Interim', 1, 2023, 4290, 'BB'),
    (43201122, 'Interim', 1, 2023, 4320, 'BB'),
    (43240122, 'Interim', 1, 2022, 4324, 'BB'),
    (43330122, 'Interim', 1, 2022, 4333, 'AA'),
    (22140122, 'Interim', 1, 2022, 2214, 'BB'),
    (23100122, 'Interim', 1, 2022, 2310, 'AA'),
    (21020322, 'Fall', 3, 2022, 2102, 'I'),
    (54000222, 'Fall', 2, 2022, 5400, 'J'),
    (42160122, 'Fall', 1, 2022, 4216, 'A'),
    (22000122, 'Fall', 1, 2022, 2200, 'B'),
    (21100122, 'Fall', 1, 2022, 2110, 'C');