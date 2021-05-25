CREATE TABLE bills_to_pay (
    id int(11) NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    original_value decimal(10,2) NOT NULL,
    fine_applied decimal(10,2) NOT NULL,
    fees_day decimal(10,2) NOT NULL,
    duedate date NOT NULL,
    payday date NOT NULL,
    created_at timestamp NOT NULL,
    updated_at timestamp NULL DEFAULT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;