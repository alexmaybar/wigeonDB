--Report which courses do not have an instructor
select course_id, section_num, semester, year
from Section left outer join Teaches using(section_id)
where instructor_id is NULL ORDER BY course_id;