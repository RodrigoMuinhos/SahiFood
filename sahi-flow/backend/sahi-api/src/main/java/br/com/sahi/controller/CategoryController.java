package br.com.sahi.controller;

import br.com.sahi.entity.Category;
import br.com.sahi.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping
    public List<Category> getAllCategories() {
        return categoryRepository.findByActiveOrderByDisplayOrder(true);
    }

    @GetMapping("/{id}")
    public Optional<Category> getCategoryById(@PathVariable UUID id) {
        return categoryRepository.findById(id);
    }

    @PostMapping
    public Category createCategory(@RequestBody Category category) {
        return categoryRepository.save(category);
    }

    @PutMapping("/{id}")
    public Category updateCategory(@PathVariable UUID id, @RequestBody Category categoryDetails) {
        Optional<Category> category = categoryRepository.findById(id);
        if (category.isPresent()) {
            Category c = category.get();
            c.setName(categoryDetails.getName());
            c.setDisplayOrder(categoryDetails.getDisplayOrder());
            c.setActive(categoryDetails.getActive());
            return categoryRepository.save(c);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable UUID id) {
        categoryRepository.deleteById(id);
    }
}
