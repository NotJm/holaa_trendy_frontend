import { Injectable } from '@angular/core';

export interface PasswordStrength {
  score: number; // 0-4
  status: 'very-weak' | 'weak' | 'so-so' | 'good' | 'great';
  color: string;
  percentage: number;
}

@Injectable({
  providedIn: 'root'
})
export class PasswordStrengthService {
  checkStrength(password: string): PasswordStrength {
    let score = 0;
    
    // Longitud mínima
    if (password.length >= 8) score++;
    
    // Contiene números
    if (/\d/.test(password)) score++;
    
    // Contiene letras minúsculas y mayúsculas
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    
    // Contiene caracteres especiales
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

    const strength: { [key: number]: PasswordStrength } = {
      0: { score: 0, status: 'very-weak', color: '#ff4d4f', percentage: 20 },
      1: { score: 1, status: 'weak', color: '#ff4d4f', percentage: 40 },
      2: { score: 2, status: 'so-so', color: '#faad14', percentage: 60 },
      3: { score: 3, status: 'good', color: '#52c41a', percentage: 80 },
      4: { score: 4, status: 'great', color: '#52c41a', percentage: 100 }
    };

    return strength[score];
  }
}