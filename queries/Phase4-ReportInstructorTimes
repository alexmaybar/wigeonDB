-- Report what times an instructor is teaching
with instructorTeaches(section_id) as (select section_id from Teaches where instructor_id = 'input')
select start_time, end_time from instructorTeaches natural join Section natural join Timeslot;