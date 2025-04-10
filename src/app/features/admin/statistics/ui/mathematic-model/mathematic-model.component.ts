import { Component } from '@angular/core';

@Component({
  selector: 'mathematic-model',
  standalone: true,
  template: `<div class="bg-white rounded-lg shadow-md p-6 mb-8">
    <h3 class="text-lg font-semibold text-gray-800 mb-4">
      Modelo de Predicción de Agotamiento
    </h3>
    <div class="flex flex-col md:flex-row gap-6">
      <div class="flex-1">
        <p class="text-gray-700 mb-4">
          Para modelar el agotamiento de stock, utilizamos la ecuación
          diferencial fundamental que puede representar tanto crecimiento como
          decrecimiento:
        </p>
        <div class="bg-gray-100 p-4 rounded-lg text-center mb-4">
          <p class="text-lg font-medium">dx/dt = kx</p>
        </div>
        <p class="text-gray-700 mb-2">Donde:</p>
        <ul class="list-disc pl-5 text-gray-700 space-y-2">
          <li>
            <strong>x</strong> representa el número de ventas en el tiempo t.
          </li>
          <li>
            <strong>k</strong> es la tasa de crecimiento o decrecimiento
            proporcional.
          </li>
          <li>
            <strong>dx/dt</strong> indica la tasa de cambio de las ventas en
            función del tiempo.
          </li>
        </ul>
      </div>
      <div class="flex-1">
        <p class="text-gray-700 mb-4">
          Aplicando este modelo a los datos de ventas de los primeros 2 meses,
          podemos predecir cuándo se agotará el stock inicial de cada categoría:
        </p>
        <div class="bg-blue-50 p-4 rounded-lg">
          <h4 class="font-medium text-blue-800 mb-2">Proceso de Cálculo</h4>
          <ol class="list-decimal pl-5 text-gray-700 space-y-2">
            <li>
              Calculamos la tasa de crecimiento/decrecimiento entre el mes 1 y 2
            </li>
            <li>Proyectamos las ventas futuras usando esta tasa</li>
            <li>
              Determinamos en qué mes el stock acumulado superará el stock
              inicial
            </li>
            <li>Priorizamos las categorías según su tiempo de agotamiento</li>
          </ol>
        </div>
      </div>
    </div>
  </div>`,
})
export class MathematicModelComponent {}
