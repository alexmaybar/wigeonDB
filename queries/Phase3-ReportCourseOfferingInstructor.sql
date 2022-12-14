--Report each course offering and the instructor assigned to it
SELECT first_name, last_name, instructor_id, course_id, section_num, semester, year
FROM Instructor NATURAL JOIN Section NATURAL JOIN Teaches ORDER BY course_id;