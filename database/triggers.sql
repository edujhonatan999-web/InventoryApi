DELIMITER $$

-- VALIDAR ANTES DE ACTUALIZAR
CREATE TRIGGER before_update_movement
BEFORE UPDATE ON movements
FOR EACH ROW
BEGIN
    DECLARE current_stock INT;

    -- Validar cantidad
    IF NEW.quantity <= 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'La cantidad debe ser mayor a 0';
    END IF;

    -- Obtener stock actual
    SELECT stock_quantity
    INTO current_stock
    FROM products
    WHERE id = NEW.product_id;

    /*
      Primero se devuelve el stock anterior
      para simular cómo quedaría realmente
    */

    IF OLD.movement_type = 'out' THEN
        SET current_stock = current_stock + OLD.quantity;
    END IF;

    IF OLD.movement_type = 'in' THEN
        SET current_stock = current_stock - OLD.quantity;
    END IF;

    -- Validar nueva salida
    IF NEW.movement_type = 'out' THEN

        IF current_stock < NEW.quantity THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Stock insuficiente para actualizar movimiento';
        END IF;

    END IF;

END$$


-- ACTUALIZAR STOCK DESPUÉS DEL UPDATE
CREATE TRIGGER after_update_movement
AFTER UPDATE ON movements
FOR EACH ROW
BEGIN

    -- DEVOLVER movimiento anterior

    IF OLD.movement_type = 'in' THEN

        UPDATE products
        SET stock_quantity = stock_quantity - OLD.quantity
        WHERE id = OLD.product_id;

    END IF;

    IF OLD.movement_type = 'out' THEN

        UPDATE products
        SET stock_quantity = stock_quantity + OLD.quantity
        WHERE id = OLD.product_id;

    END IF;


    -- APLICAR nuevo movimiento

    IF NEW.movement_type = 'in' THEN

        UPDATE products
        SET stock_quantity = stock_quantity + NEW.quantity
        WHERE id = NEW.product_id;

    END IF;

    IF NEW.movement_type = 'out' THEN

        UPDATE products
        SET stock_quantity = stock_quantity - NEW.quantity
        WHERE id = NEW.product_id;

    END IF;

END$$

DELIMITER ;




DELIMITER $$

-- VALIDAR STOCK ANTES DE INSERTAR
CREATE TRIGGER before_insert_movement
BEFORE INSERT ON movements
FOR EACH ROW
BEGIN
    DECLARE current_stock INT;

    -- Obtener stock actual del producto
    SELECT stock_quantity
    INTO current_stock
    FROM products
    WHERE id = NEW.product_id;

    -- Validar si es salida
    IF NEW.movement_type = 'out' THEN

        -- Verificar si hay suficiente stock
        IF current_stock < NEW.quantity THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Stock insuficiente para realizar la salida';
        END IF;

    END IF;
END$$


-- ACTUALIZAR STOCK DESPUÉS DE INSERTAR
CREATE TRIGGER after_insert_movement
AFTER INSERT ON movements
FOR EACH ROW
BEGIN

    -- Entrada
    IF NEW.movement_type = 'in' THEN

        UPDATE products
        SET stock_quantity = stock_quantity + NEW.quantity
        WHERE id = NEW.product_id;

    END IF;

    -- Salida
    IF NEW.movement_type = 'out' THEN

        UPDATE products
        SET stock_quantity = stock_quantity - NEW.quantity
        WHERE id = NEW.product_id;

    END IF;

END$$

DELIMITER ;
DELIMITER $$

CREATE TRIGGER after_delete_movement
AFTER DELETE ON movements
FOR EACH ROW
BEGIN

    -- Si era una entrada, quitar stock
    IF OLD.movement_type = 'in' THEN

        UPDATE products
        SET stock_quantity = stock_quantity - OLD.quantity
        WHERE id = OLD.product_id;

    END IF;

    -- Si era una salida, devolver stock
    IF OLD.movement_type = 'out' THEN

        UPDATE products
        SET stock_quantity = stock_quantity + OLD.quantity
        WHERE id = OLD.product_id;

    END IF;

END$$

DELIMITER ;