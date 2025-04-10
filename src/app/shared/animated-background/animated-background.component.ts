import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'animated-background',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="animated-background">
      <div *ngFor="let bubble of bubbles" 
           [ngStyle]="getBubbleStyle(bubble)"
           class="bubble"></div>
    </div>
  `,
  styles: [`
    .animated-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      z-index: -1;
      background: linear-gradient(135deg, #000000 0%, #E0E0E0 50%, #E91E63 100%);
    }
    
    .bubble {
      position: absolute;
      border-radius: 50%;
      opacity: 0.15;
      filter: blur(8px);
      animation: float linear infinite;
    }
    
    @keyframes float {
      0% {
        transform: translateY(100vh) scale(0);
      }
      100% {
        transform: translateY(-10vh) scale(1);
      }
    }
  `]
})
export class AnimatedBackgroundComponent implements OnInit {
  bubbles: any[] = [];
  colors = ['#000000', '#E0E0E0', '#FFFFFF', '#E91E63'];
  
  ngOnInit(): void {
    this.generateBubbles();
  }
  
  generateBubbles(): void {
    for (let i = 0; i < 20; i++) {
      this.bubbles.push({
        left: Math.random() * 100,
        size: Math.random() * 100 + 50,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 5
      });
    }
  }
  
  getBubbleStyle(bubble: any): any {
    return {
      left: `${bubble.left}%`,
      width: `${bubble.size}px`,
      height: `${bubble.size}px`,
      backgroundColor: bubble.color,
      animationDuration: `${bubble.duration}s`,
      animationDelay: `${bubble.delay}s`
    };
  }
}