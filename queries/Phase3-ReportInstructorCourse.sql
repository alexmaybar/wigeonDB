--Report instructors and the courses that are assigned to
SELECT first_name, last_name, instructor_id, course_id, section_num, semester, year
FROM Instructor NATURAL JOIN Section NATURAL JOIN Teaches ORDER BY instructor_id;