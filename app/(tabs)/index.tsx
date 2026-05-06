import { TRABAJOS_SOFTWARE, TrabajoSoftware } from '@/constants/trabajos';
import { generarPDF } from '@/utils/pdfGenerator';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// Definimos colores básicos (puedes ajustarlos según tu tema)
const colors = {
  background: '#f5f5f5',
  text: '#1a1a1a',
  card: '#ffffff',
  border: '#e0e0e0',
  primary: '#4CAF50',
  secondary: '#2196F3',
};

export default function CotizadorScreen() {
  const [trabajoSeleccionado, setTrabajoSeleccionado] = useState<TrabajoSoftware | null>(null);
  const [integrantes, setIntegrantes] = useState('1');
  const [nombreCliente, setNombreCliente] = useState('');
  const [emailCliente, setEmailCliente] = useState('');
  const [empresaCliente, setEmpresaCliente] = useState('');

  const calcularCosto = () => {
    if (!trabajoSeleccionado) return 0;
    const numIntegrantes = parseInt(integrantes) || 0;
    const costoTotal = trabajoSeleccionado.costoPorIntegrante * numIntegrantes;
    return costoTotal;
  };

  const esValido = () => {
    if (!trabajoSeleccionado) {
      Alert.alert('Error', 'Selecciona un tipo de trabajo');
      return false;
    }
    const numIntegrantes = parseInt(integrantes);
    if (numIntegrantes < trabajoSeleccionado.integrantesMin || 
        numIntegrantes > trabajoSeleccionado.integrantesMax) {
      Alert.alert('Error', `El número de integrantes debe estar entre ${trabajoSeleccionado.integrantesMin} y ${trabajoSeleccionado.integrantesMax}`);
      return false;
    }
    if (!nombreCliente.trim()) {
      Alert.alert('Error', 'Ingresa el nombre del cliente');
      return false;
    }
    if (!emailCliente.trim() || !emailCliente.includes('@')) {
      Alert.alert('Error', 'Ingresa un email válido');
      return false;
    }
    return true;
  };

  const handleExportarPDF = async () => {
    if (!esValido()) return;

    const cotizacion = {
      cliente: {
        nombre: nombreCliente,
        email: emailCliente,
        empresa: empresaCliente || 'No especificada'
      },
      trabajo: trabajoSeleccionado!,
      integrantes: parseInt(integrantes),
      costoTotal: calcularCosto(),
      fecha: new Date().toLocaleDateString('es-ES'),
      validez: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('es-ES')
    };

    await generarPDF(cotizacion);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>💰 Cotizador de Software</Text>
        <Text style={[styles.subtitle, { color: colors.text + '99' }]}>
          Selecciona el tipo de trabajo y personaliza tu presupuesto
        </Text>
      </View>

      {/* Selector de tipo de trabajo */}
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.label, { color: colors.text }]}>Tipo de trabajo:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={trabajoSeleccionado?.id || ''}
            onValueChange={(itemValue) => {
              const trabajo = TRABAJOS_SOFTWARE.find(t => t.id === itemValue);
              setTrabajoSeleccionado(trabajo || null);
              if (trabajo) {
                setIntegrantes(trabajo.integrantesMin.toString());
              }
            }}
            style={{ color: colors.text }}
          >
            <Picker.Item label="Selecciona un tipo..." value="" />
            {TRABAJOS_SOFTWARE.map(trabajo => (
              <Picker.Item key={trabajo.id} label={trabajo.nombre} value={trabajo.id} />
            ))}
          </Picker>
        </View>
      </View>

      {trabajoSeleccionado && (
        <>
          {/* Detalles del trabajo */}
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>📋 Descripción</Text>
            <Text style={[styles.description, { color: colors.text + 'cc' }]}>
              {trabajoSeleccionado.descripcion}
            </Text>

            <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 15 }]}>👥 Equipo requerido</Text>
            <Text style={[styles.infoText, { color: colors.text + 'cc' }]}>
              Integrantes: {trabajoSeleccionado.integrantesMin} - {trabajoSeleccionado.integrantesMax}
            </Text>

            <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 15 }]}>🛠️ Tecnologías</Text>
            <View style={styles.tagsContainer}>
              {trabajoSeleccionado.tecnologias.map(tech => (
                <View key={tech} style={[styles.tag, { backgroundColor: colors.primary + '20' }]}>
                  <Text style={[styles.tagText, { color: colors.primary }]}>{tech}</Text>
                </View>
              ))}
            </View>

            <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 15 }]}>✨ Lo que ofrecemos</Text>
            {trabajoSeleccionado.ofrece.map(item => (
              <Text key={item} style={[styles.bulletPoint, { color: colors.text + 'cc' }]}>• {item}</Text>
            ))}
          </View>

          {/* Configuración de integrantes */}
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.label, { color: colors.text }]}>Número de integrantes:</Text>
            <TextInput
              style={[styles.input, { borderColor: colors.border, color: colors.text }]}
              keyboardType="numeric"
              value={integrantes}
              onChangeText={setIntegrantes}
              placeholder={`${trabajoSeleccionado.integrantesMin} - ${trabajoSeleccionado.integrantesMax}`}
              placeholderTextColor={colors.text + '80'}
            />
            <Text style={[styles.hint, { color: colors.text + '80' }]}>
              Mínimo: {trabajoSeleccionado.integrantesMin} | Máximo: {trabajoSeleccionado.integrantesMax}
            </Text>
          </View>

          {/* Datos del cliente */}
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.label, { color: colors.text }]}>Datos del cliente:</Text>
            <TextInput
              style={[styles.input, { borderColor: colors.border, color: colors.text }]}
              placeholder="Nombre completo"
              placeholderTextColor={colors.text + '80'}
              value={nombreCliente}
              onChangeText={setNombreCliente}
            />
            <TextInput
              style={[styles.input, { borderColor: colors.border, color: colors.text, marginTop: 10 }]}
              placeholder="Email"
              placeholderTextColor={colors.text + '80'}
              keyboardType="email-address"
              value={emailCliente}
              onChangeText={setEmailCliente}
            />
            <TextInput
              style={[styles.input, { borderColor: colors.border, color: colors.text, marginTop: 10 }]}
              placeholder="Empresa (opcional)"
              placeholderTextColor={colors.text + '80'}
              value={empresaCliente}
              onChangeText={setEmpresaCliente}
            />
          </View>

          {/* Costo final */}
          <View style={[styles.card, { backgroundColor: colors.primary, marginBottom: 30 }]}>
            <Text style={[styles.totalLabel, { color: '#fff' }]}>💰 COSTO TOTAL</Text>
            <Text style={[styles.totalAmount, { color: '#fff' }]}>
              ${calcularCosto().toLocaleString('es-MX')} MXN
            </Text>
            <Text style={[styles.totalDetails, { color: '#fff' + 'cc' }]}>
              {integrantes} integrante(s) × ${trabajoSeleccionado.costoPorIntegrante.toLocaleString('es-MX')}
            </Text>
            <Text style={[styles.totalDetails, { color: '#fff' + 'cc' }]}>
              Horas estimadas: {trabajoSeleccionado.horasEstimadas * parseInt(integrantes || '0')}h
            </Text>
          </View>

          {/* Botón exportar */}
          <TouchableOpacity
            style={[styles.exportButton, { backgroundColor: colors.primary }]}
            onPress={handleExportarPDF}
          >
            <Text style={styles.exportButtonText}>📄 Exportar Contrato PDF</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  bulletPoint: {
    fontSize: 14,
    marginBottom: 6,
    marginLeft: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  hint: {
    fontSize: 12,
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  totalAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  totalDetails: {
    fontSize: 12,
    textAlign: 'center',
  },
  exportButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  exportButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});