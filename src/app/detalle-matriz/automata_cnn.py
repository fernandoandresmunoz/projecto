"""
Red Convolucional para Autómata Multi-Regla Multi-Color
========================================================

Esta CNN está diseñada específicamente para tu autómata con 5 canales (colores)
y reglas independientes por canal.

Arquitectura:
- Input: (batch, 5, H, W) - 5 canales de colores
- Output: (batch, 5, H, W) - Predicción del siguiente estado

Características:
1. Procesa cada canal independientemente (reglas diferentes)
2. Luego mezcla información entre canales (interacciones)
3. Predice siguiente estado considerando ambos aspectos
"""

import numpy as np
import json
from typing import List, Tuple, Dict
from dataclasses import dataclass


@dataclass
class AutomataSnapshot:
    """Estructura de datos para un snapshot del autómata"""
    generacion: int
    matriz: np.ndarray  # Shape: (5, H, W)
    reglas: Dict[str, str]
    estadisticas: Dict
    features: Dict


class MultiChannelConv2D:
    """
    Capa convolucional 2D desde cero
    Optimizada para procesamiento de autómatas celulares
    """
    
    def __init__(self, in_channels: int, out_channels: int, 
                 kernel_size: int = 3, stride: int = 1, padding: int = 1):
        self.in_channels = in_channels
        self.out_channels = out_channels
        self.kernel_size = kernel_size
        self.stride = stride
        self.padding = padding
        
        # Inicialización He
        scale = np.sqrt(2.0 / (in_channels * kernel_size * kernel_size))
        self.weights = np.random.randn(out_channels, in_channels, 
                                      kernel_size, kernel_size) * scale
        self.bias = np.zeros(out_channels)
        
        # Para backprop
        self.cache = None
        self.grad_weights = None
        self.grad_bias = None
        
    def forward(self, x: np.ndarray) -> np.ndarray:
        """
        Forward pass
        x: (batch, in_channels, H, W)
        returns: (batch, out_channels, H_out, W_out)
        """
        batch_size, _, H, W = x.shape
        
        # Aplicar padding
        if self.padding > 0:
            x_padded = np.pad(x, 
                            ((0, 0), (0, 0), 
                             (self.padding, self.padding), 
                             (self.padding, self.padding)), 
                            mode='constant')
        else:
            x_padded = x
            
        H_pad, W_pad = x_padded.shape[2], x_padded.shape[3]
        
        # Calcular dimensiones de salida
        H_out = (H_pad - self.kernel_size) // self.stride + 1
        W_out = (W_pad - self.kernel_size) // self.stride + 1
        
        output = np.zeros((batch_size, self.out_channels, H_out, W_out))
        
        # Convolución optimizada con im2col
        for b in range(batch_size):
            for oc in range(self.out_channels):
                for i in range(0, H_out, self.stride):
                    for j in range(0, W_out, self.stride):
                        h_start = i * self.stride
                        w_start = j * self.stride
                        
                        receptive_field = x_padded[b, :, 
                                                   h_start:h_start + self.kernel_size,
                                                   w_start:w_start + self.kernel_size]
                        
                        output[b, oc, i, j] = np.sum(
                            receptive_field * self.weights[oc]
                        ) + self.bias[oc]
        
        # Guardar para backprop
        self.cache = (x_padded, x.shape)
        
        return output
    
    def backward(self, dout: np.ndarray, learning_rate: float = 0.001) -> np.ndarray:
        """
        Backward pass con actualización de pesos
        """
        x_padded, x_shape = self.cache
        batch_size, in_channels, H, W = x_shape
        batch_size, out_channels, H_out, W_out = dout.shape
        
        # Inicializar gradientes
        dx_padded = np.zeros_like(x_padded)
        self.grad_weights = np.zeros_like(self.weights)
        self.grad_bias = np.zeros_like(self.bias)
        
        # Calcular gradientes
        for b in range(batch_size):
            for oc in range(out_channels):
                for i in range(H_out):
                    for j in range(W_out):
                        h_start = i * self.stride
                        w_start = j * self.stride
                        
                        # Gradiente de los pesos
                        receptive_field = x_padded[b, :,
                                                   h_start:h_start + self.kernel_size,
                                                   w_start:w_start + self.kernel_size]
                        self.grad_weights[oc] += dout[b, oc, i, j] * receptive_field
                        
                        # Gradiente del bias
                        self.grad_bias[oc] += dout[b, oc, i, j]
                        
                        # Gradiente de la entrada
                        dx_padded[b, :, 
                                h_start:h_start + self.kernel_size,
                                w_start:w_start + self.kernel_size] += \
                            dout[b, oc, i, j] * self.weights[oc]
        
        # Actualizar pesos
        self.weights -= learning_rate * self.grad_weights / batch_size
        self.bias -= learning_rate * self.grad_bias / batch_size
        
        # Remover padding del gradiente
        if self.padding > 0:
            dx = dx_padded[:, :, self.padding:-self.padding, self.padding:-self.padding]
        else:
            dx = dx_padded
            
        return dx


