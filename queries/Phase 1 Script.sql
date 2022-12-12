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