USE newfresh;

-- Drop the existing event
DROP EVENT IF EXISTS timer_event;

DELIMITER //

CREATE EVENT timer_event
ON SCHEDULE
EVERY 1 SECOND
DO
BEGIN
    DECLARE done BOOLEAN DEFAULT FALSE;
    DECLARE city_id_val, clock_tick_rate_val, current_time_val, current_day_val INT;
    DECLARE new_current_time, new_current_day INT;
    DECLARE cur CURSOR FOR SELECT CityId, Clocktickrate, CurrentTime, CurrentDay FROM city;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN cur;

    read_loop: LOOP
        FETCH cur INTO city_id_val, clock_tick_rate_val, current_time_val, current_day_val;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Calculate new current time
        SET new_current_time = current_time_val + (clock_tick_rate_val * 300);
        SET new_current_day = current_day_val;

        -- Check if current time exceeds 86400 (24 hours)
        IF new_current_time >= 86400 THEN
            SET new_current_time = new_current_time - 86400;
            SET new_current_day = new_current_day + 1;
        END IF;

        -- Update the city table only if not during an insert operation
        IF (SELECT TRIGGER_NESTLEVEL()) = 0 THEN
            UPDATE city SET CurrentTime = new_current_time, CurrentDay = new_current_day WHERE CityId = city_id_val;
        END IF;
    END LOOP;

    CLOSE cur;
END;
//

DELIMITER ;