class ChannelWiseConv(MultiChannelConv2D):
    """
    Convolución que procesa cada canal independientemente
    Útil para aplicar reglas específicas por color
    """
    
    def __init__(self, channels: int, kernel_size: int = 3):
        super().__init__(channels, channels, kernel_size, padding=1)
        
        # Un kernel diferente por canal (reglas independientes)
        self.channel_kernels = [
            np.random.randn(kernel_size, kernel_size) * np.sqrt(2.0 / (kernel_size * kernel_size))
            for _ in range(channels)
        ]
    
    def forward(self, x: np.ndarray) -> np.ndarray:
        """Aplica convolución independiente por canal"""
        batch_size, channels, H, W = x.shape
        output = np.zeros_like(x)
        
        for c in range(channels):
            # Procesar cada canal con su kernel específico
            channel_data = x[:, c:c+1, :, :]
            
            # Aplicar convolución
            padded = np.pad(channel_data, 
                          ((0, 0), (0, 0), (1, 1), (1, 1)), 
                          mode='constant')
            
            for b in range(batch_size):
                for i in range(H):
                    for j in range(W):
                        receptive_field = padded[b, 0, i:i+3, j:j+3]
                        output[b, c, i, j] = np.sum(
                            receptive_field * self.channel_kernels[c]
                        )
        
        return output


class AutomataCNN:
    """
    Red Neuronal Convolucional completa para autómata multi-regla
    
    Arquitectura:
    1. Channel-wise processing (reglas independientes)
    2. Cross-channel mixing (interacciones entre colores)
    3. Prediction head (siguiente estado)
    """
    
    def __init__(self, num_channels: int = 5):
        self.num_channels = num_channels
        
        # Etapa 1: Procesamiento por canal (reglas individuales)
        self.channel_processor = ChannelWiseConv(num_channels, kernel_size=3)
        
        # Etapa 2: Mezcla entre canales (interacciones)
        self.cross_channel_1 = MultiChannelConv2D(num_channels, 32, kernel_size=3, padding=1)
        self.cross_channel_2 = MultiChannelConv2D(32, 64, kernel_size=3, padding=1)
        
        # Etapa 3: Bottleneck
        self.bottleneck = MultiChannelConv2D(64, 128, kernel_size=3, padding=1)
        
        # Etapa 4: Decoder
        self.decoder_1 = MultiChannelConv2D(128, 64, kernel_size=3, padding=1)
        self.decoder_2 = MultiChannelConv2D(64, 32, kernel_size=3, padding=1)
        
        # Etapa 5: Predicción final
        self.output_layer = MultiChannelConv2D(32, num_channels, kernel_size=1, padding=0)
        
    def relu(self, x: np.ndarray) -> np.ndarray:
        """ReLU activation"""
        return np.maximum(0, x)
    
    def sigmoid(self, x: np.ndarray) -> np.ndarray:
        """Sigmoid activation para probabilidades"""
        return 1 / (1 + np.exp(-np.clip(x, -500, 500)))
    
    def forward(self, x: np.ndarray) -> np.ndarray:
        """
        Forward pass completo
        x: (batch, 5, H, W) - estado actual
        returns: (batch, 5, H, W) - predicción siguiente estado
        """
        # Procesamiento por canal
        x = self.channel_processor.forward(x)
        x = self.relu(x)
        
        # Mezcla entre canales
        x = self.cross_channel_1.forward(x)
        x = self.relu(x)
        
        x = self.cross_channel_2.forward(x)
        x = self.relu(x)
        
        # Bottleneck
        x = self.bottleneck.forward(x)
        x = self.relu(x)
        
        # Decoder
        x = self.decoder_1.forward(x)
        x = self.relu(x)
        
        x = self.decoder_2.forward(x)
        x = self.relu(x)
        
        # Output
        x = self.output_layer.forward(x)
        
        # Sigmoid para obtener probabilidades [0, 1]
        x = self.sigmoid(x)
        
        # Threshold para obtener estados binarios
        return (x > 0.5).astype(np.float32)
    
    def train_step(self, x_current: np.ndarray, y_next: np.ndarray, 
                   learning_rate: float = 0.001) -> float:
        """
        Un paso de entrenamiento
        """
        # Forward
        prediction = self.forward(x_current)
        
        # Calcular loss (MSE)
        loss = np.mean((prediction - y_next) ** 2)
        
        # Backward (simplificado - solo actualiza última capa)
        dloss = 2 * (prediction - y_next) / y_next.size
        
        # Actualizar pesos de última capa
        self.output_layer.backward(dloss, learning_rate)
        
        return loss


