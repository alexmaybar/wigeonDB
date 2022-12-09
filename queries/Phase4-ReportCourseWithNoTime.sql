-- Report sections that are not assigned a class mod
select * from Section where class_mod is NULL;