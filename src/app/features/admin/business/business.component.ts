import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from "@angular/forms"

export interface EmpresaData {
  slogan: string
  logo: string
  tituloPagina: string
  direccion: string
  correoElectronico: string
  telefono: string
  sitioWeb: string
  redes: {
    facebook: string
    twitter: string
    instagram: string
    linkedin: string
  }
}


@Component({
  selector: "app-empresa",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./business.component.html",
  styleUrls: ["./business.component.css"],
})
export class BusinessComponent implements OnInit {
  empresaForm: any
  logoPreview: string | null = null
  isLoading = false
  successMessage = ""
  errorMessage = ""
  activeTab = "informacion"

  constructor(private fb: FormBuilder) {
    this.empresaForm = this.fb.group({
      slogan: ["", [Validators.required, Validators.maxLength(100)]],
      logo: [""],
      tituloPagina: ["", [Validators.required, Validators.maxLength(50)]],
      direccion: ["", [Validators.required, Validators.maxLength(200)]],
      correoElectronico: ["", [Validators.required, Validators.email]],
      telefono: ["", [Validators.required, Validators.pattern(/^[+]?[0-9\s\-$$$$]+$/)]],
      sitioWeb: ["", [Validators.pattern(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/)]],
      redes: this.fb.group({
        facebook: [""],
        twitter: [""],
        instagram: [""],
        linkedin: [""],
      }),
    })
  }

  ngOnInit() {
    this.loadEmpresaData()
  }

  loadEmpresaData() {
    // Simular carga de datos existentes
    const mockData: EmpresaData = {
      slogan: "Innovación y Excelencia",
      logo: "",
      tituloPagina: "Mi Empresa",
      direccion: "Av. Principal 123, Ciudad",
      correoElectronico: "contacto@miempresa.com",
      telefono: "+1 234 567 8900",
      sitioWeb: "www.miempresa.com",
      redes: {
        facebook: "miempresa",
        twitter: "miempresa",
        instagram: "miempresa",
        linkedin: "miempresa",
      },
    }

    this.empresaForm.patchValue(mockData)
  }

  onFileSelected(event: any) {
    const file = event.target.files[0]
    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e: any) => {
          this.logoPreview = e.target.result
          this.empresaForm.patchValue({ logo: file.name })
        }
        reader.readAsDataURL(file)
      } else {
        this.showError("Por favor selecciona un archivo de imagen válido")
      }
    }
  }

  removeLogo() {
    this.logoPreview = null
    this.empresaForm.patchValue({ logo: "" })
    const fileInput = document.getElementById("logo-upload") as HTMLInputElement
    if (fileInput) {
      fileInput.value = ""
    }
  }

  async onSubmit() {
    if (this.empresaForm.valid) {
      this.isLoading = true
      this.clearMessages()

      try {
        // Simular guardado
        await new Promise((resolve) => setTimeout(resolve, 1500))

        this.showSuccess("Perfil de empresa actualizado correctamente")
        console.log("Datos guardados:", this.empresaForm.value)
      } catch (error) {
        this.showError("Error al guardar los datos. Inténtalo de nuevo.")
      } finally {
        this.isLoading = false
      }
    } else {
      this.markFormGroupTouched()
      this.showError("Por favor completa todos los campos requeridos correctamente")
    }
  }

  setActiveTab(tab: string) {
    this.activeTab = tab
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.empresaForm.get(fieldName)
    return !!(field && field.invalid && (field.dirty || field.touched))
  }

  getFieldError(fieldName: string): string {
    const field = this.empresaForm.get(fieldName)
    if (field && field.errors) {
      if (field.errors["required"]) return "Este campo es requerido"
      if (field.errors["email"]) return "Ingresa un correo electrónico válido"
      if (field.errors["pattern"]) return "Formato inválido"
      if (field.errors["maxlength"]) return `Máximo ${field.errors["maxlength"].requiredLength} caracteres`
    }
    return ""
  }

  private markFormGroupTouched() {
    // Object.keys(this.empresaForm.controls).forEach((key) => {
    //   const control = this.empresaForm.get(key)
    //   if (control instanceof this.fb.group) {
    //     Object.keys(control.controls).forEach((nestedKey) => {
    //       control.get(nestedKey)?.markAsTouched()
    //     })
    //   } else {
    //     control?.markAsTouched()
    //   }  
    // })
  }

  private showSuccess(message: string) {
    this.successMessage = message
    this.errorMessage = ""
    setTimeout(() => (this.successMessage = ""), 5000)
  }

  private showError(message: string) {
    this.errorMessage = message
    this.successMessage = ""
    setTimeout(() => (this.errorMessage = ""), 5000)
  }

  private clearMessages() {
    this.successMessage = ""
    this.errorMessage = ""
  }
}
