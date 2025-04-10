import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, Input } from '@angular/core';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  update(): void;
  draw(ctx: CanvasRenderingContext2D): void;
}

@Component({
  selector: 'app-particles-background',
  standalone: true,
  imports: [CommonModule],
  template: `
    <canvas #canvas [ngClass]="backgroundColor" class="absolute inset-0"></canvas>
  `,
  styles: []
})
export class ParticlesBackgroundComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @Input() backgroundColor: string = 'bg-[#F8F9FA]';
  @Input() particleColor: string = '#E91E63';
  @Input() particleCount: number = 100;
  @Input() maxDistance: number = 150;
  
  private animationFrameId: number = 0;
  private particles: Particle[] = [];
  private ctx!: CanvasRenderingContext2D;
  
  ngOnInit(): void {
    this.initCanvas();
  }
  
  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrameId);
    window.removeEventListener('resize', this.resizeCanvas);
  }
  
  private resizeCanvas = () => {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  
  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    
    // Configurar el canvas para que ocupe toda la pantalla
    this.resizeCanvas();
    window.addEventListener('resize', this.resizeCanvas);
    
    // Crear partículas
    this.createParticles();
    
    // Iniciar animación
    this.animate();
  }
  
  private createParticles(): void {
    const canvas = this.canvasRef.nativeElement;
    
    class ParticleImpl implements Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      private color: string;
      
      constructor(color: string) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = color;
      }
      
      update(): void {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }
      
      draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(new ParticleImpl(this.particleColor));
    }
  }
  
  private connect(): void {
    const canvas = this.canvasRef.nativeElement;
    
    for (let a = 0; a < this.particles.length; a++) {
      for (let b = a; b < this.particles.length; b++) {
        const dx = this.particles[a].x - this.particles[b].x;
        const dy = this.particles[a].y - this.particles[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.maxDistance) {
          const opacity = 1 - (distance / this.maxDistance);
          this.ctx.strokeStyle = `rgba(233, 30, 99, ${opacity * 0.4})`;
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[a].x, this.particles[a].y);
          this.ctx.lineTo(this.particles[b].x, this.particles[b].y);
          this.ctx.stroke();
        }
      }
    }
  }
  
  private animate = (): void => {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
      this.particles[i].draw(this.ctx);
    }
    
    this.connect();
    this.animationFrameId = requestAnimationFrame(this.animate);
  };
}