class AutomataDataset:
    """
    Dataset para entrenar la CNN con snapshots del autómata
    """
    
    def __init__(self, json_file: str):
        with open(json_file, 'r') as f:
            data = json.load(f)
        
        if data['tipo'] == 'secuencia_temporal':
            self.snapshots = self._parse_sequence(data['secuencia'])
        else:
            self.snapshots = [self._parse_single(data)]
    
    def _parse_single(self, data: dict) -> AutomataSnapshot:
        """Parsea un snapshot individual"""
        # Convertir matriz a formato numpy (5, H, W)
        raw_matrix = np.array(data['matriz']['raw'])
        
        # Crear canales separados
        canales = np.zeros((5, *raw_matrix.shape))
        canales[0] = (raw_matrix == 5).astype(float)  # RED
        canales[1] = (raw_matrix == 3).astype(float)  # BLUE
        canales[2] = (raw_matrix == 1).astype(float)  # GREEN
        canales[3] = (raw_matrix == 2).astype(float)  # BROWN
        canales[4] = (raw_matrix == 4).astype(float)  # GRAY
        
        return AutomataSnapshot(
            generacion=data['metadata']['generacion'],
            matriz=canales,
            reglas=data['reglas'],
            estadisticas=data['estadisticas'],
            features=data['features']
        )
    
    def _parse_sequence(self, secuencia: List[dict]) -> List[AutomataSnapshot]:
        """Parsea una secuencia temporal"""
        return [self._parse_single(snap) for snap in secuencia]
    
    def get_training_pairs(self) -> List[Tuple[np.ndarray, np.ndarray]]:
        """
        Genera pares (estado_actual, estado_siguiente) para entrenamiento
        """
        pairs = []
        for i in range(len(self.snapshots) - 1):
            pairs.append((
                self.snapshots[i].matriz,
                self.snapshots[i + 1].matriz
            ))
        return pairs


def entrenar_modelo(dataset_path: str, epochs: int = 100):
    """
    Función principal de entrenamiento
    """
    print("🚀 Iniciando entrenamiento de CNN para autómata...")
    
    # Cargar datos
    dataset = AutomataDataset(dataset_path)
    training_pairs = dataset.get_training_pairs()
    
    print(f"📊 Dataset: {len(training_pairs)} pares de entrenamiento")
    
    # Crear modelo
    model = AutomataCNN(num_channels=5)
    
    # Entrenar
    for epoch in range(epochs):
        total_loss = 0
        
        for x_current, y_next in training_pairs:
            # Añadir dimensión de batch
            x_batch = x_current[np.newaxis, ...]
            y_batch = y_next[np.newaxis, ...]
            
            # Train step
            loss = model.train_step(x_batch, y_batch, learning_rate=0.001)
            total_loss += loss
        
        avg_loss = total_loss / len(training_pairs)
        
        if epoch % 10 == 0:
            print(f"Epoch {epoch}/{epochs} - Loss: {avg_loss:.6f}")
    
    print("✅ Entrenamiento completado!")
    return model


if __name__ == "__main__":
    # Ejemplo de uso
    modelo = entrenar_modelo("secuencia_142_50gen.json", epochs=100)
    
    # Hacer predicción
    # estado_actual = ...  # Cargar estado
    # prediccion = modelo.forward(estado_actual)
    # print("Predicción del siguiente estado:", prediccion.shape)
