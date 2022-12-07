-- Report what times instructors are teaching
with instructorTeaches(instructor_id, first_name, last_name, section_id)
as (select instructor_id, first_name, last_name, section_id
from Teaches natural join Instructor)
select instructor_id, first_name, last_name, start_time, end_time
from instructorTeaches natural join Section natural join Timeslot;