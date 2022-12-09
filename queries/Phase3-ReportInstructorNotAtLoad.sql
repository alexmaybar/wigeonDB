with instructorTeaches(instructor_id, section_id)
as (select instructor_id, section_id from Instructor left outer join Teaches using(instructor_id))
select instructor_id, teu
from instructorTeaches
left outer join Section using(section_id)
left outer join Course using(course_id)
left outer join TEU using(num_credits);