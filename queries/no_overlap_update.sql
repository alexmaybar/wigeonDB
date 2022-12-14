CREATE TRIGGER no_overlap_update AFTER UPDATE ON Teaches
FOR EACH ROW
BEGIN
   IF((SELECT semester FROM Section WHERE Section.section_id = NEW.section_id) != 'Interim'
      AND (SELECT COUNT(*) FROM Teaches JOIN Section
      ON Section.section_id = Teaches.section_id
      WHERE Teaches.instructor_id = NEW.instructor_id
      AND Section.semester = (SELECT semester FROM Section WHERE Section.section_id = NEW.section_id)
      AND Section.year = (SELECT year FROM Section WHERE Section.section_id = NEW.section_id)
      AND SUBSTR(Section.class_mod, 1, 1) = (SELECT SUBSTR(class_mod, 1, 1) FROM Section WHERE Section.section_id = NEW.section_id)
      AND Section.class_mod != 'WEB') > 1)
   THEN
      SIGNAL SQLSTATE 'HY000' SET MYSQL_ERRNO=1627, MESSAGE_TEXT='This section could not be assigned because the instructor is already teaching a class during this time';
   END IF;

   IF((SELECT semester FROM Section WHERE Section.section_id = NEW.section_id) = 'Interim'
      AND (SELECT COUNT(*) FROM Teaches JOIN Section
      ON Section.section_id = Teaches.section_id
      WHERE Teaches.instructor_id = NEW.instructor_id
      AND Section.semester = 'Interim'
      AND Section.year = (SELECT year FROM Section WHERE Section.section_id = NEW.section_id)
      AND Section.class_mod = (SELECT class_mod FROM Section WHERE Section.section_id = NEW.section_id)
      AND Section.class_mod != 'WEB') > 1)
   THEN
      SIGNAL SQLSTATE 'HY000' SET MYSQL_ERRNO=1627, MESSAGE_TEXT='This section could not be assigned because the instructor is already teaching a class during this time';
   END IF;
END