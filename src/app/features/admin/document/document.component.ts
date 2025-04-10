import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CreateDocument, Document, UpdateDocument } from "../../../core/interfaces/document";
import { AdminService } from "../../../core/providers/admin.service";

@Component({
    selector: "app-document",
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    templateUrl: "./document.component.html",
    styleUrls: ["./document.component.css"]
})
export class DocumentComponent implements OnInit {
  formDocument: FormGroup;

  documents: Document[] = [];
  newDocument: CreateDocument = {};
  displayedDocuments: Document[] = [];
  updateDocument: UpdateDocument = {};
  currentDocument: Partial<Document> = {};
  filteredDocument: Document[] =[];
  
  currentPage: number = 1;
  documentsPerPage: number = 6;
  totalDocuments: number = 0;

  isAddMode: boolean = false;
  isEditMode: boolean = false;
  titleFilter: string = '';
  statusFilter: string = '';
  
  // Propiedades computadas para reemplazar las expresiones complejas en la plantilla
  activeDocumentsCount: number = 0;
  inactiveDocumentsCount: number = 0;

  constructor(
    private readonly adminService: AdminService,
    private readonly fb: FormBuilder,
  ) {
    this.formDocument = fb.group({
      title: ["", [Validators.required]],
      content: ["", [Validators.required]],
      effective_date: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments(): void {
    this.adminService.getAllDocuments().subscribe((documents) => {
      this.documents = documents;
      this.totalDocuments = documents.length;
      this.updateDocumentCounts();
      this.applyFilters();
      this.setPage(1);
    });
  }

  // Método para actualizar los contadores de documentos
  updateDocumentCounts(): void {
    this.activeDocumentsCount = this.documents.filter(doc => doc.current && !doc.isDelete).length;
    this.inactiveDocumentsCount = this.documents.filter(doc => !doc.current || doc.isDelete).length;
  }

  applyFilters(): void {
    this.filteredDocument = this.documents.filter(document => {
      const titleMatch = document.title.toLowerCase().includes(this.titleFilter.toLowerCase());

      const status =
        document.isDelete ? 'Eliminado' : document.current ? 'Vigente' : 'No Vigente';
      const statusMatch = !this.statusFilter || status === this.statusFilter;

      return titleMatch && statusMatch;
    });

    this.totalDocuments = this.filteredDocument.length;
    this.setPage(1); 
  }

  setPage(page: number): void {
    this.currentPage = page;
    const start = (page - 1) * this.documentsPerPage;
    const end = start + this.documentsPerPage;
    this.displayedDocuments = this.filteredDocument.slice(start, end);
  }

  // Método para obtener el índice del último elemento mostrado en la página actual
  getLastItemIndex(): number {
    return Math.min(this.currentPage * this.documentsPerPage, this.totalDocuments);
  }

  openAddModal(): void {
    this.isAddMode = true;
  }

  openEditModal(currentDocument: Document): void {
    this.isEditMode = true;
    this.isAddMode = false;
    this.currentDocument = currentDocument
  }

  closeModals(): void {
    this.isAddMode = false;
    this.isEditMode = false;
  }

  createDocument(): void {

  }

  editDocument(): void {
  

  }

  deleteDocument(documentId: string): void {

  }

  activeDocument(documentId: string, state: boolean): void {
   
  } 

  getTotalPages(): number[] {
    return Array(Math.ceil(this.totalDocuments / this.documentsPerPage))
      .fill(0)
      .map((x, i) => i + 1);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
}