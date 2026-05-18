-- V2__insert_initial_data.sql
-- Dados iniciais do SA'HI Flow

-- Insert Categories
INSERT INTO categories (id, name, display_order, active) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Sanduíches', 1, true),
('550e8400-e29b-41d4-a716-446655440002', 'Bowls', 2, true),
('550e8400-e29b-41d4-a716-446655440003', 'Café / Ovos', 3, true),
('550e8400-e29b-41d4-a716-446655440004', 'Bebidas', 4, true),
('550e8400-e29b-41d4-a716-446655440005', 'Conveniência', 5, true)
ON CONFLICT DO NOTHING;

-- Insert Products
INSERT INTO products (id, category_id, name, description, price, preparation_time_minutes, active, has_recipe) VALUES
-- Sanduíches
('550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440001', 'KÉF Baguette', 'Meia baguete prensada na chapa com carne refogada, queijo coalho, mussarela, cebola roxa e molho verde da casa.', 19.90, 4, true, true),

-- Bowls
('550e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440002', 'ZÁATAR Bowl', 'Kafta artesanal no bowl com arroz temperado, cenoura, ervas frescas, alho frito e molho da casa.', 22.90, 5, true, true),

-- Café / Ovos
('550e8400-e29b-41d4-a716-446655440030', '550e8400-e29b-41d4-a716-446655440003', 'LEV Breakfast', 'Pão artesano prensado com ovos cremosos e queijo mussarela.', 13.90, 3, true, true),

-- Bebidas
('550e8400-e29b-41d4-a716-446655440040', '550e8400-e29b-41d4-a716-446655440004', 'Água', 'Água mineral 500ml', 4.00, 1, true, false),
('550e8400-e29b-41d4-a716-446655440041', '550e8400-e29b-41d4-a716-446655440004', 'Refrigerante', 'Lata 350ml', 6.00, 1, true, false),
('550e8400-e29b-41d4-a716-446655440042', '550e8400-e29b-41d4-a716-446655440004', 'Suco Natural', 'Suco de fruta fresco 300ml', 8.00, 2, true, false),

-- Conveniência
('550e8400-e29b-41d4-a716-446655440050', '550e8400-e29b-41d4-a716-446655440005', 'Chocolate', 'Barra de chocolate 40g', 5.00, 1, true, false),
('550e8400-e29b-41d4-a716-446655440051', '550e8400-e29b-41d4-a716-446655440005', 'Paçoca', 'Paçoca tradicional 50g', 3.50, 1, true, false),
('550e8400-e29b-41d4-a716-446655440052', '550e8400-e29b-41d4-a716-446655440005', 'Cookie', 'Cookie integral 35g', 4.00, 1, true, false)
ON CONFLICT DO NOTHING;

-- Insert Ingredients
INSERT INTO ingredients (id, name, unit, current_stock, minimum_stock, average_cost, expiration_control, active) VALUES
('550e8400-e29b-41d4-a716-446655440100', 'Carne Refogada', 'g', 2000, 800, 2.80, true, true),
('550e8400-e29b-41d4-a716-446655440101', 'Molho Verde', 'g', 1000, 300, 0.50, true, true),
('550e8400-e29b-41d4-a716-446655440102', 'Mussarela', 'g', 1500, 500, 0.90, true, true),
('550e8400-e29b-41d4-a716-446655440103', 'Baguete', 'un', 15, 5, 1.10, true, true),
('550e8400-e29b-41d4-a716-446655440104', 'Arroz Temperado', 'g', 1500, 500, 1.20, true, true),
('550e8400-e29b-41d4-a716-446655440105', 'Kafta', 'g', 1800, 600, 2.50, true, true),
('550e8400-e29b-41d4-a716-446655440106', 'Ovos', 'un', 30, 12, 0.80, true, true),
('550e8400-e29b-41d4-a716-446655440107', 'Pão Artesano', 'un', 10, 3, 2.50, true, true),
('550e8400-e29b-41d4-a716-446655440108', 'Salada Cortada', 'g', 500, 200, 0.40, true, true),
('550e8400-e29b-41d4-a716-446655440109', 'Cenoura', 'g', 800, 300, 0.30, true, true)
ON CONFLICT DO NOTHING;

-- Insert Recipes (Fichas Técnicas)
INSERT INTO recipes (id, product_id, version, active) VALUES
('550e8400-e29b-41d4-a716-446655440200', '550e8400-e29b-41d4-a716-446655440010', 1, true),
('550e8400-e29b-41d4-a716-446655440201', '550e8400-e29b-41d4-a716-446655440020', 1, true),
('550e8400-e29b-41d4-a716-446655440202', '550e8400-e29b-41d4-a716-446655440030', 1, true)
ON CONFLICT DO NOTHING;

-- Insert Recipe Items (Ingredientes das Receitas)
INSERT INTO recipe_items (id, recipe_id, ingredient_id, quantity, unit, loss_percentage) VALUES
-- KÉF Baguette
('550e8400-e29b-41d4-a716-446655440210', '550e8400-e29b-41d4-a716-446655440200', '550e8400-e29b-41d4-a716-446655440103', 0.5, 'un', 5),
('550e8400-e29b-41d4-a716-446655440211', '550e8400-e29b-41d4-a716-446655440200', '550e8400-e29b-41d4-a716-446655440100', 100, 'g', 3),
('550e8400-e29b-41d4-a716-446655440212', '550e8400-e29b-41d4-a716-446655440200', '550e8400-e29b-41d4-a716-446655440102', 30, 'g', 2),
('550e8400-e29b-41d4-a716-446655440213', '550e8400-e29b-41d4-a716-446655440200', '550e8400-e29b-41d4-a716-446655440101', 20, 'g', 2),

-- ZÁATAR Bowl
('550e8400-e29b-41d4-a716-446655440220', '550e8400-e29b-41d4-a716-446655440201', '550e8400-e29b-41d4-a716-446655440105', 120, 'g', 4),
('550e8400-e29b-41d4-a716-446655440221', '550e8400-e29b-41d4-a716-446655440201', '550e8400-e29b-41d4-a716-446655440104', 150, 'g', 3),
('550e8400-e29b-41d4-a716-446655440222', '550e8400-e29b-41d4-a716-446655440201', '550e8400-e29b-41d4-a716-446655440109', 50, 'g', 2),
('550e8400-e29b-41d4-a716-446655440223', '550e8400-e29b-41d4-a716-446655440201', '550e8400-e29b-41d4-a716-446655440101', 20, 'g', 2),

-- LEV Breakfast
('550e8400-e29b-41d4-a716-446655440230', '550e8400-e29b-41d4-a716-446655440202', '550e8400-e29b-41d4-a716-446655440107', 1, 'un', 3),
('550e8400-e29b-41d4-a716-446655440231', '550e8400-e29b-41d4-a716-446655440202', '550e8400-e29b-41d4-a716-446655440106', 2, 'un', 2),
('550e8400-e29b-41d4-a716-446655440232', '550e8400-e29b-41d4-a716-446655440202', '550e8400-e29b-41d4-a716-446655440102', 40, 'g', 2)
ON CONFLICT DO NOTHING;
