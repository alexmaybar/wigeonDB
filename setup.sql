CREATE TABLE Instructor (
    instructor_id INT(8),
    email VARCHAR(75) not NULL UNIQUE,
    last_name VARCHAR(25) not NULL,
    first_name VARCHAR(25) not NULL,
    desired_load FLOAT(4, 2) not NULL,
    PRIMARY KEY (instructor_id)
  );
  
CREATE TABLE Course (
	course_id INT(8),
	department VARCHAR(25) not NULL,
	course_title VARCHAR(25) not NULL,
	num_credits INT(2) not NULL,
	PRIMARY KEY (course_id),
    CONSTRAINT UC_course UNIQUE (department, course_title, num_credits, teu)
	);
	
CREATE TABLE Non_Instruct (
    non_instruct_id INT(8),
    instructor_id INT(8) NOT NULL,
    task VARCHAR(25) NOT NULL,
    semester VARCHAR(15) NOT NULL,
    year INT(4) NOT NULL,
    ni_teu FLOAT(4, 2) NOT NULL,
    primary key (non_instruct_id),
	FOREIGN KEY (instructor_id) REFERENCES Instructor (instructor_id) ON DELETE CASCADE,
    CONSTRAINT UC_non_inst UNIQUE (instructor_id, task, semester, year, teu)
  );

CREATE TABLE Section (
	section_id INT(8),
	semester VARCHAR(10),
	section_num INT(2) not NULL,
	year INT(4) not NULL,
	course_id INT(8) not NULL,
	PRIMARY KEY (section_id),
	FOREIGN KEY (course_id) REFERENCES Course (course_id) ON DELETE CASCADE,
    CONSTRAINT UC_section UNIQUE (semester, section_num, year, course_id)
	);

CREATE TABLE Teaches (
	section_id INT(8),
	instructor_id INT(8) not NULL,
	PRIMARY KEY (section_id),
	FOREIGN KEY (instructor_id) REFERENCES Instructor (instructor_id) ON DELETE CASCADE,
	FOREIGN KEY (section_id) REFERENCES Section (section_id) ON DELETE CASCADE,
	);
	
CREATE TABLE Section_Time (
	class_mod VARCHAR(2),
	section_id INT(8)
	PRIMARY KEY (class_mod, section_id)
	FOREIGN KEY (section_id) REFERENCES Section (section_id) ON DELETE CASCADE
	);
	
CREATE TABLE Timeslot (
	class_mod VARCHAR(2),
	num_credits INT(2),
	start_time TIME not NULL,
	end_time TIME not NULL,
	PRIMARY KEY (class_mod, num_credits),
	);
	
CREATE TABLE TEU (
	num_credits INT(2),
	teu FLOAT(2, 2) not NULL,
	PRIMARY KEY (num_credits)
	);