import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Alert } from 'react-native';

interface CotizacionData {
  cliente: {
    nombre: string;
    email: string;
    empresa: string;
  };
  trabajo: {
    nombre: string;
    descripcion: string;
    tecnologias: string[];
    ofrece: string[];
    costoPorIntegrante: number;
    horasEstimadas: number;
  };
  integrantes: number;
  costoTotal: number;
  fecha: string;
  validez: string;
}

export const generarPDF = async (data: CotizacionData) => {
  // Verificar si el dispositivo puede compartir archivos
  const isSharingAvailable = await Sharing.isAvailableAsync();
  
  if (!isSharingAvailable) {
    Alert.alert('Error', 'La función de compartir no está disponible en este dispositivo');
    return;
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Contrato de Servicios de Software</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Helvetica', Arial, sans-serif;
          margin: 40px;
          color: #333;
          line-height: 1.6;
        }
        .header {
          text-align: center;
          border-bottom: 3px solid #4CAF50;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        h1 {
          color: #4CAF50;
          margin: 0;
          font-size: 28px;
        }
        .subtitle {
          color: #666;
          font-size: 14px;
          margin-top: 5px;
        }
        .contract-number {
          text-align: right;
          font-size: 12px;
          color: #999;
          margin-bottom: 20px;
        }
        .section {
          margin-bottom: 25px;
        }
        .section-title {
          background-color: #f5f5f5;
          padding: 8px 12px;
          font-size: 18px;
          font-weight: bold;
          color: #4CAF50;
          border-left: 4px solid #4CAF50;
          margin-bottom: 15px;
        }
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 10px;
          margin: 15px 0;
        }
        .info-label {
          font-weight: bold;
          color: #555;
        }
        .info-value {
          color: #333;
        }
        .tech-tag {
          display: inline-block;
          background-color: #e8f5e9;
          color: #2e7d32;
          padding: 3px 10px;
          border-radius: 15px;
          font-size: 12px;
          margin: 2px;
        }
        .offer-item {
          margin: 5px 0;
          padding-left: 20px;
        }
        .total-box {
          background-color: #f0fdf4;
          border: 2px solid #4CAF50;
          padding: 20px;
          text-align: center;
          margin: 20px 0;
          border-radius: 10px;
        }
        .total-amount {
          font-size: 32px;
          font-weight: bold;
          color: #2e7d32;
          margin: 10px 0;
        }
        .terms {
          margin-top: 40px;
          font-size: 12px;
          color: #666;
          border-top: 1px solid #ddd;
          padding-top: 20px;
        }
        .signature {
          margin-top: 40px;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
        }
        .sign-line {
          width: 200px;
          border-top: 1px solid #333;
          margin-top: 30px;
          text-align: center;
          font-size: 12px;
        }
        @media print {
          body {
            margin: 20px;
          }
          .no-print {
            display: none;
          }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>CONTRATO DE PRESTACIÓN DE SERVICIOS</h1>
        <div class="subtitle">Desarrollo de Software</div>
      </div>
      
      <div class="contract-number">
        <strong>Contrato N°:</strong> SW-${Date.now()}<br>
        <strong>Fecha:</strong> ${data.fecha}
      </div>

      <div class="section">
        <div class="section-title">1. PARTES CONTRATANTES</div>
        <div class="info-grid">
          <div class="info-label">Cliente:</div>
          <div class="info-value">${data.cliente.nombre}</div>
          
          <div class="info-label">Email:</div>
          <div class="info-value">${data.cliente.email}</div>
          
          <div class="info-label">Empresa:</div>
          <div class="info-value">${data.cliente.empresa}</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">2. DESCRIPCIÓN DEL SERVICIO</div>
        <p><strong>Tipo de Trabajo:</strong> ${data.trabajo.nombre}</p>
        <p><strong>Descripción:</strong> ${data.trabajo.descripcion}</p>
        
        <p><strong>Tecnologías a utilizar:</strong></p>
        <p>
          ${data.trabajo.tecnologias.map(tech => `<span class="tech-tag">${tech}</span>`).join(' ')}
        </p>
        
        <p><strong>Incluye:</strong></p>
        ${data.trabajo.ofrece.map(item => `<div class="offer-item">✓ ${item}</div>`).join('')}
      </div>

      <div class="section">
        <div class="section-title">3. EQUIPO DE TRABAJO</div>
        <p><strong>Número de integrantes:</strong> ${data.integrantes}</p>
        <p><strong>Horas estimadas totales:</strong> ${data.trabajo.horasEstimadas * data.integrantes} horas</p>
        <p><strong>Perfiles requeridos:</strong> Desarrolladores especializados, Project Manager, QA (según necesidad)</p>
      </div>

      <div class="section">
        <div class="section-title">4. COSTO Y CONDICIONES DE PAGO</div>
        <div class="total-box">
          <div><strong>COSTO TOTAL DEL PROYECTO</strong></div>
          <div class="total-amount">$${data.costoTotal.toLocaleString('es-MX')} MXN</div>
          <div>${data.integrantes} integrante(s) × $${data.trabajo.costoPorIntegrante.toLocaleString('es-MX')}</div>
        </div>
        
        <p><strong>Forma de pago:</strong></p>
        <ul>
          <li>50% de anticipo al inicio del proyecto</li>
          <li>25% al entregar el primer prototipo funcional</li>
          <li>25% al finalizar y aceptar el proyecto</li>
        </ul>
        
        <p><strong>Métodos de pago aceptados:</strong> Transferencia bancaria, Tarjeta de crédito/débito, PayPal</p>
      </div>

      <div class="section">
        <div class="section-title">5. PLAZOS Y ENTREGABLES</div>
        <p><strong>Fecha de inicio:</strong> A convenir</p>
        <p><strong>Plazo estimado:</strong> ${Math.ceil((data.trabajo.horasEstimadas * data.integrantes) / 40)} semanas (basado en jornada de 40h/semana)</p>
        <p><strong>Validez de esta cotización:</strong> ${data.validez}</p>
      </div>

      <div class="section">
        <div class="section-title">6. TÉRMINOS Y CONDICIONES</div>
        <ul>
          <li>Los precios no incluyen IVA (16% adicional)</li>
          <li>Se entregará código fuente y documentación completa</li>
          <li>Incluye 30 días de soporte post-entrega</li>
          <li>Cualquier cambio en el alcance será cotizado por separado</li>
          <li>La propiedad intelectual será transferida al cliente tras el pago total</li>
          <li>Se requiere firma digital de este contrato para comenzar</li>
        </ul>
      </div>

      <div class="signature">
        <div class="sign-line">
          _________________________<br>
          ${data.cliente.nombre}<br>
          Cliente
        </div>
        <div class="sign-line">
          _________________________<br>
          Representante Legal<br>
          Software Solutions
        </div>
      </div>

      <div class="terms">
        <p><strong>Nota:</strong> Este documento es un contrato legalmente vinculante. Por favor, revisa todos los términos cuidadosamente antes de firmar. Para cualquier duda, contacta a tu asesor asignado.</p>
        <p><em>Documento generado el ${data.fecha} a través de la plataforma de cotizaciones.</em></p>
      </div>
    </body>
    </html>
  `;

  try {
    // Generar el PDF
    const { uri } = await Print.printToFileAsync({ html });
    
    // Compartir el PDF
    await Sharing.shareAsync(uri, {
      mimeType: 'application/pdf',
      dialogTitle: 'Guardar contrato PDF',
      UTI: 'com.adobe.pdf'
    });
    
    Alert.alert('Éxito', 'PDF generado correctamente');
  } catch (error) {
    console.error('Error generando PDF:', error);
    Alert.alert('Error', 'No se pudo generar el PDF. Por favor intenta de nuevo.');
  }
};