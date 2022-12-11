-- Report what time each course offering is at
select course_id, section_num, semester, year, start_time, end_time from Section natural join Timeslot ORDER BY course_id;