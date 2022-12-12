CREATE TRIGGER interim_AA_BB_only_insert AFTER INSERT ON Section
FOR EACH ROW
BEGIN
   IF(((NEW.class_mod = 'AA' OR NEW.class_mod = 'BB') AND NEW.semester != 'Interim') OR ((NEW.class_mod != 'AA' AND NEW.class_mod != 'BB') AND NEW.semester = 'Interim'))
   THEN
      SIGNAL SQLSTATE 'HY000' SET MYSQL_ERRNO=1627, MESSAGE_TEXT='AA and BB class_mod sections can only be assigned to interim sections and cannot be assigned to non-interim sections';
   END IF;
END