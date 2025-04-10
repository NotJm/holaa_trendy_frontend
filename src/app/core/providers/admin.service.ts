  import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { Audit } from "../interfaces/audit.interface";
import {
    CompanyProfile,
    UpdateBusinessProfile,
} from "../interfaces/business.profile";
import {
    CreateDocument,
    Document,
    UpdateDocument,
} from "../interfaces/document";
import {
    EmailConfiguration,
    UpdateEmailConfiguration,
} from "../interfaces/emal.configuration";
import {
    IncidentConfiguration,
    UpdateIncidentConfiguration,
} from "../interfaces/incident.configuration";
import {
    CreateSocialSite,
    SocialSite,
    UpdateSocialSite,
} from "../interfaces/social.site";

@Injectable({
  providedIn: "root",
})
export class AdminService {
private readonly api = environment.API;

  private httpOptions = {
    withCredentials: true,
  };

  

  constructor(private readonly httpClient: HttpClient) {}

  getAllUsers(): Observable<[]> {
    return this.httpClient
      .get<[]>(`${this.api}/users/get/all`, this.httpOptions)
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        })
      );
  }

  getAllDocuments(): Observable<Document[]> {
    return this.httpClient
      .get<Document[]>(`${this.api}/document/get/all`, this.httpOptions)
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        })
      );
  }

  createDocument(
    document: CreateDocument
  ): Observable<{ state: boolean; message: string }> {
    return this.httpClient
      .post<{ state: boolean; message: string }>(
        `${this.api}/document/create`,
        document,
        this.httpOptions
      )
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        })
      );
  }

  updateDocument(
    id: string | undefined,
    document: UpdateDocument
  ): Observable<{ state: boolean; message: string }> {
    return this.httpClient
      .put<{ state: boolean; message: string }>(
        `${this.api}/document/update/${id}`,
        document,
        this.httpOptions
      )
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        })
      );
  }

  deleteDocument(id: string): Observable<{ state: boolean; message: string }> {
    return this.httpClient
      .delete<{ state: boolean; message: string }>(
        `${this.api}/document/delete/${id}`,
        this.httpOptions
      )
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        })
      );
  }

  /**
   * Metodo para activar un documento como vigente
   * @param id
   * @returns state: estado de la peticcion y message: mensaje de la peticion
   */
  activeDocument(id: string): Observable<{ state: boolean; message: string }> {
    return this.httpClient.put<{ state: boolean; message: string }>(
      `${this.api}/document/activation/${id}`,
      {},
      this.httpOptions
    );
  }

  getCompanyProfile(): Observable<CompanyProfile> {
    return this.httpClient
      .get<CompanyProfile>(`${this.api}/business/info`, this.httpOptions)
    .pipe(
      catchError((err) => {
        return throwError(() => { console.error(err.err.message) })
      })
    )
  }

  updateBussinesProfile(
    id: string | undefined,
    updateBusinessProfile: Partial<UpdateBusinessProfile>
  ): Observable<{ state: boolean; message: string }> {
    return this.httpClient
      .put<{ state: boolean; message: string }>(
        `${this.api}/business/update/profile/${id}`,
        updateBusinessProfile,
        this.httpOptions
      )
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        })
      );
  }

  /**
   * Metodo para obtener los datos de la auditoria
   */
  getAuditData(): Observable<Audit[]> {
    return this.httpClient
      .get<Audit[]>(`${this.api}/audit/info`, this.httpOptions)
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        })
      );
  }

  /**
   * Metodo para obtener la configuracion del modulo de incidencias
   */
  getIncidentConfiguration(): Observable<IncidentConfiguration> {
    return this.httpClient
      .get<IncidentConfiguration>(
        `${this.api}/incident/configuration`,
        this.httpOptions
      )
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        })
      );
  }

  /**
   * Metodo para actualizar la configuracion del modulo incidencias
   */
  updateIncidentConfiguration(
    id: string | undefined,
    updateIncidentConfiguration: UpdateIncidentConfiguration
  ): Observable<{ state: boolean; message: string }> {
    return this.httpClient
      .put<{ state: boolean; message: string }>(
        `${this.api}/incident/update/configuration/${id}`,
        updateIncidentConfiguration,
        this.httpOptions
      )
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        })
      );
  }

  /**
   * Metodo para obtener la configuracion del modulo de email
   */
  getEmailConfiguration(): Observable<EmailConfiguration> {
    return this.httpClient
      .get<EmailConfiguration>(
        `${this.api}/email/configuration`,
        this.httpOptions
      )
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        })
      );
  }

  /**
   * Metodo para actualizar la configuracion del modulo de email
   */
  updateEmailConfiguration(
    id: string | undefined,
    updateEmailConfiguration: Partial<UpdateEmailConfiguration>
  ): Observable<{ state: boolean; message: string }> {
    return this.httpClient
      .put<{ state: boolean; message: string }>(
        `${this.api}/email/update/configuration/${id}`,
        updateEmailConfiguration,
        this.httpOptions
      )
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        })
      );
  }

  /**
   * Metodo para obtener todas las redes sociales
   */
  getSocialSites(): Observable<SocialSite[]> {
    return this.httpClient
      .get<SocialSite[]>(`${this.api}/business/get/social`, this.httpOptions)
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        })
      );
  }

  /**
   * Metodo para añadir redes sociales
   */
  createSocialSite(
    createSocialSite: Partial<CreateSocialSite>
  ): Observable<{ state: boolean; message: string }> {
    return this.httpClient
      .post<{ state: boolean; message: string }>(
        `${this.api}/business/create/social`,
        createSocialSite,
        this.httpOptions
      )
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        })
      );
  }

  /**
   * Metodo para actualizar redes sociales
   */
  updateSocialSite(
    id: string | undefined,
    updateSocialSite: Partial<UpdateSocialSite>
  ): Observable<{ state: boolean; message: string }> {
    return this.httpClient
      .put<{ state: boolean; message: string }>(
        `${this.api}/business/update/social/${id}`,
        updateSocialSite,
        this.httpOptions
      )
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        })
      );
  }

  /**
   * Metodo para eliminar una redes social
   */
  deleteSocialSite(
    id: string | undefined
  ): Observable<{ state: boolean; message: string }> {
    return this.httpClient
      .delete<{ state: boolean; message: string }>(
        `${this.api}/business/delete/social/${id}`,
        this.httpOptions
      )
      .pipe(
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        })
      );
  }
}
