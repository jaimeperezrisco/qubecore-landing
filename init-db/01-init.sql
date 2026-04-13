INSERT INTO usuarios (email, nombre, password, rol, activo, creado_en)
VALUES (
    'admin@qubecore.es',
    'Admin QubeCore',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    'ROLE_ADMIN',
    true,
    NOW()
) ON DUPLICATE KEY UPDATE email = email;

INSERT INTO servicios (nombre, descripcion, icono, activo, orden) VALUES
('Quantum Hardware Access', 'Acceso a hardware', 'cpu', true, 1),
('Quantum Software Development', 'Software cuántico', 'code', true, 2),
('Quantum Consulting', 'Consultoría', 'briefcase', true, 3),
('Quantum Education', 'Formación', 'graduation-cap', true, 4),
('Quantum Cloud Services', 'Servicios Cloud', 'cloud', true, 5),
('Quantum Security', 'Criptografía y seguridad', 'shield', true, 6)
ON DUPLICATE KEY UPDATE nombre = nombre;
