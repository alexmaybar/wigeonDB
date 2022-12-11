with instructorTeaches(instructor_id, first_name, last_name, section_id, desired_load)
as (select instructor_id, first_name, last_name, section_id, desired_load from Instructor left outer join Teaches using(instructor_id)),
instructorTEU(instructor_id, first_name, last_name, teu, desired_load)
as (select instructor_id, first_name, last_name, teu, desired_load
from instructorTeaches
left outer join Section using(section_id)
left outer join Course using(course_id)
left outer join TEU using(num_credits)),
instructorTEUsum(instructor_id, first_name, last_name, teuSum, desired_load) as
(select instructor_id, first_name, last_name, SUM(teu) as teuSum, desired_load from instructorTEU group by instructor_id)
select * from instructorTEUsum where teuSum < (desired_load + .3) OR teuSum > (desired_load + .3) or teuSum is NULL ORDER BY instructor_id;