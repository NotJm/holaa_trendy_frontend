import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SseService {
  private eventSource!: EventSource;
  private API = environment.API;

  connect(endpoint: string, path: string): void {
    if (this.eventSource) this.eventSource.close();

    this.eventSource = new EventSource(`${this.API}/${endpoint}/${path}`, {
      withCredentials: true,
    });

    this.eventSource.onopen = () => console.log('Conexion SSE abierta');

    this.eventSource.onerror = (error) => {
      console.error('Error en la conexion SSE', error);
      this.eventSource?.close();
    };
  }

  listen(callback: (data: any) => void): void {
    if (this.eventSource) {
      this.eventSource.onmessage = (event: MessageEvent<any>) => this.onMessage(event, callback)
    }
  }

  private onMessage(event: MessageEvent<any>, callback: (data: any) => void): void {
    try {
      const data = JSON.parse(event.data)
      callback(data);
    } catch (error) {
      if (this.eventSource) {
        this.eventSource.close();
      }
    }
  }

  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close();
      console.log('Conexión SSE cerrada');
    }
  }
}
