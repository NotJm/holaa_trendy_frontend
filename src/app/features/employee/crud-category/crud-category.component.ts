import { Component, signal } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import type { ICategory } from "../../../core/interfaces/categories.interface"

@Component({
  selector: "app-crud-category",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./crud-category.component.html",
  styleUrl: "./crud-category.component.css",
})
export class CrudCategoryComponent {
  // Signals para el estado visual
  isModalOpen = signal<boolean>(false)
  isDeleteModalOpen = signal<boolean>(false)
  isLoading = signal<boolean>(false)

  // Datos mock para el diseño
  categories: ICategory[] = [
    {
      id: "1",
      name: "Faldas",
      description:
        "Faldas elegantes y casuales para toda ocasión. Desde faldas largas hasta mini faldas con diferentes estilos y cortes.",
      imgUri:
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "2",
      name: "Blusas",
      description:
        "Blusas modernas y versátiles para el día a día. Perfectas para combinar con cualquier outfit profesional o casual.",
      imgUri:
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "3",
      name: "Vestidos",
      description:
        "Vestidos elegantes para eventos especiales y ocasiones formales. Desde vestidos de noche hasta vestidos casuales.",
      imgUri:
        "https://images.unsplash.com/photo-1566479179817-c0b2b2b0b5b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "4",
      name: "Pantalones",
      description:
        "Pantalones cómodos y estilosos para cualquier actividad. Desde jeans casuales hasta pantalones formales de vestir.",
      imgUri:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "5",
      name: "Accesorios",
      description:
        "Accesorios únicos para complementar tu estilo. Bolsos, carteras, cinturones y más para completar tu look perfecto.",
      imgUri:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: "6",
      name: "Zapatos",
      description:
        "Calzado de alta calidad para todas las ocasiones. Desde zapatos casuales hasta tacones elegantes para eventos especiales.",
      imgUri:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
  ]

  searchTerm = ""
  editingCategory: ICategory | null = null
  categoryToDelete: ICategory | null = null

  // Métodos para el diseño
  openCreateModal() {
    this.editingCategory = null
    this.isModalOpen.set(true)
  }

  openEditModal(category: ICategory) {
    this.editingCategory = category
    this.isModalOpen.set(true)
  }

  closeModal() {
    this.isModalOpen.set(false)
    this.editingCategory = null
  }

  openDeleteModal(category: ICategory) {
    this.categoryToDelete = category
    this.isDeleteModalOpen.set(true)
  }

  closeDeleteModal() {
    this.isDeleteModalOpen.set(false)
    this.categoryToDelete = null
  }

  saveCategory() {
    this.isLoading.set(true)
    setTimeout(() => {
      this.isLoading.set(false)
      this.closeModal()
    }, 2000)
  }

  deleteCategory() {
    this.isLoading.set(true)
    setTimeout(() => {
      this.isLoading.set(false)
      this.closeDeleteModal()
    }, 1000)
  }

  get filteredCategories() {
    return this.categories.filter((category) => {
      const matchesSearch =
        category.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      return matchesSearch
    })
  }

  get totalCategories() {
    return this.categories.length
  }
}
